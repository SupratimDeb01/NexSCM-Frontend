import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast, { Toaster } from "react-hot-toast";

const AcceptBids = () => {
  const [acceptedBids, setAcceptedBids] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch accepted bids
  const fetchAcceptedBids = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.BID.GET_ACCEPTED());
      setAcceptedBids(res.data);
    } catch (error) {
      console.error("Error fetching accepted bids:", error);
      toast.error("Failed to fetch accepted bids");
    }
  };

  // Fetch invoices
  const fetchInvoices = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.INVOICE.GET_ALL);
      setInvoices(res.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("Failed to fetch invoices");
    }
  };

  useEffect(() => {
    Promise.all([fetchAcceptedBids(), fetchInvoices()]).finally(() =>
      setLoading(false)
    );
  }, []);

  // Download invoice
  const downloadInvoice = async (id) => {
    try {
      const res = await axiosInstance.get(API_PATHS.INVOICE.DOWNLOAD(id), {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Invoice downloaded successfully ✅");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast.error("Failed to download invoice ❌");
    }
  };

  // Verify invoice
  const verifyInvoice = async (invoiceId) => {
    try {
      await axiosInstance.put(API_PATHS.INVOICE.VERIFY(invoiceId));
      toast.success("Invoice verified successfully ✅");

      // Refresh invoices after verification
      fetchInvoices();
    } catch (error) {
      console.error("Error verifying invoice:", error);
      toast.error("Failed to verify invoice ❌");
    }
  };

  // ✅ Helper: find invoice for a PO
  const getInvoiceForPO = (poId) => {
    return invoices.find(
      (inv) => inv.po === poId || inv.po?._id === poId
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 pt-20">
        <Toaster position="bottom-center" reverseOrder={false} />

        <h2 className="text-2xl font-bold mb-4">Accepted Bids</h2>

        {loading ? (
          <p>Loading accepted bids...</p>
        ) : acceptedBids.length === 0 ? (
          <p className="text-gray-500 italic">No accepted bids found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {acceptedBids.map((bid) => {
              const invoice = getInvoiceForPO(bid.po?._id);

              return (
                <li
                  key={bid._id}
                  className="py-3 flex justify-between items-center border-b-stone-400 border-b-2"
                >
                  <div>
                    <p>
                      <strong>RFQ:</strong> {bid.rfq?.title || "Unknown"}
                    </p>
                    <p>
                      <strong>Supplier:</strong>{" "}
                      {bid.supplier?.name || "Unknown"}
                    </p>
                    <p>
                      <strong>Unit Price:</strong> ${bid.unitPrice}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {bid.rfq?.quantity}
                    </p>
                    <p>
                      <strong>Total:</strong> ${bid.total}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {invoice ? (
                      <>
                        <button
                          onClick={() => downloadInvoice(invoice._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Download Invoice
                        </button>

                        {invoice.status === "verified" ? (
                          <button
                            disabled
                            className="bg-green-600 text-white px-4 py-2 rounded opacity-75 cursor-not-allowed"
                          >
                            Verified
                          </button>
                        ) : (
                          <button
                            onClick={() => verifyInvoice(invoice._id)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          >
                            Verify PO & Invoice
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-500 italic">
                        Invoice not issued yet
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AcceptBids;
