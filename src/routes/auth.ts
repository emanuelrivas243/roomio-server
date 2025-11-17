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
  const { idToken } = req.body;

  try {
    const decoded = await auth.verifyIdToken(idToken);
    res.json({ uid: decoded.uid });
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
});

export default router;
