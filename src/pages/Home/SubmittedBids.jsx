import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const SubmittedBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.BID.GET_MY_BIDS);
        setBids(res.data);
      } catch (err) {
        console.error("Error fetching my bids", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBids();
  }, []);

  return (
    <DashboardLayout>
      <div className="bg-white shadow rounded-lg p-6 pt-20">
        <h3 className="text-xl font-semibold mb-4">My Submitted Bids</h3>

        {loading ? (
          <p>Loading your bids...</p>
        ) : bids.length === 0 ? (
          <p className="italic text-gray-500">You have not submitted any bids yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
           <thead>
  <tr className="bg-gray-100">
    <th className="border p-2">RFQ Title</th>
    <th className="border p-2">Manufacturer</th> {/* New column */}
    <th className="border p-2">Quantity</th>
    <th className="border p-2">Unit Price</th>
    <th className="border p-2">Delivery Days</th>
    <th className="border p-2">Total</th>
    <th className="border p-2">Bid Status</th>
  </tr>
</thead>
<tbody>
  {bids.map((bid) => (
    <tr key={bid._id} className="hover:bg-gray-50">
      <td className="border p-2">{bid.rfq?.title}</td>
      <td className="border p-2">{bid.rfq?.manufacturer?.name}</td> {/* Manufacturer */}
      <td className="border p-2">{bid.rfq?.quantity}</td>
      <td className="border p-2">{bid.unitPrice}</td>
      <td className="border p-2">{bid.deliveryDays}</td>
      <td className="border p-2">{bid.total}</td>
      <td className="border p-2">{bid.status}</td>
    </tr>
  ))}
</tbody>

          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SubmittedBids;
