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
  .onWrite((change, context) => {
    console.log(change)
    console.log(context)
    // Get an object with the current document value.
      // If the document does not exist, it has been deleted.
      const document = change.after.exists ? change.after.data() : null;

      // Get an object with the previous document value (for update or delete)
      const oldDocument = change.before.data();
console.log(document)
if(document) {
    db.doc('aggregates/available_groups').update({
  groups: admin.firestore.FieldValue.arrayUnion(document)
  // document
  })
} else {
  db.doc('aggregates/available_groups').update({
groups: admin.firestore.FieldValue.arrayRemove(oldDocument)
})
}

const customClaims = {
    owner: context.params.group
  };
  // Set custom user claims on this newly created user.
admin.auth().setCustomUserClaims(context.params.leader, customClaims)
}
)
