import TrekRow from "./TrekRow"
import { TrekBooking } from "@/types/trek"

const TrekTable = ({activeBookings}: {activeBookings: TrekBooking[]}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-y-auto overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Booking ID</th>
            <th className="px-4 py-3 text-left">Customer</th>
            <th className="px-4 py-3 text-left">Trek</th>
            <th className="px-4 py-3 text-left">Start Date</th>
            <th className="px-4 py-3 text-left">End Date</th>
            <th className="px-4 py-3 text-center">People</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {activeBookings.map((booking) => (
            <TrekRow key={booking.id} booking={booking} />
          ))}

          {activeBookings.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                No active trek bookings
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TrekTable;