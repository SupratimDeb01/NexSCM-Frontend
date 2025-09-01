import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modals from "../../components/Modals";
import SubmitBid from "./SubmitBid";

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedRfq, setSelectedRfq] = useState(null);

  // Fetch open RFQs
  const fetchRFQs = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.RFQ.GET_ALL);
      const rfqList = Array.isArray(data) ? data : data.rfqs || [];
      setRfqs(rfqList.filter((rfq) => rfq.status === "open"));
    } catch (error) {
      console.error("Error fetching RFQs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFQs();
  }, []);

  return (
    <DashboardLayout>
      <div className="px-10 pt-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Supplier Dashboard
          </h1>
          <div className="flex gap-2">

          <button
      onClick={() => navigate("/dashboard/supplier/selectedRFQs")}
      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
      >
      Selected RFQs
    </button>
          <button
            onClick={() => navigate("/dashboard/supplier/submittedbids")}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
            >
            View My Bids
          </button>
          </div>
        </div>

        {/* Open RFQs section */}
        <div className="mt-6 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Open RFQs</h2>

          {loading ? (
            <div className="text-gray-500">Loading RFQs...</div>
          ) : rfqs.length === 0 ? (
            <div className="text-gray-500">No open RFQs available.</div>
          ) : (
            <ul className="space-y-3">
              {rfqs.map((rfq) => (
                <li
                  key={rfq._id}
                  className="border rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{rfq.title}</h3>
                    <p className="text-sm text-gray-600">{rfq.description}</p>
                    <p className="text-xs text-gray-500">
                      Quantity: {rfq.quantity} | Deadline:{" "}
                      {new Date(rfq.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedRfq(rfq);
                      setShowModal(true);
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Submit Bid
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Submit Bid Modal */}
      <Modals
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        hideHeader
      >
        {selectedRfq && (
          <SubmitBid
            rfq={selectedRfq}
            onSuccess={() => {
              setShowModal(false);
              fetchRFQs();
            }}
          />
        )}
      </Modals>
    </DashboardLayout>
  );
};

export default SupplierDashboard;
