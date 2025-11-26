import MessageDAO from "../dao/MessageDAO.js";

/**
 * Service layer for handling message-related operations.
 * Acts as an abstraction over the MessageDAO to keep controllers decoupled
 * from database access logic.
 *
 * @class MessageService
 */
class MessageService {
    /**
     * Retrieves all messages from a specified meeting.
     *
     * @function getMessages
     * @param {string} meetingId - The ID of the meeting.
     * @returns {Promise<Array<{ id: string, [key: string]: any }>>}
     * A list of messages belonging to the meeting.
     */
    getMessages(meetingId: string) {
        return MessageDAO.getMessages(meetingId);
    }

    /**
     * Sends (stores) a new message for a given meeting.
     *
     * @function sendMessage
     * @param {string} meetingId - The ID of the meeting.
     * @param {Object} data - Message data to be stored.
     * @returns {Promise<FirebaseFirestore.DocumentReference>}
     * A reference to the newly created Firestore document.
     */
    sendMessage(meetingId: string, data: { senderId: string; message: any; time: number; }) {
        return MessageDAO.sendMessage(meetingId, data);
    }

    /**
     * Deletes all messages associated with a specific meeting.
     *
     * @function deleteAllMessages
     * @param {string} meetingId - The ID of the meeting.
     * @returns {Promise<void>}
     */
    deleteAllMessages(meetingId: string) {
        return MessageDAO.deleteAllMessages(meetingId);
    }
}

export default new MessageService();
