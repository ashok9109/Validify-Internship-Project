import React from 'react'
import NavLink from '../components/navigation/NavLink';
import { Outlet } from 'react-router';

const HomeLayout = () => {
  return (
    <>
      <div className='flex'>
        <aside>
        {/* Nav link */}
          <NavLink />
        </aside>

        <div className='h-screen w-[80%]' >
        {/* page content */}
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default HomeLayout;
