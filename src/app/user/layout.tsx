import React from 'react';
import UserTabs from '@/components/global/UserTab';

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex flex-col py-15 px-3 container'>
      <UserTabs />
      {children}
    </div>
  )
}

export default Layout;