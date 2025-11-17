import MeetingDAO from "../dao/MeetingDAO.js";

class MeetingService {
    getMeeting(id: string) {
        return MeetingDAO.getMeeting(id);
    }

    getMeetingsByUser(userId: string) {
        return MeetingDAO.getMeetingsByUser(userId);
    }

    createMeeting(data: any) {
        return MeetingDAO.createMeeting(data);
    }

    updateMeeting(id: string, data: any) {
        return MeetingDAO.updateMeeting(id, data);
    }

    deleteMeeting(id: string) {
        return MeetingDAO.deleteMeeting(id);
    }
}

export default new MeetingService();
