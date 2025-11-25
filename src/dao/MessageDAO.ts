import { db } from "../firebase.js";

class MessageDAO {

    getMessages(meetingId: string) {
        return db
            .collection("meetings")
            .doc(meetingId)
            .collection("messages")
            .orderBy("time", "asc")
            .get()
            .then((snap: { docs: any[]; }) => snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }

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

    async deleteAllMessages(meetingId: string) {
        const ref = db.collection("meetings").doc(meetingId).collection("messages");
        const snap = await ref.get();

        const batch = db.batch();
        snap.forEach((doc: { ref: any; }) => batch.delete(doc.ref));
        await batch.commit();
    }
}

export default new MessageDAO();
