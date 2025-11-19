/**
 * Meetings Routes
 * ----------------
 * Handles creation, retrieval, and deletion of meeting records.
 *
 * Base path: /meetings
 */

import { Router } from "express";
import MeetingService from "../services/MeetingService.js";

const router = Router();

/**
 * @route POST /meetings
 * @description Create a new meeting using the provided data.
 *
 * @param {Object} req.body - The meeting data.
 * @returns {Object} 200 - The created meeting data.
 *
 * @example
 * POST /meetings
 * {
 *   "title": "Daily Standup",
 *   "hostUid": "user_123",
 *   "scheduledAt": "2025-11-20T15:00:00.000Z"
 * }
 */
router.post("/", async (req, res) => {
    const result = await MeetingService.createMeeting(req.body);
    res.json(result);
});

/**
 * @route GET /meetings/:id
 * @description Retrieve a meeting by its ID.
 *
 * @param {string} req.params.id - The ID of the meeting.
 * @returns {Object} 200 - The meeting data.
 *
 * @example
 * GET /meetings/abc123
 */
router.get("/:id", async (req, res) => {
    const result = await MeetingService.getMeeting(req.params.id);
    res.json(result);
});

/**
 * @route DELETE /meetings/:id
 * @description Delete a meeting by its ID.
 *
 * @param {string} req.params.id - The ID of the meeting to delete.
 * @returns {Object} 200 - The result of the deletion.
 *
 * @example
 * DELETE /meetings/abc123
 */
router.delete("/:id", async (req, res) => {
    const result = await MeetingService.deleteMeeting(req.params.id);
    res.json(result);
});

export default router;
