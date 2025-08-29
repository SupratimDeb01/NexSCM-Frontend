import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Home/Dashboard';
import SupplierDashboard from './pages/Home/SupplierDashboard';
import UserProvider from './context/userContext';
import RfqById from './pages/Home/RfqById';
import ProtectedRoute from './components/ProtectedRoute';
import SubmittedBids from './pages/Home/SubmittedBids';
import AcceptBids from './pages/Home/AcceptBids';
import SelectedRfqs from './pages/Home/SelectedRfqs';

const App = () => { 
  return (
    <UserProvider>
      <div>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected dashboards */}
          <Route
            path="/dashboard/manufacturer"
            element={
              <ProtectedRoute role="manufacturer">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/supplier"
            element={
              <ProtectedRoute role="supplier">
                <SupplierDashboard />
              </ProtectedRoute>
            }
          />

          {/* RFQ details (protected for logged-in users) */}
          <Route
            path="/rfq/:id"
            element={
              <ProtectedRoute>
                <RfqById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/supplier/submittedbids"
            element={
              <ProtectedRoute>
                <SubmittedBids />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manufacturer/acceptedbids"
            element={
              <ProtectedRoute>
                <AcceptBids />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/supplier/selectedRFQs"
            element={
              <ProtectedRoute>
                <SelectedRfqs />
              </ProtectedRoute>
            }
          />

          {/* Catch-all -> redirect to landing */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>

      <Toaster
        toastOptions={{
          style: { fontSize: "13px" },
        }}
      />
    </UserProvider>
  )
}

export default App;
