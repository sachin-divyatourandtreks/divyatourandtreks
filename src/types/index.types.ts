import { Types } from "mongoose";
export type Booking = {
    id?: string;
    userId: Types.ObjectId;
    trekId: Types.ObjectId;
    persons: number;
    amount: number;
    status: "pending" | "confirmed" | "cancelled";
    startDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}