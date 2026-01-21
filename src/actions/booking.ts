import dbConnect from "@/lib/dbConnect";
import BookingModel from "@/models/Booking";
import { verifySession } from "@/lib/authGuard";

interface createBookingParam {
    userId: string;
    trekId: string;
    paymentId: string;
    startTime: Date;
    endTime: Date;
}

const createBooking = async (formData: createBookingParam) => {
    try{
        await dbConnect();

        const newBooking = BookingModel.create(formData);
        
        if(!newBooking) {
            console.log("booking failed!!!");
            throw new Error("booking failed");
        }

        return JSON.parse(JSON.stringify(newBooking));
    } catch(error: any){
        console.log("failed to create booking", error.message);
        throw new Error(error.message || "failed to create booking");
    }
}

const getAllBookingForUser = async (token: string) => {
    try{
        const uid = verifySession(token);
        
        // To Do : fetch all users
    } catch(error : any){
        console.log("failed to fetch bookings", error.message);
        throw new Error(error.message || "failed to fetch bookings");
    }
}