// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Add new group to the available groups
// exports.addGroup = functions.firestore
//   .document('recite/chant/groups/\{group\}/admin/\{owner\}')
//   .onCreate((snap, context) => {
//     const document = snap.data()
//     console.info(document)
//     //add to the master list
//     return db.doc('aggregates/available_groups').update({
//       groups: admin.firestore.FieldValue.arrayUnion(document)
//     }).then(
//       //add custom claim owner:group for the uid who created the group
//       admin.auth().getUser(context.params.owner).then((user) => {
//         if (user.emailVerified) {
//           let currentCustomClaims = {
//             owner: context.params.group
//           }
//           if (typeof user.customClaims !== 'undefined') {
//             currentCustomClaims = user.customClaims
//             if(currentCustomClaims.owner !== 'undefined') {
//               delete currentCustomClaims.owner
//             }
//             currentCustomClaims.owner = context.params.group
//             console.info(currentCustomClaims)
//             console.info(context.params.group)
//           }
//           return admin.auth().setCustomUserClaims(context.params.owner, currentCustomClaims)
//         }
//       })
//     )
//   })
  // Add new group to the available groups async/await version
  exports.addGroup = functions.firestore
  .document('recite/chant/groups/\{group\}/admin/\{owner\}')
  .onCreate(async (snap, context) => {
    try {
      const document = snap.data()
      //await to get the user auth object for the uid that created the document
      const user = await admin.auth().getUser(context.params.owner)
      //do something only if email is verified
      if (user.emailVerified) {
        // handle the user.customClaims === 'undefined' situation first
        let currentCustomClaims = {
          owner: context.params.group
        }
        // if user.customClaims already defined then append owner to it
        if (typeof user.customClaims !== 'undefined') {
          currentCustomClaims = user.customClaims
          currentCustomClaims.owner = context.params.group
        }
        // add / update the current claim
        await admin.auth().setCustomUserClaims(context.params.owner, currentCustomClaims)
        delete document.leaders
        console.info(document)
        console.info(context)
        return db.doc('aggregates/available_groups').update({
          groups: admin.firestore.FieldValue.arrayUnion(document)
        })
      } else {
        return "Error: " + "user.emailVerified: false"
      }
    } catch (err) {
      return "Error: " + err
    }
  })

// Delete an existing group
exports.deleteGroup = functions.firestore
  .document('recite/chant/groups/\{group\}/admin/\{owner\}')
  .onDelete(async (snap, context) => {
    try {
      //get the data for the group to be removed
      const document = snap.data()
      //remove the custom claim on the owner
      //await to get the user auth object for the uid that created the document
      const user = await admin.auth().getUser(context.params.owner)
      delete user.customClaims.owner
      await admin.auth().setCustomUserClaims(context.params.owner, user.customClaims)
      //remove the custom claim on the leaders
      //cycle through the leaders array and prepare .length promises
      const promises = []
      document.leaders.forEach((email) => {
        const p = admin.auth().getUserByEmail(email).then(async(user) => {
          // Confirm user is verified.
          if (user.emailVerified) {
            let currentCustomClaims = user.customClaims;
            if (typeof user.customClaims.leader !== 'undefined') {
              currentCustomClaims.leader = user.customClaims.leader.filter(a => a !== context.params.group)
            }
            admin.auth().setCustomUserClaims(user.uid, currentCustomClaims)
          } else {
            return "Error: " + "user.emailVerified: false"
          }
        })
        promises.push(p)
      })
      // await finishing all the promises
      await Promise.all(promises)
      // done removing leaders so reset to []
      delete document.leaders
      console.info(document)
      //remove the group from the master list
      return db.doc('aggregates/available_groups').update({
        groups: admin.firestore.FieldValue.arrayRemove(document)
      })
    } catch (err) {
      return "Error: " + err
    }
  })
