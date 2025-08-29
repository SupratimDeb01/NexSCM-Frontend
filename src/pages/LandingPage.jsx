import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo (2).png'
// import landing_page from '../assets/landing_page_own_dp.svg'
import { MdKeyboardDoubleArrowRight } from "react-icons/md"; 
import { TbBrandYoutube } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
// import job from '../assets/chose_us_1.svg'
// import ai from '../assets/chose_us_2.svg'
// import speed from '../assets/chose_us_3.svg'
import SignInPage from './Auth/SignInPage';
import SignUpPage from './Auth/SignUpPage';
import Modals from '../components/Modals';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import UserSignOutCard from "../components/cards/UserSignOutCard"

const LandingPage = () => {
const {user}=useContext(UserContext);  
const navigate = useNavigate();
const [openAuthModal, setOpenAuthModal]= useState(false);
const [currentPage, setCurrentPage]= useState("sign-in");

const handleCTA=()=>{
  if (user?.token) {
      // check role and navigate to correct dashboard
      if (user.role === "supplier") {
        navigate("/dashboard/supplier");
      } else if (user.role === "manufacturer") {
        navigate("/dashboard/manufacturer");
      } else {
        navigate("/dashboard"); // fallback
      }
    } else {
      // not logged in
      setOpenAuthModal(true);
    }
};


  return (
    <>
<div
  className="w-full min-h-screen flex flex-col"
  style={{
    backgroundImage: `
      radial-gradient(circle 400px at top, rgba(110, 198, 153, 0.4), transparent 90%),
      radial-gradient(circle 450px at center left, rgba(255, 218, 185, 0.4), transparent 90%),
      radial-gradient(circle 450px at bottom right, rgba(229, 152, 157, 0.4), transparent 90%)
    `,
  }}
>
  {/* Header */}
  <header className="fixed top-0 z-50 font-bold flex justify-between items-center w-full h-16 sm:px-8 md:px-14 xl:px-24 px-10 bg-white shadow-lg">
    <img src={logo} className="h-12 sm:h-10 md:h-14 lg:h-16 w-auto" />
    {user ? (
      <UserSignOutCard />
    ) : (
      <button
        className="flex justify-center items-center gap-2 xl:text-lg lg:text-md sm:text-sm text-base border-b-4 border-2 w-38 h-12 rounded-3xl bg-green-300 hover:bg-green-400 transition duration-600 transform hover:scale-105 cursor-pointer"
        onClick={() => setOpenAuthModal(true)}
      >
        SignIn <FaUser />
      </button>
    )}
  </header>

  {/* Main content */}
  <main className="flex flex-1 items-center justify-center px-10 sm:px-24 pt-24">
    <div className="flex flex-col gap-6 justify-center items-center text-center">
      <h1 className="xl:text-6xl lg:text-5xl sm:text-4xl text-3xl font-extrabold leading-tight">
        Empowering You to 
        <span className="block text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#2cff52_100%)] bg-[length:200%_200%] animate-text-shine">
          Make Smarter Decisions
        </span>
      </h1>
      <h5 className="xl:text-xl lg:text-lg sm:text-md text-base font-medium">
        Create tenders, compare supplier bids, auto-generate POs, and verify
        <span className="block">
            invoices — all in one platform, built for speed and simplicity.
        </span>
      </h5>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          className="text-xl font-bold flex justify-center gap-2 items-center border-2 w-48 h-15 rounded-full bg-rose-400 border-b-4 hover:bg-rose-500 transition duration-500 transform hover:scale-105 cursor-pointer"
          onClick={handleCTA}
        >
          Get Started <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
     <Modals 
     isOpen={openAuthModal}
     onClose={()=>{
      setOpenAuthModal(false);
      setCurrentPage("sign-in");
     }}
     hideHeader
     >
      <div>
        {/*The SignInPage receives setCurrentPage as a prop so that it can switch to "sign-up" on some user action.*/}
        {currentPage === "sign-in" && (<SignInPage setCurrentPage={setCurrentPage}/>)}
        {currentPage === "sign-up" && (<SignUpPage setCurrentPage={setCurrentPage}/>)}
      </div>
     </Modals>
  </main>
</div>

    </>
  )
}

export default LandingPage
