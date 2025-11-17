import { db } from "../firebase.js";

class UserDAO {
    collection = db.collection("users");

    async getUser(id: string) {
        const snap = await this.collection.doc(id).get();
        return snap.exists ? snap.data() : null;
    }

    async createUser(id: string, data: any) {
        await this.collection.doc(id).set(data);
        return { id };
    }

    async updateUser(id: string, data: any) {
        await this.collection.doc(id).update(data);
        return { id };
    }

    async deleteUser(id: string) {
        await this.collection.doc(id).delete();
        return { id };
    }
}

export default new UserDAO();
