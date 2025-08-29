// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import DashboardLayout from "../../components/layouts/DashboardLayout";

// const SelectedRfqs = () => {
//   const [selectedRfqs, setSelectedRfqs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSelectedRfqs = async () => {
//     try {
//       const { data } = await axiosInstance.get(
//         API_PATHS.BID.GET_SELECTED_FOR_SUPPLIER()
//       );
//       setSelectedRfqs(data || []);
//     } catch (error) {
//       console.error("Error fetching selected RFQs:", error);
//       setSelectedRfqs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSelectedRfqs();
//   }, []);

//   const handleDownloadPO = async (poId) => {
//     if (!poId) return;

//     try {
//       const response = await axiosInstance.get(API_PATHS.PO.DOWNLOAD(poId), {
//         responseType: "blob",
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `PO_${poId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error("Error downloading PO:", error);
//     }
//   };

// const handleIssueInvoice = async (poId) => {
//   try {
//     // fetch PO details first
//     const { data: po } = await axiosInstance.get(API_PATHS.PO.GET_BY_ID(poId));

//     const invoiceData = {
//       poId: poId,
//       items: po.items.map(item => ({
//         description: item.description,
//         quantity: item.quantity,
//         unitPrice: item.unitPrice,
//       })),
//       totalAmount: po.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0),
//     };

//     const { data: invoice } = await axiosInstance.post(
//       API_PATHS.INVOICE.SUBMIT,
//       invoiceData
//     );

//     alert("Invoice issued successfully!");
//     console.log("Created invoice:", invoice);
//   } catch (error) {
//     console.error(error);
//     alert("Failed to issue invoice");
//   }
// };



//   return (
//     <DashboardLayout>
//       <div className="p-6 pt-20">
//         <h1 className="text-2xl font-semibold mb-4">Selected RFQs</h1>

//         {loading ? (
//           <div className="text-gray-500">Loading...</div>
//         ) : selectedRfqs.length === 0 ? (
//           <div className="text-gray-500">No selected RFQs yet.</div>
//         ) : (
//           <div className="space-y-4">
//             {selectedRfqs.map((bid) => {
//               const rfq = bid.rfq || {};
//               const poId =
//                 bid.po?._id || (typeof bid.po === "string" ? bid.po : null);

                
//               return (
//                 <div
//                   key={bid._id}
//                   className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition"
//                 >
//                   <div>
//                     <h2 className="font-medium text-gray-800">
//                       {rfq.title || "No title"}
//                     </h2>
//                     <p className="text-sm text-gray-600">
//                       {rfq.description || "No description"}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Quantity: {rfq.quantity ?? "-"} | Deadline:{" "}
//                       {rfq.deadline
//                         ? new Date(rfq.deadline).toLocaleDateString()
//                         : "-"}
//                     </p>
//                     <p className="text-sm text-green-600 font-semibold">
//                       Selected! Unit Price: {bid.unitPrice ?? "-"} | Total:{" "}
//                       {bid.total ?? "-"}
//                     </p>
//                   </div>

//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleDownloadPO(poId)}
//                       disabled={!poId}
//                       className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//                     >
//                       Download PO
//                     </button>

//                     <button
//                       onClick={() => handleIssueInvoice(poId)}
//                       className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                     >
//                       Issue Invoice
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default SelectedRfqs;


import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast, { Toaster } from "react-hot-toast";

const SelectedRfqs = () => {
  const [selectedRfqs, setSelectedRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSelectedRfqs = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.BID.GET_SELECTED_FOR_SUPPLIER()
      );
      setSelectedRfqs(data || []);
    } catch (error) {
      console.error("Error fetching selected RFQs:", error);
      setSelectedRfqs([]);
      toast.error("Failed to fetch selected RFQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelectedRfqs();
  }, []);

  const handleDownloadPO = async (poId) => {
    if (!poId) return;

    try {
      const response = await axiosInstance.get(API_PATHS.PO.DOWNLOAD(poId), {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `PO_${poId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("PO downloaded successfully!");
    } catch (error) {
      console.error("Error downloading PO:", error);
      toast.error("Failed to download PO");
    }
  };

  const handleIssueInvoice = async (poId) => {
    try {
      // fetch PO details first
      const { data: po } = await axiosInstance.get(API_PATHS.PO.GET_BY_ID(poId));

      const invoiceData = {
        poId: poId,
        items: po.items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        totalAmount: po.items.reduce(
          (sum, i) => sum + i.quantity * i.unitPrice,
          0
        ),
      };

      const { data: invoice } = await axiosInstance.post(
        API_PATHS.INVOICE.SUBMIT,
        invoiceData
      );

      toast.success("Invoice issued successfully!");
      console.log("Created invoice:", invoice);
    } catch (error) {
      console.error(error);
      toast.error("Failed to issue invoice");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 pt-20">
        {/* Toaster Container */}
        <Toaster position="top-center" reverseOrder={false} />

        <h1 className="text-2xl font-semibold mb-4">Selected RFQs</h1>

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : selectedRfqs.length === 0 ? (
          <div className="text-gray-500">No selected RFQs yet.</div>
        ) : (
          <div className="space-y-4">
            {selectedRfqs.map((bid) => {
              const rfq = bid.rfq || {};
              const poId =
                bid.po?._id || (typeof bid.po === "string" ? bid.po : null);

              return (
                <div
                  key={bid._id}
                  className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <div>
                    <h2 className="font-medium text-gray-800">
                      {rfq.title || "No title"}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {rfq.description || "No description"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Quantity: {rfq.quantity ?? "-"} | Deadline:{" "}
                      {rfq.deadline
                        ? new Date(rfq.deadline).toLocaleDateString()
                        : "-"}
                    </p>
                    <p className="text-sm text-green-600 font-semibold">
                      Selected! Unit Price: {bid.unitPrice ?? "-"} | Total:{" "}
                      {bid.total ?? "-"}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownloadPO(poId)}
                      disabled={!poId}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      Download PO
                    </button>

                    <button
                      onClick={() => handleIssueInvoice(poId)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Issue Invoice
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SelectedRfqs;
