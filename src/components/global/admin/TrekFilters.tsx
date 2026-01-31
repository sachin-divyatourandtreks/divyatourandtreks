"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Filters = {
  UserId: string;
  Date: string;
  TrekId: string;
};

type Props = {
  filters: Filters;
};

const TrekFilters = ({ filters }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔹 Local draft state (editable inputs)
  const [draft, setDraft] = useState<Filters>(filters);

  // 🔹 Sync draft when URL filters change (back/forward navigation)
  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(draft).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 grid md:grid-cols-4 gap-4 items-end">

      <input
        type="text"
        placeholder="User ID"
        value={draft.UserId}
        onChange={(e) =>
          setDraft((prev) => ({ ...prev, UserId: e.target.value }))
        }
        className="border px-3 py-2 rounded"
      />

      <input
        type="date"
        value={draft.Date}
        onChange={(e) =>
          setDraft((prev) => ({ ...prev, Date: e.target.value }))
        }
        className="border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="Trek ID"
        value={draft.TrekId}
        onChange={(e) =>
          setDraft((prev) => ({ ...prev, TrekId: e.target.value }))
        }
        className="border px-3 py-2 rounded"
      />

      {/* 🔍 Search Button */}
      <button
        onClick={handleSearch}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition font-medium"
      >
        Search
      </button>
    </div>
  );
};

export default TrekFilters;
