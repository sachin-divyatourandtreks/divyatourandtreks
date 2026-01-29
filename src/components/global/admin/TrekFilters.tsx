type Props = {
  filters: any
  setFilters: any
}

const TrekFilters = ({ filters, setFilters }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 grid md:grid-cols-3 gap-4">

      <input
        type="text"
        placeholder="Search Booking ID / Customer / Trek"
        value={filters.search}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, search: e.target.value }))
        }
        className="border px-3 py-2 rounded"
      />

      <input
        type="date"
        value={filters.startDate}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, startDate: e.target.value }))
        }
        className="border px-3 py-2 rounded"
      />

      <input
        type="date"
        value={filters.endDate}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, endDate: e.target.value }))
        }
        className="border px-3 py-2 rounded"
      />

    </div>
  )
}

export default TrekFilters;