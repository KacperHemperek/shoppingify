import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

function NavOption({ icon, to }: { to: string; icon: React.ReactNode }) {
  return (
    <NavLink to={to} className='flex h-14 items-center'>
      {({ isActive }: { isActive: boolean }) =>
        isActive ? (
          <>
            <motion.div
              className='h-full w-2 rounded-r-lg bg-primary'
              layoutId={'nav-active'}
            />
            <div className='flex h-full w-full items-center justify-center'>
              {icon}
            </div>
          </>
        ) : (
          <>
            <div className='h-full w-2' />
            <div className='flex h-full w-full items-center justify-center'>
              {icon}
            </div>
          </>
        )
      }
    </NavLink>
  );
}

export default NavOption;
