import TrekTableFiltered from "@/components/global/admin/TrekTableFiltered";
import { bookings } from "@/constants/bookedData"

const SearchBookingPage = () => {
  return (
    <div>
      <TrekTableFiltered bookings={bookings} />
    </div>
  )
}

export default SearchBookingPage;