// // Delete an existing group
// exports.deleteGroup = functions.firestore
//   .document('recite/chant/groups/\{group\}/admin/\{owner\}')
//   .onDelete((snap, context) => {
//     const document = snap.data()
//     //remove the group from the master list
//     return db.doc('aggregates/available_groups').update({
//       groups: admin.firestore.FieldValue.arrayRemove(document)
//     }).then(
//         //remove the owner custom claim
//       admin.auth().getUser(context.params.owner).then((user) => {
//           if (user.emailVerified) {
//             if (typeof user.customClaims !== 'undefined') {
//               let currentCustomClaims = user.customClaims
//               delete currentCustomClaims.owner
//               console.info("deleteGroup: I am here C")
//               return admin.auth().setCustomUserClaims(context.params.owner, currentCustomClaims)
//             }
//           }
//         })
//       ).then(
//       //remove the leader custom claim
//       //cycle through the leaders array and remove one by one
//         document.leaders.forEach((email) => {
//           return  admin.auth().getUserByEmail(email).then((user) => {
//         // Confirm user is verified.
//         if (user.emailVerified) {
//           let currentCustomClaims = user.customClaims;
//           if (typeof user.customClaims.leader !== 'undefined') {
//             currentCustomClaims.leader = user.customClaims.leader.filter(a => a !== context.params.group)
//           }
//           return admin.auth().setCustomUserClaims(user.uid, currentCustomClaims)
//         }
//       })
//   })
// )
//   })

// Update an existing group
exports.updateGroup = functions.firestore
  .document('recite/chant/groups/\{group\}/admin/\{owner\}')
  .onUpdate((change, context) => {
    const document = change.after.data()
    const oldDocument = change.before.data()
    let userToAdd = document.leaders.filter(x => !oldDocument.leaders.includes(x));
    let userToRemove = oldDocument.leaders.filter(x => !document.leaders.includes(x));
    console.info('leader to add:' + userToAdd)
    console.info('leader to remove:' + userToRemove)
    if (userToAdd.length > 0) {
      return admin.auth().getUserByEmail(userToAdd[0]).then((user) => {
        // Confirm user is verified.
        if (user.emailVerified) {
          let currentCustomClaims = {
            leader: [context.params.group]
          };
          if (typeof user.customClaims !== 'undefined') {
            if (typeof user.customClaims.leader !== 'undefined') {
              currentCustomClaims = user.customClaims;
              currentCustomClaims.leader.push(context.params.group)
            }
          }
          return admin.auth().setCustomUserClaims(user.uid, currentCustomClaims);
        }
      })
    } else if (userToRemove.length > 0) {
      return admin.auth().getUserByEmail(userToRemove[0]).then((user) => {
        // Confirm user is verified.
        if (user.emailVerified) {
          let currentCustomClaims = user.customClaims;
          if (typeof user.customClaims.leader !== 'undefined') {
            currentCustomClaims.leader = user.customClaims.leader.filter(a => a !== context.params.group)
          }
          return admin.auth().setCustomUserClaims(user.uid, currentCustomClaims)
        }
      })
    } else {
      return 'updateGroup: nothing to do'
    }
  })
//add or remove groupCreatePrivilege
exports.manageGroupCreatePrivilege = functions.firestore
  .document('admin/groups')
  .onUpdate((change, context) => {
    const document = change.after.data()
    const oldDocument = change.before.data()

    if (document.owners.length > oldDocument.owners.length) {
      let userToAdd = document.owners[document.owners.length-1]
      return admin.auth().getUserByEmail(userToAdd).then((user) => {
        if (user.emailVerified) {
          let currentCustomClaims = {
            createGroupPrivilege: true
          }
          if (typeof user.customClaims !== 'undefined') {
            currentCustomClaims = user.customClaims
            currentCustomClaims.createGroupPrivilege = true
          }
          return admin.auth().setCustomUserClaims(user.uid, currentCustomClaims)
        }
      }).then(console.info('owner to add:' + userToAdd))
    } else if (document.owners.length < oldDocument.owners.length) {
      let userToRemove = oldDocument.owners[oldDocument.owners.length-1]
      return admin.auth().getUserByEmail(userToRemove).then((user) => {
        if (user.emailVerified) {
          if (typeof user.customClaims !== 'undefined') {
            let currentCustomClaims = user.customClaims
            if (typeof user.customClaims.createGroupPrivilege !== 'undefined') {
              delete currentCustomClaims.createGroupPrivilege
            }
            return admin.auth().setCustomUserClaims(user.uid, currentCustomClaims)
          }
        }
      }).then(console.info('owner to remove:' + userToRemove))
    } else {
      return 'manageGroupCreatePrivilege: nothing to do'
    }
  })
