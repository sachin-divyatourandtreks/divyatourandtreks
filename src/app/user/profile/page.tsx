import React from 'react';
import Profile from '@/components/global/profile';

export default function profile() {
  return (
    <div >
      <Profile
        name="Rahul Sharma"
        email="rahul@email.com"
        phone="+91 98765 43210"
        trips={12}
        distance="145 km"
        yearsActive={3}
        avatarUrl="https://i.pravatar.cc/300"
      />
    </div>
  );
}