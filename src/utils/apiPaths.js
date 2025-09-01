export const BASE_URL = "https://nexscm-backend-production.up.railway.app/";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },

  RFQ: {
    CREATE: "/api/rfq",          // POST
    GET_ALL: "/api/rfq",         // GET
    GET_BY_ID: (id) => `/api/rfq/${id}`,   // GET
    CLOSE: (id) => `/api/rfq/${id}/close`, // POST
    GET_MY_RFQS: "/api/rfq/my-requests",   // GET (for manufacturers)
    DELETE_BY_ID: (id) => `/api/rfq/${id}`, //  DELETE
  },

  BID: {
    SUBMIT: (rfqId) => `/api/bid/${rfqId}`,   // POST
    GET_BY_RFQ: (rfqId) => `/api/bid/rfq/${rfqId}`, // GET
    GET_MY_BIDS: "/api/bid/my-bids", 
    RECOMMEND_BY_RFQ: (rfqId) => `/api/bid/rfq/${rfqId}/recommend`,

     SELECT: (bidId) => `/api/bid/${bidId}/select`,      // PUT
     REJECT: (bidId) => `/api/bid/${bidId}/reject` ,
    GET_ACCEPTED: () => "/api/bid/accepted",   // GET all accepted bids
      GET_SELECTED_FOR_SUPPLIER: () => "/api/bid/selected" // GET selected bids (supplier)
  },

  PO: {
    CREATE: "/api/po",             // POST
    GET_ALL: "/api/po",            // GET
    GET_BY_ID: (id) => `/api/po/${id}`, // GET
     DOWNLOAD: (id) => `/api/po/${id}/download` // GET for downloading PO (if implemented)
  },

//   GRN: {
//     SUBMIT: "/api/grn",            // POST
//     GET_ALL: "/api/grn",           // GET
//     GET_BY_PO: (poId) => `/api/grn/po/${poId}`, // GET
//   },

  // INVOICE: {
  //   SUBMIT: "/api/invoice",        // POST
  //   GET_ALL: "/api/invoice",       // GET
  //   GET_BY_PO: (poId) => `/api/invoice/po/${poId}`, // GET
  //   APPROVE: (id) => `/api/invoice/${id}/approve`, // POST
  //   DISPUTE: (id) => `/api/invoice/${id}/dispute`, // POST
  //    DOWNLOAD: (id) => `/api/invoice/${id}/download`, // GET (download Invoice PDF ✅)
  // },
   INVOICE: {
    SUBMIT: "/api/invoice",
    GET_ALL: "/api/invoice",              
    VERIFY: (id) => `/api/invoice/${id}/verify`,
    DISPUTE: (id) => `/api/invoice/${id}/dispute`,
    DOWNLOAD: (id) => `/api/invoice/${id}/download`,
  },
};


