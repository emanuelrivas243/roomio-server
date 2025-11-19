import UserDAO from "../dao/UserDAO.js";

/**
 * UserService
 * ----------
 * This service layer acts as an intermediary between the controllers
 * and the User Data Access Object (UserDAO).  
 * It encapsulates all user-related business logic and provides
 * clean methods to interact with user data in the database.
 */
class UserService {

    /**
     * Retrieve a single user by their ID.
     * @param {string} id - The unique identifier of the user.
     * @returns {Promise<any>} - A promise resolving to the user data if found.
     */
    getUser(id: string) {
        return UserDAO.getUser(id);
    }

    /**
     * Create a new user record.
     * @param {string} id - The unique identifier to assign to the user.
     * @param {any} data - The user information to store.
     * @returns {Promise<any>} - A promise resolving when the user is created.
     */
    createUser(id: string, data: any) {
        return UserDAO.createUser(id, data);
    }

    /**
     * Update an existing user.
     * @param {string} id - The ID of the user to update.
     * @param {any} data - The updated fields for the user.
     * @returns {Promise<any>} - A promise resolving when the user is updated.
     */
    updateUser(id: string, data: any) {
        return UserDAO.updateUser(id, data);
    }

    /**
     * Delete a user from the database.
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<any>} - A promise resolving when the user is removed.
     */
    deleteUser(id: string) {
        return UserDAO.deleteUser(id);
    }
}

export default new UserService();
