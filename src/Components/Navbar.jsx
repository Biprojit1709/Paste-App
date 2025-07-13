import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 place-content-around mb-8 bg-black p-2 rounded-[10px]'>
      <NavLink to="/" className="text- hover:text-yellow-300">
        Home
      </NavLink>

      <NavLink to="/pastes">
        Pastes
      </NavLink>
      
    </div>
  )
}

export default Navbar
