import { Router } from "express";
import UserService from "../services/UserService.js";

const router = Router();

router.put("/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        await UserService.updateUser(uid, data);

        res.json({ message: "Usuario actualizado" });
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

router.get("/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await UserService.getUser(uid);
        res.json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});



router.delete("/:uid", async (req, res) => {
    const { uid } = req.params;
    const result = await UserService.deleteUser(uid);
    res.json(result);
});

export default router;
