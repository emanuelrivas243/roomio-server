import { Router } from "express";
import { db } from "../firebase";

const router = Router();

// Crear reunión
router.post("/", async (req, res) => {
  const { hostId, title } = req.body;
  try {
    const meetingRef = db.collection("meetings").doc();
    await meetingRef.set({
      hostId,
      title,
      participants: [hostId],
      createdAt: new Date(),
    });
    res.status(201).json({ meetingId: meetingRef.id });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Listar reuniones
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("meetings").get();
    const meetings = snapshot.docs.map(doc => ({ meetingId: doc.id, ...doc.data() }));
    res.json(meetings);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
