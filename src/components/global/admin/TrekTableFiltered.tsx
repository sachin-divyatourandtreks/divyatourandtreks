"use client"

import { useState, useMemo } from "react"
import TrekRow from "./TrekRow"
import TrekFilters from "./TrekFilters"
import { TrekBooking } from "@/types/trek"

const TrekTableFiltered = ({bookings}: {bookings: TrekBooking[]}) => {
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
  })

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      if (booking.status !== "active") return false

      const searchText = filters.search.toLowerCase()

      const matchesSearch =
        booking.id.toLowerCase().includes(searchText) ||
        booking.customerName.toLowerCase().includes(searchText) ||
        booking.trekName.toLowerCase().includes(searchText)

      const matchesStartDate =
        !filters.startDate ||
        new Date(booking.startDate) >= new Date(filters.startDate)

      const matchesEndDate =
        !filters.endDate ||
        new Date(booking.endDate) <= new Date(filters.endDate)

      return matchesSearch && matchesStartDate && matchesEndDate
    })
  }, [filters])

  return (
    <div>
      <TrekFilters filters={filters} setFilters={setFilters} />

      <div className="bg-white shadow rounded-lg overflow-hidden">
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
            {filteredBookings.map((booking) => (
              <TrekRow key={booking.id} booking={booking} />
            ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No matching active bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TrekTableFiltered; 