import { Router } from "express";
import { auth, db } from "../firebase";

const router = Router();

router.put("/:uid", async (req, res) => {
  const { uid } = req.params;
  const { displayName, photoURL } = req.body;

  try {
    await auth.updateUser(uid, { displayName, photoURL });
    await db.collection("users").doc(uid).update({ displayName, photoURL });

    res.json({ message: "Usuario actualizado" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    await auth.deleteUser(uid);
    await db.collection("users").doc(uid).delete();

    res.json({ message: "Usuario eliminado" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
