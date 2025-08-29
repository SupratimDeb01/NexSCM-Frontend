import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateRFQ = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !description || !quantity || !deadline) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(API_PATHS.RFQ.CREATE, {
        title,
        description,
        quantity,
        deadline,
      });
      setLoading(false);
      if (onSuccess) onSuccess(response.data); // Refresh parent dashboard
      setTitle("");
      setDescription("");
      setQuantity("");
      setDeadline("");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to create RFQ");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Create New RFQ</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter RFQ title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter RFQ description"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter quantity"
            min="1"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create RFQ"}
        </button>
      </form>
    </div>
  );
};

export default CreateRFQ;
