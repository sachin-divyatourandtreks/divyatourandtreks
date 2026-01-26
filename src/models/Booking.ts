import mongoose, { Schema, Document, Types, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";


export interface IBooking {
    id: string;
    userId: Types.ObjectId;
    trekId: Types.ObjectId;
    persons: number;
    amount: number;
    status: "pending" | "confirmed" | "cancelled";
    startDate: Date;
    createdAt?: Date; 
    updatedAt?: Date;
}


const BookingSchema = new Schema<IBooking>(
    {
        id: {
            type: String,
            unique: true,
            default: () => uuidv4(),
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        trekId: {
            type: Schema.Types.ObjectId,
            ref: "Trek",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        persons: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"], 
            default: "pending",
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
    },
    { 
        timestamps: true,
    }
);

const BookingModel = (mongoose.models.Booking as Model<IBooking>) || 
                     mongoose.model<IBooking>("Booking", BookingSchema);

export default BookingModel;