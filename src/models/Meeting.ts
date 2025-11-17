import { Timestamp } from "firebase-admin/firestore";

export interface Meeting {
    id?: string;
    title: string;
    userId: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export type MeetingCreate = Omit<Meeting, "id" | "createdAt" | "updatedAt">;
export type MeetingUpdate = Partial<Omit<Meeting, "id" | "userId" | "createdAt">>;
