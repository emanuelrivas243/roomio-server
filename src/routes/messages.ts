import { Router } from "express";
import MessageService from "../services/MessageService.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:meetingId", verifyToken, async (req, res) => {
    const result = await MessageService.getMessages(req.params.meetingId);
    res.json(result);
});

router.post("/:meetingId", verifyToken, async (req, res) => {
    const result = await MessageService.sendMessage(req.params.meetingId, {
        senderId: req.user!.uid,
        message: req.body.message,
        time: Date.now()
    });
    res.json({ ok: true, id: result.id });
});

export default router;
