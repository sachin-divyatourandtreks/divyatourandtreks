"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import TrekFilters from "@/components/global/admin/TrekFilters";
import TrekTable from "@/components/global/admin/TrekTable";
import { MOCK_TREK_HISTORY_ADMIN } from "@/constants/bookedData";
import { TrekHistoryItemAdmin } from "@/types/trek";

type Filters = {
  UserId: string;
  Date: string;
  TrekId: string;
};

const fetchSearchBookings = async (
  filters: Filters
): Promise<TrekHistoryItemAdmin[]> => {
  // mock for now
  return MOCK_TREK_HISTORY_ADMIN.filter((booking) => {
    const matchesUserId = filters.UserId
      ? booking.id.includes(filters.UserId)
      : true;
    const matchesDate = filters.Date
      ? booking.startDate === filters.Date
      : true;
    const matchesTrekId = filters.TrekId
      ? booking.id.includes(filters.TrekId)
      : true;
      
    return matchesUserId && matchesDate && matchesTrekId;
  });
  // real version later
  // const res = await fetch(`/api/admin/activeBookings?${new URLSearchParams(filters)}`);
  // if (!res.ok) throw new Error("Failed to fetch");
  // return res.json();
};

export default function SearchBookingPage() {
  const searchParams = useSearchParams();

  const filters = useMemo<Filters>(() => ({
    UserId: searchParams.get("UserId") ?? "",
    Date: searchParams.get("Date") ?? "",
    TrekId: searchParams.get("TrekId") ?? "",
  }), [searchParams]);

  const { data: bookings = [] } = useQuery<TrekHistoryItemAdmin[]>({
    queryKey: ["searchBookings", filters],
    queryFn: () => fetchSearchBookings(filters),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div>
      <TrekFilters filters={filters} />
      <TrekTable bookings={bookings} />
    </div>
  );
}
