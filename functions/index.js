// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// Add new group to the available groups
exports.addGroup = functions.firestore
  .document('recite/chant/groups/\{group\}/admin/\{owner\}')
  .onCreate((snap, context) => {
    const document = snap.data()
    console.info(document)
    //add to the master list
    return db.doc('aggregates/available_groups').update({
      groups: admin.firestore.FieldValue.arrayUnion(document)
    }).then(
      //add custom claim owner:group for the uid who created the group
      admin.auth().getUser(context.params.owner).then((user) => {
        if (user.emailVerified) {
          let currentCustomClaims = {
            owner: context.params.group
          }
          if (typeof user.customClaims !== 'undefined') {
            currentCustomClaims = user.customClaims
            if(currentCustomClaims.owner !== 'undefined') {
              delete currentCustomClaims.owner
            }
            currentCustomClaims.owner = context.params.group
            console.info(currentCustomClaims)
            console.info(context.params.group)
          }
          return admin.auth().setCustomUserClaims(context.params.owner, currentCustomClaims)
        }
      })
    )
  })
// Delete an existing group
exports.deleteGroup = functions.firestore
  .document('recite/chant/groups/\{group\}/admin/\{owner\}')
  .onDelete((snap, context) => {
    const document = snap.data()
    //remove the group from the master list
    return db.doc('aggregates/available_groups').update({
      groups: admin.firestore.FieldValue.arrayRemove(document)
    }).then(
        //remove the owner custom claim
      admin.auth().getUser(context.params.owner).then((user) => {
          if (user.emailVerified) {
            if (typeof user.customClaims !== 'undefined') {
              let currentCustomClaims = user.customClaims
              delete currentCustomClaims.owner
              console.info("deleteGroup: I am here C")
              return admin.auth().setCustomUserClaims(context.params.owner, currentCustomClaims)
            }
          }
        })
      ).then(
      //remove the leader custom claim
      //cycle through the leaders array and remove one by one
        document.leaders.forEach((email) => {
          return  admin.auth().getUserByEmail(email).then((user) => {
        // Confirm user is verified.
        if (user.emailVerified) {
          let currentCustomClaims = user.customClaims;
          if (typeof user.customClaims.leader !== 'undefined') {
            currentCustomClaims.leader = user.customClaims.leader.filter(a => a !== context.params.group)
          }
          return admin.auth().setCustomUserClaims(user.uid, currentCustomClaims)
        }
      })
  })
)
  })

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
