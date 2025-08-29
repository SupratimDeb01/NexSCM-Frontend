import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { MdOutlineAddBox } from "react-icons/md";
import Modals from '../../components/Modals';
import CreateRFQ from '../Home/CreateRfq';
import { UserContext } from '../../context/userContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [allRfq, setAllRfq] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const navigate = useNavigate();

  const fetchAllRequests = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RFQ.GET_MY_RFQS);
      console.log("RFQs fetched:", response.data);
      setAllRfq(response.data);
    } catch (error) {
      console.error("Error loading RFQs", error);
    }
  };

  useEffect(() => {
    if (user?.role !== "manufacturer") {
      navigate("/dashboard/supplier"); // redirect if not manufacturer
    } else {
      fetchAllRequests();
    }
  }, [user]);

  return (
    <DashboardLayout>
      {/* Header with Create Button */}
      <div className="flex justify-between items-center mb-4 px-3 md:px-2 pt-20">
        <h2 className="text-xl font-semibold">My RFQs</h2>
        <div className='flex gap-2'>

              <button 
        className="flex items-center bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600"
        onClick={() => navigate("/dashboard/manufacturer/acceptedbids")}
        >
      Accepted Bids
      </button>
        <button
          className="flex items-center bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600"
          onClick={() => setCreateModal(true)}
          >
          <MdOutlineAddBox className="mr-1" />
          Create RFQ
        </button>
          </div>
      </div>

      {/* RFQ List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
        {allRfq.length > 0 ? (
          allRfq.map((rfq) => (
            <div
              key={rfq._id}
              className="border rounded p-4 cursor-pointer hover:shadow-md"
              onClick={() => navigate(`/rfq/${rfq._id}`)}
            >
              <h3 className="font-semibold text-lg">{rfq.title}</h3>
              <p className="text-sm mt-1">
                Status: <span className={rfq.status === "open" ? "text-green-600" : "text-gray-600"}>{rfq.status}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No RFQs found.</p>
        )}
      </div>

      {/* Create RFQ Modal */}
      <Modals
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        hideHeader
      >
        <CreateRFQ onSuccess={() => { setCreateModal(false); fetchAllRequests(); }} />
      </Modals>
    </DashboardLayout>
  );
};

export default Dashboard;
