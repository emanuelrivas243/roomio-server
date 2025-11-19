import MeetingDAO from "../dao/MeetingDAO.js";

/**
 * Service layer for handling meeting-related operations.
 * 
 * This class acts as an abstraction between the controllers (HTTP layer)
 * and the data access layer (DAO). It ensures that controllers do not interact
 * directly with the database, promoting cleaner architecture and easier testing.
 */
class MeetingService {

    /**
     * Retrieves a single meeting by its ID.
     * 
     * @param {string} id - The unique identifier of the meeting.
     * @returns {Promise<any>} The meeting data if found, otherwise null.
     */
    getMeeting(id: string) {
        return MeetingDAO.getMeeting(id);
    }

    /**
     * Retrieves all meetings associated with a specific user.
     * 
     * @param {string} userId - The ID of the user whose meetings should be fetched.
     * @returns {Promise<any[]>} A list of meeting records.
     */
    getMeetingsByUser(userId: string) {
        return MeetingDAO.getMeetingsByUser(userId);
    }

    /**
     * Creates a new meeting entry.
     * 
     * @param {any} data - The meeting data to be created.
     * @returns {Promise<any>} The newly created meeting record.
     */
    createMeeting(data: any) {
        return MeetingDAO.createMeeting(data);
    }

    /**
     * Updates an existing meeting.
     * 
     * @param {string} id - The ID of the meeting to update.
     * @param {any} data - Partial or full meeting data to apply as an update.
     * @returns {Promise<any>} The updated meeting record.
     */
    updateMeeting(id: string, data: any) {
        return MeetingDAO.updateMeeting(id, data);
    }

    /**
     * Deletes a meeting by its ID.
     * 
     * @param {string} id - The ID of the meeting to delete.
     * @returns {Promise<void>} Resolves when the meeting has been removed.
     */
    deleteMeeting(id: string) {
        return MeetingDAO.deleteMeeting(id);
    }
}

export default new MeetingService();
