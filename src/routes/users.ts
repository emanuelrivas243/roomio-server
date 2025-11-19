import { Router } from "express";
import UserService from "../services/UserService.js";

const router = Router();

// GET /users/me - Perfil usuario (US-4)
router.get("/me", async (req, res) => {
    try {
        const userId = req.headers.userid as string; // Frontend enviará userID
        const user = await UserService.getUser(userId);
        
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({
            id: user.uid,
            firstName: user.firstName,
            lastName: user.lastName, 
            age: user.age,
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// PUT /users/me - Editar perfil (US-5)  
router.put("/me", async (req, res) => {
    try {
        const userId = req.headers.userid as string; // Frontend enviará userID
        const { firstName, lastName, age, email } = req.body;

        // Validación básica
        if (!firstName || !lastName || !age || !email) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }

        const result = await UserService.updateUser(userId, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// DELETE /users/:uid - Eliminar cuenta (US-6)
router.delete("/:uid", async (req, res) => {
    const { uid } = req.params;
    const result = await UserService.deleteUser(uid);
    res.json(result);
});

export default router;