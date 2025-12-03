import React from 'react'
import NavLink from '../components/navigation/NavLink';
import { Outlet } from 'react-router';

const HomeLayout = () => {
  return (
    <>
      <div className='h-screen flex'>
        {/* Nav link */}
        <aside className='h-screen w-[20%] ' >
          <NavLink />
        </aside>

        {/* page content */}
        <div className='h-screen w-[80%] ' >
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default HomeLayout;
