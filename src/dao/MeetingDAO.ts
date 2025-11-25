import { db } from "../firebase.js";
import { generateMeetingId } from "../utils/generateMeetingId.js";
import MessageDAO from "../dao/MessageDAO.js";

/**
 * Data Access Object (DAO) for handling CRUD operations
 * related to the "meetings" collection in Firestore.
 */
class MeetingDAO {
    /** @type {FirebaseFirestore.CollectionReference} */
    collection = db.collection("meetings");

    /**
     * Retrieves a single meeting by its ID.
     * 
     * @param {string} id - The ID of the meeting to retrieve.
     * @returns {Promise<object|null>} The meeting data if found, otherwise null.
     */
    async getMeeting(id: string) {
        const snap = await this.collection.doc(id).get();
        return snap.exists ? snap.data() : null;
    }

    /**
     * Retrieves all meetings belonging to a specific user.
     * 
     * @param {string} userId - The ID of the user whose meetings should be fetched.
     * @returns {Promise<Array<object>>} A list of meetings with their Firestore document IDs.
     */
    async getMeetingsByUser(userId: string) {
        const snap = await this.collection.where("userId", "==", userId).get();
        return snap.docs.map((doc: { id: any; data: () => any; }) => ({ id: doc.id, ...doc.data() }));
    }

    /**
     * Creates a new meeting in Firestore.
     * 
     * @param {any} data - The meeting data to store. Should include at least userId and title.
     * @returns {Promise<{id: string}>} The ID of the newly created meeting document.
     */
    async createMeeting(data: any) {
        let meetingId = generateMeetingId();

        let exists = true;
        while (exists) {
            const snap = await this.collection.doc(meetingId).get();
            if (!snap.exists) exists = false;
            else meetingId = generateMeetingId();
        }

        await this.collection.doc(meetingId).set({
            meetingId,
            meetingName: data.title,
            meetingDate: data.scheduledAt,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return { id: meetingId };
    }

    /**
     * Updates an existing meeting with new data.
     * 
     * @param {string} id - The ID of the meeting to update.
     * @param {any} data - The updated meeting fields.
     * @returns {Promise<{id: string}>} The ID of the updated meeting.
     */
    async updateMeeting(id: string, data: any) {
        await this.collection.doc(id).update({
            ...data,
            updatedAt: new Date(),
        });
        return { id };
    }

    /**
     * Deletes a meeting from Firestore by its ID.
     * 
     * @param {string} id - The ID of the meeting to delete.
     * @returns {Promise<{id: string}>} The ID of the deleted meeting.
     */
    async deleteMeeting(id: string) {
        await MessageDAO.deleteAllMessages(id);
        await this.collection.doc(id).delete();

        return { id };
    }

}

export default new MeetingDAO();
