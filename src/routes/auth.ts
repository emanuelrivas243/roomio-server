import { Router } from "express";
import { auth, db } from "../firebase.js";

const router = Router();

/**
 * @route POST /auth/register
 * @summary Registers a new user using Firebase Admin and stores profile data in Firestore.
 * @description
 * Creates a Firebase Authentication user with email/password, stores extra user data
 * in Firestore, and returns a **custom token** the client can exchange for an ID token.
 *
 * @param {string} req.body.email - User email.
 * @param {string} req.body.password - User password.
 * @param {string} req.body.displayName - The display name for the user.
 *
 * @returns {Object} 200 - User data plus a Firebase custom token.
 * @returns {string} res.uid
 * @returns {string} res.email
 * @returns {string} res.displayName
 * @returns {string} res.idToken - Firebase custom token.
 *
 * @returns {Object} 400 - Error message.
 */
router.post("/register", async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    const user = await auth.createUser({ email, password, displayName });

    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      email,
      displayName,
      createdAt: new Date(),
    });

    const customToken = await auth.createCustomToken(user.uid);

    res.json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      idToken: customToken
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route POST /auth/login
 * @summary Logs in a user using Firebase Client SDK inside Node.
 * @description
 * This endpoint:
 * - Fetches the user by email with Firebase Admin.
 * - Uses Firebase **Client SDK** to verify password (Admin SDK cannot validate passwords).
 * - Returns the user profile and a valid **ID Token**.
 *
 * @param {string} req.body.email - User email.
 * @param {string} req.body.password - User password.
 *
 * @returns {Object} 200 - Authenticated user data and Firebase ID token.
 * @returns {string} res.uid
 * @returns {string} res.email
 * @returns {string} res.displayName
 * @returns {string} res.idToken
 *
 * @returns {Object} 401 - Invalid credentials.
 * @returns {Object} 429 - Too many attempts.
 * @returns {Object} 500 - Other login-related errors.
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await auth.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const { initializeApp, getApps } = await import('firebase/app');
    const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');

    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID
    };

    let clientApp;
    const apps = getApps();
    if (apps.length === 0) {
      clientApp = initializeApp(firebaseConfig, "client");
    } else {
      clientApp = apps.find(app => app.name === "client") || apps[0];
    }

    const clientAuth = getAuth(clientApp);

    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const idToken = await userCredential.user.getIdToken();

    const userDoc = await db.collection("users").doc(user.uid).get();
    const userData = userDoc.data();

    res.json({
      uid: user.uid,
      email: user.email,
      displayName: userData?.displayName || user.displayName,
      idToken
    });
  } catch (error: any) {
    console.error('Login error:', error);

    if (
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/invalid-credential' ||
      error.code === 'auth/invalid-login-credentials'
    ) {
      res.status(401).json({ error: "Invalid email or password" });
    } else if (error.code === 'auth/too-many-requests') {
      res.status(429).json({ error: "Too many attempts. Try again later." });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

/**
 * @route POST /auth/reset-password
 * @summary Generates a password reset link using Firebase.
 * @description
 * Sends back a URL that can be emailed to the user so they can reset their password.
 *
 * @param {string} req.body.email - The email of the account requesting reset.
 *
 * @returns {Object} 200 - Reset link generated.
 * @returns {string} res.link - Firebase password reset URL.
 *
 * @returns {Object} 400 - Error generating reset link.
 */
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    const link = await auth.generatePasswordResetLink(email);
    res.json({ link });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
