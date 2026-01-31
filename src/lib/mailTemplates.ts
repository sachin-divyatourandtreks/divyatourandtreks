import { Booking } from '@/types/index.types'
import UserModel from '@/models/User'
import TrekModel from '@/models/Trek'

export async function adminPendingBookingMail(booking: Booking) {
    const user = await UserModel.findOne({_id: booking.userId});
    const trek = await TrekModel.findOne({_id: booking.trekId});

    if (!user) {
        throw new Error(`User not found for ID: ${booking.userId}`);
    }
    if (!trek) {
        throw new Error(`Trek not found for ID: ${booking.trekId}`);
    }
    
  return {
    subject: "New Booking Pending Approval",
    html: `
      <h2>New Booking Request</h2>
      <p><b>User:</b> ${user.fullName}</p>
      <p><b>Trek:</b> ${trek.destination}</p>
      <p><b>Amount:</b> ${booking.amount}</p>
      <p><b>Persons:</b> ${booking.persons}</p>
      <p><b>Date:</b> ${booking.startDate}</p>
      <p>Status: <b>PENDING</b></p>
      <p> You can verify this booking by clicking the link below or visited the platform </p>
      <a href="${process.env.APP_URL}/bookings/${booking.id}">Verify by Clicking here</a>
    `,
  }
}

export async function userBookingConfirmedMail(booking: Booking) {
  const trek = await TrekModel.findOne({_id: booking.trekId});
  if(!trek){
    throw new Error(`Trek not found for ID: ${booking.trekId}`);
  }

  return {
    subject: "Your Booking is Confirmed 🎉",
    html: `
      <h2>Booking Confirmed</h2>
      <p>Your booking has been successfully confirmed.</p>
      <p><b>Trek:</b> ${trek?.destination}</p>
      <p><b>Date:</b> ${booking.startDate}</p>
      <p><b>Persons:</b> ${booking.persons}</p>
      <p>We look forward to hosting you!</p>
    `,
  }
}
