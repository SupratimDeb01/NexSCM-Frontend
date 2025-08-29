import React from 'react'
import logo from '../../assets/logo (2).png'
import UserSignOutCard from '../cards/UserSignOutCard'
import { Link } from 'react-router-dom'
import { useEffect,useState } from 'react'


const Navbar = () => {
  const[isScrolled,setIsScrolled]=useState(false);
  useEffect(()=>{
    const handleState=()=>{
      setIsScrolled(scrollY>0);
    }
    window.addEventListener('scroll',handleState);
    return () => window.removeEventListener("scroll", handleState);
  },[]);
  return (
     <div className={` top-0 z-50 font-bold flex justify-between items-center w-screen h-18 sm:px-8 md:px-14 xl:px-24 px-10 bg-white shadow-sm ${isScrolled ? ' hidden' : 'fixed'}`}>
       
      {/* Logo should be the only thing clickable */}
      <Link to="/">
        <img src={logo} className="h-12 sm:h-10 md:h-14 lg:h-16 w-auto" alt="Logo" />
      </Link>

      <UserSignOutCard />
    </div>
  )
}

export default Navbar
