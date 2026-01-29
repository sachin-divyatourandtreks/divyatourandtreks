import React from 'react';
import Profile from '@/components/global/profile';
import { cookies } from 'next/headers';

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  trips: number;
  yearsActive: number;
  username: string; 
  token: string;
};

async function getUserProfile(): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/`, { 
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Profile fetch failed: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  const user = await getUserProfile();
  console.log("Fetched user profile:", user);
  if (!user) return <div>Please log in.</div>;

  return (
    <div>
      <Profile
        fullName={user.name}
        email={user.email}
        phoneNo={user.phone}
        trips={user.trips}
        yearsActive={user.yearsActive}
        avatarUrl={`https://ui-avatars.com/api/?name=${user.name}`}
        username={user.username || "Mountain Trekker"}
        token={token || ""} 
      />
    </div>
  );
}