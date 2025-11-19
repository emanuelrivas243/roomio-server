import { db } from "../firebase.js";

class UserDAO {
    collection = db.collection("users");

    /**
     * Retrieves a user document by ID.
     * @param {string} id - The user ID.
     * @returns {Promise<Object|null>} The user data or null if not found.
     */
    async getUser(id: string) {
        const snap = await this.collection.doc(id).get();
        return snap.exists ? snap.data() : null;
    }

    /**
     * Creates a new user document.
     * @param {string} id - The user ID (Firebase UID).
     * @param {Object} data - The user data to store.
     * @returns {Promise<{id: string}>} The ID of the created user.
     */
    async createUser(id: string, data: any) {
        await this.collection.doc(id).set(data);
        return { id };
    }

    /**
     * Updates an existing user document.
     * @param {string} id - The user ID.
     * @param {Object} data - The fields to update.
     * @returns {Promise<{id: string}>} The updated user ID.
     */
    async updateUser(id: string, data: any) {
        await this.collection.doc(id).update(data);
        return { id };
    }

    /**
     * Deletes a user document.
     * @param {string} id - The user ID.
     * @returns {Promise<{id: string}>} The deleted user ID.
     */
    async deleteUser(id: string) {
        await this.collection.doc(id).delete();
        return { id };
    }
}

export default new UserDAO();
