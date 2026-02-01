import { Booking } from '@/types/index.types'
import UserModel from '@/models/User'
import TrekModel from '@/models/Trek'

// Shared styles for consistency
const containerStyle = `
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const headerStyle = `
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 15px;
`;

const detailRowStyle = `
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 1.5;
  color: #374151;
`;

const labelStyle = `
  font-weight: 600;
  color: #6b7280;
  display: inline-block;
  width: 100px;
`;

const buttonStyle = `
  display: inline-block;
  background-color: #2563eb; /* Blue for Admin, can change */
  color: #ffffff;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`;

const buttonSuccessStyle = `
  display: inline-block;
  background-color: #16a34a; /* Green for Success */
  color: #ffffff;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`;

export async function adminPendingBookingMail(booking: Booking) {
  const user = await UserModel.findOne({ _id: booking.userId });
  const trek = await TrekModel.findOne({ _id: booking.trekId });

  if (!user) {
    throw new Error(`User not found for ID: ${booking.userId}`);
  }
  if (!trek) {
    throw new Error(`Trek not found for ID: ${booking.trekId}`);
  }

  return {
    subject: `Action Required: New Booking Pending (${trek.destination})`,
    html: `
      <div style="${containerStyle}">
        <div style="${headerStyle}">New Booking Request 📝</div>
        
        <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
          <div style="${detailRowStyle}">
            <span style="${labelStyle}">User:</span>
            <strong>${user.fullName}</strong>
          </div>
          <div style="${detailRowStyle}">
            <span style="${labelStyle}">Trek:</span>
            ${trek.destination}
          </div>
          <div style="${detailRowStyle}">
            <span style="${labelStyle}">Amount:</span>
            ₹${booking.amount}
          </div>
          <div style="${detailRowStyle}">
            <span style="${labelStyle}">Persons:</span>
            ${booking.persons}
          </div>
          <div style="${detailRowStyle}">
            <span style="${labelStyle}">Date:</span>
            ${new Date(booking.startDate).toDateString()}
          </div>
          <div style="${detailRowStyle}">
             <span style="${labelStyle}">Status:</span>
             <span style="color: #d97706; font-weight: bold;">PENDING</span>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #6b7280; margin-bottom: 15px;">Review the details and verify this booking.</p>
          <a href="${process.env.APP_URL}/admin/searchBooking?bookingId=${booking.id}&username=&fromDate=" style="${buttonStyle}">
            Verify Booking Now
          </a>
        </div>
      </div>
    `,
  };
}


export async function userBookingConfirmedMail(booking: Booking) {
  const trek = await TrekModel.findOne({ _id: booking.trekId });
  if (!trek) {
    throw new Error(`Trek not found for ID: ${booking.trekId}`);
  }

  return {
    subject: `Booking Confirmed: ${trek.destination} 🎉`,
    html: `
      <div style="${containerStyle}">
        <div style="${headerStyle} color: #16a34a;">Booking Confirmed! 🎉</div>
        
        <p style="font-size: 16px; color: #374151; margin-bottom: 20px; text-align: center;">
          Get your backpack ready! Your adventure to <strong>${trek.destination}</strong> is officially confirmed.
        </p>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
          <div style="${detailRowStyle}">
            <span style="${labelStyle}">Destination:</span>
            <strong>${trek.destination}</strong>
          </div>
          <div style="${detailRowStyle}">
            <span style="${labelStyle}">Start Date:</span>
            ${new Date(booking.startDate).toDateString()}
          </div>
          <div style="${detailRowStyle}">
            <span style="${labelStyle}">Travelers:</span>
            ${booking.persons} People
          </div>
        </div>

        <div style="text-align: center; margin-top: 25px;">
           <a href="${process.env.NEXT_PUBLIC_APP_URL}/user/history" style="${buttonSuccessStyle}">
            View My Trip Details
          </a>
          <p style="margin-top: 20px; font-size: 14px; color: #9ca3af;">
            We look forward to hosting you! <br /> - The Team
          </p>
        </div>
      </div>
    `,
  };
}