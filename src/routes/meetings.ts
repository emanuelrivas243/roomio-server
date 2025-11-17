import { Router } from "express";
import MeetingService from "../services/MeetingService.js";

const router = Router();

router.post("/", async (req, res) => {
    const result = await MeetingService.createMeeting(req.body);
    res.json(result);
});

router.get("/:id", async (req, res) => {
    const result = await MeetingService.getMeeting(req.params.id);
    res.json(result);
});

router.delete("/:id", async (req, res) => {
    const result = await MeetingService.deleteMeeting(req.params.id);
    res.json(result);
});

export default router;
