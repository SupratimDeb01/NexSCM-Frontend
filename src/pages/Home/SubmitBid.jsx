// src/components/SubmitBid.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const SubmitBid = ({ rfq, onSuccess, onClose }) => {
  const [bidData, setBidData] = useState({
    unitPrice: "",
    deliveryDays: "",
  });
  const [loading, setLoading] = useState(false);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.post(API_PATHS.BID.SUBMIT(rfq._id), {
  unitPrice: bidData.unitPrice,
  deliveryDays: bidData.deliveryDays,
});
      alert("Bid submitted successfully!");
      setBidData({ unitPrice: "", deliveryDays: "" });
      onSuccess?.(); // refresh RFQs or close modal
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to submit bid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-96">
      <h2 className="text-xl font-semibold mb-4">
        Submit Bid for {rfq?.title}
      </h2>

      <form onSubmit={handleBidSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Unit Price
          </label>
          <input
            type="number"
            value={bidData.unitPrice}
            onChange={(e) =>
              setBidData({ ...bidData, unitPrice: e.target.value })
            }
            required
            className="mt-1 w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Delivery Days
          </label>
          <input
            type="number"
            value={bidData.deliveryDays}
            onChange={(e) =>
              setBidData({ ...bidData, deliveryDays: e.target.value })
            }
            required
            className="mt-1 w-full border rounded p-2"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitBid;
