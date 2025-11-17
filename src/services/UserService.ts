import UserDAO from "../dao/UserDAO.js";

class UserService {
    getUser(id: string) {
        return UserDAO.getUser(id);
    }

    createUser(id: string, data: any) {
        return UserDAO.createUser(id, data);
    }

    updateUser(id: string, data: any) {
        return UserDAO.updateUser(id, data);
    }

    deleteUser(id: string) {
        return UserDAO.deleteUser(id);
    }
}

export default new UserService();
