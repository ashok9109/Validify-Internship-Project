import React from 'react'
import NavLink from '../components/navigation/NavLink';
import { Outlet } from 'react-router';

const HomeLayout = () => {
  return (
    <>
      <div className=' flex bg-slate-950'>
        {/* Nav link */}
        <aside className=' w-[20%] ' >
          <NavLink />
        </aside>

        {/* page content */}
        <div className=' w-[80%] ' >
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default HomeLayout;
