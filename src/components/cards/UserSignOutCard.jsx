import React from 'react'
import { useContext,useState } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 
import { FiUser } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";

const UserSignOutCard = () => {
    const {user,clearUser}=useContext(UserContext);
    const navigate=useNavigate();
     const [isOpen, setIsOpen] = useState(false);
    const handleSignOut = () =>{
        localStorage.clear();
        clearUser();
        navigate("/");
    }
      if (!user) return null;
  return (
  <div className="relative flex flex-col sm:flex-row gap-2 items-start sm:items-center">
    {/* Profile Image */}
    <div
      className="flex bg-amber-200 rounded-full h-13 w-13 overflow-hidden  justify-center items-center"
      onClick={() => setIsOpen(!isOpen)}
    >
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      ) : (
        <FiUser className="text-xl text-stone-700" />
      )}
    </div>

    {/* Desktop View*/}
    <div className="hidden sm:flex flex-col">
      <div className='font-sans text-'>{user.name}</div>
      <button className="flex  items-center gap-2 text-sm font-sans text-violet-500 cursor-pointer" onClick={handleSignOut}>
        Sign Out<FaSignOutAlt />
      </button>
    </div>

    {/* Mobile View*/}
    {isOpen && (
      <div className="absolute top-14 right-[-30px] w-36 bg-white/80 border-amber-100 shadow-lg rounded-md px-3 py-2 sm:hidden z-50">
        <div className="font-sans text-md">{user.name}</div>
        <button
          className="flex  items-center gap-2 text-sm text-violet-500 mt-1 font-sans cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out<FaSignOutAlt className='text-violet-500'/>
        </button>
      </div>
      )}
    </div>
  );
};

export default UserSignOutCard
