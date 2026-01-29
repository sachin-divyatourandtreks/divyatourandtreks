import { TrekBooking } from "@/types/trek"

type Props = {
  booking: TrekBooking
}

export default function TrekRow({ booking }: Props) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-gray-500 font-mono text-xs">
        #{booking.id}
      </td>
      <td className="px-4 py-3">{booking.customerName}</td>
      <td className="px-4 py-3 font-medium">{booking.trekName}</td>
      <td className="px-4 py-3">{booking.startDate}</td>
      <td className="px-4 py-3">{booking.endDate}</td>
      <td className="px-4 py-3 text-center">{booking.peopleCount}</td>

      <td className="px-4 py-3">
        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
          Active
        </span>
      </td>
    </tr>
  )
}
