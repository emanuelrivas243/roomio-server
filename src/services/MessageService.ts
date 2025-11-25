import MessageDAO from "../dao/MessageDAO.js";

class MessageService {

    getMessages(meetingId: string) {
        return MessageDAO.getMessages(meetingId);
    }

    sendMessage(meetingId: string, data: any) {
        return MessageDAO.sendMessage(meetingId, data);
    }

    deleteAllMessages(meetingId: string) {
        return MessageDAO.deleteAllMessages(meetingId);
    }
}

export default new MessageService();
