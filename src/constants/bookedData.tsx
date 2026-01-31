import { TrekHistoryItem } from "@/types/trek"
import { TrekHistoryItemAdmin } from "@/types/trek"

export const bookings: TrekHistoryItem[] = [
  {
    id: "1",
    location: "Uttarakhand",
    trekName: "Himalayan Base Camp",
    startDate: "2026-02-05",
    duration: "7 Days",
    status: "Current",
    bookingStatus: "Booking Confirmed !!",
    peopleCount: 3,
  },
  {
    id: "2",
    location: "Uttarakhand",
    trekName: "Kedarkantha Trek",
    startDate: "2026-01-15",
    duration: "5 Days",
    status: "Completed",
    bookingStatus: "Booking pending !!",
    peopleCount: 2,
  },
  {
    id: "3",
    location: "Uttarakhand",
    trekName: "Valley of Flowers",
    startDate: "2026-03-01",
    duration: "6 Days",
    status: "Current",
    bookingStatus: "Booking Confirmed !!",
    peopleCount: 4,
  },
]

export const MOCK_TREK_HISTORY_ADMIN: TrekHistoryItemAdmin[] = [
  {
    id: "TRK-001",
    trekName: "Roopkund Glacial Lake",
    location: "Uttarakhand, India",
    startDate: "2025-05-15",
    duration: "8 Days",
    status: "Completed",
    bookingStatus: "Confirmed",
    peopleCount: 2,
    customerName: "Arjun Mehta",
    phoneNo: "+91-9876543210",
  },
  {
    id: "TRK-004",
    trekName: "Everest Base Camp",
    location: "Solu-Khumbu, Nepal",
    startDate: "2025-09-01",
    duration: "14 Days",
    status: "Cancelled",
    bookingStatus: "Refunded",
    peopleCount: 1,
    customerName: "Sarah Jenkins",
    phoneNo: "+1-555-0123-456",
  },
  {
    id: "TRK-005",
    trekName: "Kedarkantha Trek",
    location: "Uttarakhand, India",
    startDate: "2026-12-25",
    duration: "6 Days",
    status: "Upcoming",
    bookingStatus: "Pending",
    peopleCount: 3,
    customerName: "Priyanka Sharma",
    phoneNo: "+91-9988776655",
  },
];