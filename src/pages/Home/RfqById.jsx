import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/userContext";

const RfqById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useContext(UserContext);

  const [rfq, setRfq] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidsLoading, setBidsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recommendedBidId, setRecommendedBidId] = useState(null);

  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/");
      return;
    }
    if (!user) return;

    const fetchRfq = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_PATHS.RFQ.GET_BY_ID(id));
        setRfq(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchBids = async () => {
      try {
        setBidsLoading(true);
        const response = await axiosInstance.get(API_PATHS.BID.GET_BY_RFQ(id));
        setBids(response.data);
      } catch (err) {
        console.error("Error fetching bids:", err);
      } finally {
        setBidsLoading(false);
      }
    };

    fetchRfq();
    fetchBids();
  }, [id, user, userLoading, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this RFQ?")) return;
    try {
      await axiosInstance.delete(API_PATHS.RFQ.DELETE_BY_ID(id));
      navigate("/dashboard/manufacturer");
    } catch (err) {
      alert("Failed to delete RFQ");
    }
  };

  const handleAcceptBid = async (bidId) => {
    try {
      await axiosInstance.put(API_PATHS.BID.SELECT(bidId));
      alert("Bid accepted & PO created");
      const res = await axiosInstance.get(API_PATHS.BID.GET_BY_RFQ(id));
      setBids(res.data);
    } catch (err) {
      console.error("Error accepting bid:", err);
      alert("Failed to accept bid");
    }
  };

  const handleRejectBid = async (bidId) => {
    try {
      await axiosInstance.put(API_PATHS.BID.REJECT(bidId));
      alert("Bid rejected");
      const res = await axiosInstance.get(API_PATHS.BID.GET_BY_RFQ(id));
      setBids(res.data);
    } catch (err) {
      console.error("Error rejecting bid:", err);
      alert("Failed to reject bid");
    }
  };

 const handleFilter = async () => {
  try {
    const res = await axiosInstance.put(API_PATHS.BID.RECOMMEND_BY_RFQ(id));
    setRecommendedBidId(res.data.bid._id); // backend returns bid
  } catch (err) {
    console.error("Error fetching recommended bid:", err);
    alert("Failed to get recommendation");
  }
};


  if (userLoading) return <div className="flex justify-center items-center h-screen">Loading user...</div>;
  if (!user) return null;

  return (
    <DashboardLayout>
      {loading ? (
        <div>Loading RFQ...</div>
      ) : error || !rfq ? (
        <div>No RFQ found</div>
      ) : (
        <div className="p-6 pt-20">
          {/* Top Right Buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete RFQ
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() =>
                user?.role === "manufacturer"
                  ? navigate("/dashboard/manufacturer")
                  : navigate("/dashboard/supplier")
              }
            >
              Back to Dashboard
            </button>
          </div>

          {/* RFQ Details */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-2">{rfq.title}</h2>
            <p className="mb-2"><strong>Status:</strong> {rfq.status}</p>
            <p className="mb-2"><strong>Description:</strong> {rfq.description}</p>
            <p className="mb-2"><strong>Quantity:</strong> {rfq.quantity}</p>
            <p className="mb-2"><strong>Deadline:</strong> {new Date(rfq.deadline).toLocaleDateString()}</p>
          </div>

          {/* Filter Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleFilter}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Filter (Recommended)
            </button>
          </div>

          {/* Supplier Bids */}
          <div className="bg-gray-50 shadow-inner rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Supplier Bids</h3>
            {bidsLoading ? (
              <p>Loading bids...</p>
            ) : bids.length === 0 ? (
              <p className="text-gray-500 italic">No bids submitted yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {bids.map((bid) => (
                  <li
                    key={bid._id}
                    className={`py-3 flex justify-between items-center ${
                      recommendedBidId === bid._id
                        ? "border-2 border-purple-600 rounded-lg p-3"
                        : ""
                    }`}
                  >
                    <div>
                      <p><strong>Supplier:</strong> {bid.supplier?.name || "Unknown"}</p>
                      <p><strong>Unit Price:</strong> ${bid.unitPrice}</p>
                      <p><strong>Delivery Days:</strong> {bid.deliveryDays} days</p>
                      <p><strong>Status:</strong> {bid.status}</p>
                    </div>
                    <div className="flex gap-2">
                      {bid.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => handleAcceptBid(bid._id)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectBid(bid._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RfqById;
