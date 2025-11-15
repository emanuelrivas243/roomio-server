import { Router } from "express";
import { auth, db } from "../firebase";

const router = Router();

// Registro email/password
router.post("/register", async (req, res) => {
  const { email, password, displayName } = req.body;
  try {
    const userRecord = await auth.createUser({ email, password, displayName });
    await db.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      displayName,
      provider: "email",
      createdAt: new Date(),
    });
    res.status(201).json({ uid: userRecord.uid });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Login: validar ID Token
router.post("/login", async (req, res) => {
  const { idToken } = req.body;

  try {
    const decoded = await auth.verifyIdToken(idToken);
    res.json({ uid: decoded.uid });
  } catch (err: any) {
    res.status(401).json({ error: "Token inválido" });
  }
});

// Recuperar contraseña
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const link = await auth.generatePasswordResetLink(email);
    res.json({ message: "Email de recuperación enviado", resetLink: link });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
