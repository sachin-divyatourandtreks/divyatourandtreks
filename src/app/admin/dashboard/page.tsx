"use client"

import TrekTable from "@/components/global/admin/TrekTable"
import { TrekHistoryItemAdmin } from "@/types/trek"
import { useQuery } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { MOCK_TREK_HISTORY_ADMIN } from "@/constants/bookedData";

const fetchActiveBookings = async (): Promise<TrekHistoryItemAdmin[]> => {
  // Simulate fetching data from an API or database
  // return MOCK_TREK_HISTORY_ADMIN;

  try {
    const token = Cookies.get('session');
    const response = await fetch('/api/admin/activeBookings', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch active bookings');
    }

    const res = await response.json();
    return res.data as TrekHistoryItemAdmin[];
  } catch (error) {
    console.error('Error fetching active bookings:', error);
    return [] as TrekHistoryItemAdmin[];
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