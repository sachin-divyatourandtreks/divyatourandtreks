"use client"

import TrekTable from "@/components/global/admin/TrekTable"
import { TrekHistoryItemAdmin } from "@/types/trek"
import { useQuery } from "@tanstack/react-query";
import { MOCK_TREK_HISTORY_ADMIN } from "@/constants/bookedData";

const fetchActiveBookings = async (): Promise<TrekHistoryItemAdmin[]> => {
  // Simulate fetching data from an API or database
  return MOCK_TREK_HISTORY_ADMIN;

  try {
    const response = await fetch('/api/admin/activeBookings');
    if (!response.ok) {
      throw new Error('Failed to fetch active bookings');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching active bookings:', error);
    return [];
  }
}

const ActiveTrekPage = () => {
  const { data: bookings = [] } = useQuery<TrekHistoryItemAdmin[]>({
    queryKey: ['activeBookings'],
    queryFn: fetchActiveBookings,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div>
      <TrekTable bookings={bookings} />
    </div>
  );
  
};

export default ActiveTrekPage;