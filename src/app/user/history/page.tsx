import React from 'react';
import TrekHistory from '@/components/global/trekHistory';

export default function history() {
  return (
    <div >
      <TrekHistory
        treks={[
          {
            id: "1",
            trekName: "Kedarkantha Trek",
            location: "Uttarakhand",
            date: "12 Jan 2024",
            duration: "5 Days",
            distance: "26 km",
            status: "Current",
          },
          {
            id: "2",
            trekName: "Hampta Pass",
            location: "Himachal Pradesh",
            date: "20 Mar 2024",
            duration: "6 Days",
            distance: "35 km",
            status: "Cancelled",
          },
          {
            id: "3",
            trekName: "Roopkund Trek",
            location: "Uttarakhand",
            date: "10 Dec 2023",
            duration: "4 Days",
            distance: "22 km",
            status: "Completed",
          },
        ]}
      />

    </div>
  );
}