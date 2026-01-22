"use client";

type ProfileProps = {
  name: string;
  email: string;
  phone: string;
  trips: number;
  distance: string;
  yearsActive: number;
  avatarUrl: string;
};

const Profile = ({
  name,
  email,
  phone,
  trips,
  distance,
  yearsActive,
  avatarUrl,
}: ProfileProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

        {/* Content */}
        <div className="relative px-8 pb-8">

          {/* Avatar */}
          <div className="absolute -top-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-md">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="pt-20 flex flex-col md:flex-row md:justify-between gap-6">

            {/* Name & Contact */}
            <div className="md:ml-40">
              <h2 className="text-3xl font-bold text-gray-900">{name}</h2>

              <div className="mt-3 space-y-2 text-gray-600 text-sm">
                <p>
                  <span className="font-medium text-gray-800">Email:</span>{" "}
                  {email}
                </p>

                <p>
                  <span className="font-medium text-gray-800">Phone:</span>{" "}
                  {phone}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <button className="self-start md:self-center px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            <Stat value={trips.toString()} label="Trips Completed" />
            <Stat value={distance} label="Total Distance" />
            <Stat value={`${yearsActive} Years`} label="Active Since" />
          </div>

        </div>
      </div>
    </div>
  );
}

/* Stat Card */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow transition text-center">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-gray-600 text-sm mt-1">{label}</p>
    </div>
  );
}

export default Profile;