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

    // Generar un custom token para que el frontend pueda autenticarse
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Obtener el usuario por email usando Admin SDK
    const user = await auth.getUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ error: "Correo o contraseña inválidos" });
    }

    // Admin SDK no puede verificar contraseñas directamente
    // Necesitamos usar Firebase Client SDK en el backend
    const { initializeApp, getApps } = await import('firebase/app');
    const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
    
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID
    };

    // Solo inicializar si no existe ya
    let clientApp;
    const apps = getApps();
    if (apps.length === 0) {
      clientApp = initializeApp(firebaseConfig, "client");
    } else {
      clientApp = apps.find(app => app.name === "client") || apps[0];
    }
    
    const clientAuth = getAuth(clientApp);

    // Hacer login con email/password
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const idToken = await userCredential.user.getIdToken();

    // Obtener datos adicionales del usuario desde Firestore
    const userDoc = await db.collection("users").doc(user.uid).get();
    const userData = userDoc.data();

    res.json({
      uid: user.uid,
      email: user.email,
      displayName: userData?.displayName || user.displayName,
      idToken: idToken
    });
  } catch (error: any) {
    console.error('Error en login:', error);
    
    if (error.code === 'auth/wrong-password' || 
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/invalid-login-credentials') {
      res.status(401).json({ error: "Correo o contraseña inválidos" });
    } else if (error.code === 'auth/too-many-requests') {
      res.status(429).json({ error: "Demasiados intentos. Intenta más tarde" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;