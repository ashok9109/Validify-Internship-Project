import React, { useState } from 'react'
import NavLink from '../components/navigation/NavLink';
import { Outlet } from 'react-router';

const HomeLayout = () => {

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <>
      <section className=' bg-slate-950'>

        {/*Mobile menu  */}
        <header className='flex items-center justify-between md:hidden px-10 py-5' >
          <div className='text-white font-bold' >Validify</div>
          <button
            onClick={() => setOpenMobileMenu(v => !v)}
          >
            <span className='block w-5 h-[2px] bg-white mb-1' ></span>
            <span className='block w-5 h-[2px] bg-white mb-1' ></span>
            <span className='block w-5 h-[2px] bg-white mb-1' ></span>
          </button>
        </header>

        <div className=' lg:flex bg-slate-950' >

          {/* Nav link */}
          <aside className={`md:w-[30%] lg:w-[30%] 
            ${openMobileMenu ? "block" : "hidden"} md:hidden lg:block `} >
            <NavLink />
          </aside>

          {/* page content */}
          <div className='w-full'  >
            <Outlet />
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeLayout;
