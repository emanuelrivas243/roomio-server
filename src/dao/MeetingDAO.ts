import { db } from "../firebase.js";

class MeetingDAO {
    collection = db.collection("meetings");

    async getMeeting(id: string) {
        const snap = await this.collection.doc(id).get();
        return snap.exists ? snap.data() : null;
    }

    async getMeetingsByUser(userId: string) {
        const snap = await this.collection.where("userId", "==", userId).get();
        return snap.docs.map((doc: { id: any; data: () => any; }) => ({ id: doc.id, ...doc.data() }));
    }

    async createMeeting(data: any) {
        const docRef = await this.collection.add({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return { id: docRef.id };
    }

    async updateMeeting(id: string, data: any) {
        await this.collection.doc(id).update({
            ...data,
            updatedAt: new Date(),
        });
        return { id };
    }

    async deleteMeeting(id: string) {
        await this.collection.doc(id).delete();
        return { id };
    }
}

export default new MeetingDAO();
