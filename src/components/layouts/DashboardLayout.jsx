import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';

const DashboardLayout = ({ activeMenu, children }) => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  // Show loader while fetching user
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  // Redirect if user not logged in
  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      <div className='container mx-auto pt-4 pb-4'>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
