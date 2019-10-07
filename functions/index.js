// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// // Adds a message that welcomes new users into the chat.
// exports.addWelcomeMessages = functions.auth.user().onCreate(async (user) => {
//   console.log('A new user signed in for the first time.');
//   const fullName = user.displayName || 'Anonymous';
//
//   // Saves the new welcome message into the database
//   // which then displays it in the FriendlyChat clients.
//   await admin.firestore().collection('messages').add({
//     name: 'Firebase Bot',
//     profilePicUrl: '/images/firebase-logo.png', // Firebase logo
//     text: `${fullName} signed in for the first time! Welcome!`,
//     timestamp: admin.firestore.FieldValue.serverTimestamp(),
//   });
//   console.log('Welcome message written to database.');
// });

const db = admin.firestore();
// Adds new group to the available groups
exports.addGroup = functions.firestore
  .document('groups/{group}/leaders/{leader}')
  .onCreate((snap, context) => {
   const document = snap.data()
   db.doc('aggregates/available_groups').update({groups: admin.firestore.FieldValue.arrayUnion(document)})
   admin.auth().getUser(context.params.leader).then((user) => {
     if (user.emailVerified) {
     let currentCustomClaims = {owner: context.params.group  }
     if (typeof user.customClaims !== 'undefined') {
       currentCustomClaims = user.customClaims
       currentCustomClaims.owner = context.params.group
   }
    return admin.auth().setCustomUserClaims(context.params.leader, currentCustomClaims)
  }
 })
 })
 // delete an existing group
 exports.deleteGroup = functions.firestore
   .document('groups/{group}/leaders/{leader}')
   .onDelete((snap, context) => {
    const document = snap.data()
    db.doc('aggregates/available_groups').update({groups: admin.firestore.FieldValue.arrayRemove(document)})
    admin.auth().getUser(context.params.leader).then((user) => {
      if (user.emailVerified) {
      if (typeof user.customClaims !== 'undefined') {
        let currentCustomClaims = user.customClaims
        delete currentCustomClaims.owner
      return  admin.auth().setCustomUserClaims(context.params.leader, currentCustomClaims)
    }
  }
  })
})
  // update an existing group
  exports.updateGroup = functions.firestore
    .document('groups/{group}/leaders/{leader}')
    .onUpdate((change, context) => {
    const document = change.after.data()
    const oldDocument = change.before.data();
    let userToAdd = document.leaders.filter(x => !oldDocument.leaders.includes(x));
    let userToRemove = oldDocument.leaders.filter(x => !document.leaders.includes(x));
    console.log(userToAdd)
    console.log(userToRemove)
    if(userToAdd.length>0) {
  admin.auth().getUserByEmail(userToAdd[0]).then((user) => {
  // Confirm user is verified.
  if (user.emailVerified) {
    let currentCustomClaims = {leader : [context.params.group]};
    if(typeof user.customClaims !== 'undefined') {
    if(typeof user.customClaims.leader !== 'undefined') {
      currentCustomClaims = user.customClaims;
      currentCustomClaims.leader.push(context.params.group)
    }
  }
    return admin.auth().setCustomUserClaims(user.uid, currentCustomClaims);
  }
})
}
if(userToRemove.length>0) {
  admin.auth().getUserByEmail(userToRemove[0]).then((user) => {
  // Confirm user is verified.
  if (user.emailVerified) {
    let currentCustomClaims = user.customClaims;
    if(typeof user.customClaims.leader !== 'undefined') {
    currentCustomClaims.leader = user.customClaims.leader.filter(a => a!==context.params.group)
    }
    return admin.auth().setCustomUserClaims(user.uid, currentCustomClaims);
  }
})
}
})

exports.addGroupCreatePrivilege = functions.firestore
  .document('admin/groups')
  .onWrite((change, context) => {
    let successStatus = false
    const document = change.after.exists ? change.after.data() : null;
    if(document){
    document.owners.forEach(addCreateGroupWrites)
    function addCreateGroupWrites(email){
      admin.auth().getUserByEmail(email).then((user) => {
        if (user.emailVerified) {
        let currentCustomClaims = {createGroupPrivilege : true}
        if (typeof user.customClaims !== 'undefined') {
          currentCustomClaims = user.customClaims
          currentCustomClaims.createGroupPrivilege=true
      }
       admin.auth().setCustomUserClaims(user.uid, currentCustomClaims).then(()=>{successStatus=true})
     }
    })
  }
  }
  const oldDocument = change.before.data();
  let userToRemove = oldDocument.owners.filter(x => !document.owners.includes(x));
  if(userToRemove.length>0){
  userToRemove.forEach(removeCreateGroupWrites)
  function removeCreateGroupWrites(email){
    admin.auth().getUserByEmail(email).then((user) => {
      if (user.emailVerified) {
      if (typeof user.customClaims !== 'undefined') {
        let currentCustomClaims = user.customClaims
        if(typeof user.customClaims.createGroupPrivilege !== 'undefined') {
        delete currentCustomClaims.createGroupPrivilege
      }
      admin.auth().setCustomUserClaims(user.uid, currentCustomClaims).then(()=>{successStatus=true})
    }
   }
  })
}
}
return successStatus
})
