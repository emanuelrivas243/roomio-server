import { Router } from "express";
import { auth, db } from "../firebase.js";

const router = Router();

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

    res.json({ uid: user.uid });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Configuración temporal para Firebase Client
    const { initializeApp } = await import('firebase/app');
    const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
    
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN
    };

    const clientApp = initializeApp(firebaseConfig, "client");
    const clientAuth = getAuth(clientApp);

    // Hacer login con email/password
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    res.json({
      uid: user.uid,
      email: user.email,
      idToken: idToken
    });
  } catch (error: any) {
    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      res.status(401).json({ error: "Correo o contraseña inválidos" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;
