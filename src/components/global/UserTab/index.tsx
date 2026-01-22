"use client";

import { usePathname, useRouter } from "next/navigation";
import { tabs } from "@/constants/links";

const UserTabs = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <div className="flex bg-gray-100 rounded-xl p-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <button
              key={tab.name}
              onClick={() => router.push(tab.path)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all
                ${isActive 
                  ? "bg-white shadow text-blue-600" 
                  : "text-gray-500 hover:text-gray-800"
                }
              `}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}


export default UserTabs;