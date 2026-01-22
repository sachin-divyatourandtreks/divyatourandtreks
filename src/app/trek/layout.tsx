import React from 'react';

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
<<<<<<< HEAD
    <div>
=======
    <div className='flex flex-col container'>
>>>>>>> 7629eac (trek page created)
        {children}
    </div>
  )
}

export default Layout;