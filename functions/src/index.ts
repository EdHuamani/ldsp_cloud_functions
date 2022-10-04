import {getAuth} from "firebase-admin/auth";
import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const auth = getAuth(app);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createUser = functions.firestore
    .document("users/{userId}")
    .onCreate(async (snap, context) => {
      const newValue = snap.data();
      const name = newValue.name;
      const lastname = newValue.lastname;
      const email = newValue.email;
      await auth.createUser({
        uid: context.params.userId,
        email: email,
        emailVerified: false,
        // password: generatePassword(16),
        password: "123456",
        displayName: `${name} ${lastname}`,
      });
    });
