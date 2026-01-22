"use client";

type TrekHistoryItem = {
  id: string;
  trekName: string;
  location: string;
  date: string;
  duration: string;
  distance: string;
  status: "Completed" | "Cancelled" | "Current" | "Upcoming";
};

type TrekHistoryProps = {
  treks: TrekHistoryItem[];
};

const TrekHistory = ({ treks }: TrekHistoryProps) => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Trek History
        </h2>

        {/* Empty State */}
        {treks.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No trek history available.
          </p>
        ) : (
          <div className="space-y-4">
            {treks.map((trek) => (
              <div
                key={trek.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 rounded-xl p-5 hover:shadow transition"
              >
                {/* Left */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {trek.trekName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {trek.location} • {trek.date}
                  </p>
                </div>

                {/* Middle */}
                <div className="flex gap-6 text-sm text-gray-600 mt-3 sm:mt-0">
                  <span>🕒 {trek.duration}</span>
                  <span>📏 {trek.distance}</span>
                </div>

                {/* Status */}
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    trek.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : trek.status === "Upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : trek.status === "Current"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-red-100 text-red-700" // Cancelled
                    }`}
                >
                  {trek.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrekHistory;