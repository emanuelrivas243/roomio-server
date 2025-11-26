import { db } from "../firebase.js";

/**
 * Data Access Object for managing meeting messages stored in Firestore.
 * Provides methods to query, send, and delete messages associated with a meeting.
 *
 * @class MessageDAO
 */
class MessageDAO {
    /**
     * Retrieves all messages for a given meeting, ordered by timestamp (ascending).
     *
     * @function getMessages
     * @async
     * @param {string} meetingId - The ID of the meeting whose messages will be retrieved.
     * @returns {Promise<Array<{ id: string, [key: string]: any }>>}
     * An array of message objects including the Firestore document ID.
     */
    getMessages(meetingId: string) {
        return db
            .collection("meetings")
            .doc(meetingId)
            .collection("messages")
            .orderBy("time", "asc")
            .get()
            .then((snap: { docs: { id: any; data: () => any; }[]; }) =>
                snap.docs.map((doc: { id: any; data: () => any; }) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
    }

    /**
     * Stores a new message in a meeting's message subcollection.
     * Automatically appends an ISO timestamp to the message data.
     *
     * @function sendMessage
     * @async
     * @param {string} meetingId - The ID of the meeting where the message will be stored.
     * @param {Object} data - Raw message data to be saved.
     * @returns {Promise<FirebaseFirestore.DocumentReference>}
     * Reference to the created Firestore document.
     */
    sendMessage(meetingId: string, data: any) {
        return db
            .collection("meetings")
            .doc(meetingId)
            .collection("messages")
            .add({
                ...data,
                time: new Date().toISOString(),
            });
    }

    /**
     * Deletes **all** messages inside a meeting's message subcollection.
     * Uses a Firestore batch for efficient deletion.
     *
     * @function deleteAllMessages
     * @async
     * @param {string} meetingId - The ID of the meeting whose messages will be deleted.
     * @returns {Promise<void>}
     */
    async deleteAllMessages(meetingId: string) {
        const ref = db
            .collection("meetings")
            .doc(meetingId)
            .collection("messages");

        const snap = await ref.get();

        const batch = db.batch();
        snap.forEach((doc: { ref: any; }) => batch.delete(doc.ref));

        await batch.commit();
    }
}

export default new MessageDAO();
