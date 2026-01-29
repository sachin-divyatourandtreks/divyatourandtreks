import React from 'react';
import UserTabs from '@/components/global/UserTab';
import { adminTabs, profileTabs } from "@/constants/links";

type Props = {
    children: React.ReactNode
}

const AdminLayout = ({children}: Props) => {
  return (
    <div className='flex flex-col py-15 px-3 container gap-3'>
        <UserTabs tabs={adminTabs} />
        {children}
    </div>
  )
}

export default AdminLayout;