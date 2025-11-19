/**
 * Initializes Firebase Admin SDK using environment variables
 * and exports Firestore and Auth instances for server-side use.
 *
 * This module loads environment variables, constructs the private key
 * for Firebase service account authentication, initializes the Firebase
 * Admin app, and provides access to Firestore and Auth services.
 *
 * @module firebaseAdmin
 */

import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

/**
 * Private key used for Firebase Admin authentication.
 * It replaces escaped newline characters ("\\n") with actual newlines ("\n").
 * @type {string | undefined}
 */
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey,
  }),
});

/**
 * Firestore database instance from Firebase Admin SDK.
 * @type {FirebaseFirestore.Firestore}
 */
export const db = admin.firestore();

/**
 * Authentication service instance from Firebase Admin SDK.
 * Provides server-side user management features.
 * @type {admin.auth.Auth}
 */
export const auth = admin.auth();
