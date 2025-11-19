import { Router } from "express";
import UserService from "../services/UserService.js";

const router = Router();

/**
 * @route GET /users/me
 * @description Retrieves the authenticated user's profile (US-4).
 * @requires Header: `userId` - The ID of the user requesting the profile.
 * 
 * @returns {Object} 200 - User profile information
 * @returns {string} res.id - User UID
 * @returns {string} res.firstName - User's first name
 * @returns {string} res.lastName - User's last name
 * @returns {number} res.age - User's age
 * @returns {string} res.email - User's email
 * @returns {string} res.createdAt - Account creation timestamp
 * 
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal server error
 */
router.get("/me", async (req, res) => {
    try {
        const userId = req.headers.userid as string;
        const user = await UserService.getUser(userId);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
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
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @route PUT /users/me
 * @description Updates the authenticated user's profile (US-5).
 * @requires Header: `userId`
 * @requires Body: { firstName, lastName, age, email }
 * 
 * @returns {Object} 200 - Updated user data
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 500 - Internal server error
 */
router.put("/me", async (req, res) => {
    try {
        const userId = req.headers.userid as string;
        const { firstName, lastName, age, email } = req.body;

        if (!firstName || !lastName || !age || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await UserService.updateUser(userId, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @route DELETE /users/:uid
 * @description Deletes a user account by UID (US-6).
 * 
 * @param {string} req.params.uid - UID of the user to delete
 * 
 * @returns {Object} 200 - Deletion result
 * @returns {Object} 500 - Internal server error
 */
router.delete("/:uid", async (req, res) => {
    const { uid } = req.params;
    const result = await UserService.deleteUser(uid);
    res.json(result);
});

export default router;
