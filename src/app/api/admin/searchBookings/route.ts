import dbConnect from '@/lib/dbConnect';
import BookingModel from '@/models/Booking';
import UserModel from '@/models/User';
import TrekModel from '@/models/Trek';
import { NextResponse } from 'next/server';
import { TrekHistoryItemAdmin } from '@/types/trek';
import { getBookingStatus } from '@/lib/bookingStatus'

// type Filters = {
//   username: string;
//   fromDate: string;
//   bookingId: string;
// }

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);

        const bookingId = searchParams.get('bookingId');
        const username = searchParams.get('username');
        const fromDate = searchParams.get('fromDate');
        console.log("Received Filters:", { bookingId, username, fromDate });
        const filter: any = {};

        if (bookingId) {
            filter.id = bookingId; 
        }

        if (fromDate) {
            filter.startDate = {};
            if (fromDate && !isNaN(Date.parse(fromDate))){
                filter.startDate.$gte = new Date(fromDate);
                filter.startDate.$lt = new Date(new Date(fromDate).getTime() + 24 * 60 * 60 * 1000);
            }

        }


        if (username) {
            const users = await UserModel.find({
                username: { $regex: username, $options: 'i' },
                fullName: {$regex: username, $options: 'i' }
            }).select('_id');
            
            console.log("Matched Users for Username Filter:", users);
            const userIds = users.map(user => user._id);
            filter.userId = { $in: userIds };
        }

        console.log("Constructed Filter:", filter);
        const bookings = await BookingModel.find(filter)
            .populate('userId', 'fullName phoneNo')
            .populate('trekId', 'destination location duration')
            .sort({ bookingDate: -1 });

        const formattedBookings = bookings.map((booking: any) => ({
            id: booking.id,
            customerName: booking.userId?.fullName || "Unknown Customer",
            trekName: booking.trekId?.destination || "Unknown Trek",
            location: booking.trekId?.location || "Unknown Location",
            startDate: booking.startDate.toISOString().split('T')[0],
            duration: booking.trekId ? `${booking.trekId.duration} days` : "Unknown Duration",
            bookingStatus: getBookingStatus(booking.startDate, booking.trekId?.duration || 0, booking.status),
            status: booking.status,
            peopleCount: booking.persons,
            amountPaid: booking.amount,
            phoneNo: booking.userId?.phoneNo || "N/A"
        }) as TrekHistoryItemAdmin);

        const resolvedBookings = await Promise.all(formattedBookings);
        console.log("Resolved Bookings:", resolvedBookings);
        return NextResponse.json({ data: resolvedBookings }, { status: 200 });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: false, message: 'Error fetching bookings', error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}