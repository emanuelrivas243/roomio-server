import { Router } from "express";
import UserService from "../services/UserService.js";

const router = Router();

router.put("/:uid", async (req, res) => {
    const { uid } = req.params;
    const result = await UserService.updateUser(uid, req.body);
    res.json(result);
});

router.delete("/:uid", async (req, res) => {
    const { uid } = req.params;
    const result = await UserService.deleteUser(uid);
    res.json(result);
});

export default router;
