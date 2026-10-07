import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import PlotDetailPage from './pages/PlotDetailPage';
import ListingsPage from './pages/ListingsPage';
import InvestmentZonesPage from './pages/InvestmentZonesPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import LoginPage from './pages/LoginPage';
import BuyerSignupPage from './pages/BuyerSignupPage';
import BuilderSignupPage from './pages/BuilderSignupPage';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ListPlotPage from './pages/ListPlotPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import AccountPage from './pages/AccountPage';

// ProtectedRoute wrapper ensuring unauthenticated visitors are redirected to Login
function ProtectedRoute({ children }) {
  const { isAuthed, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] text-sm text-gray-500 font-medium">
        Loading OnlyPlots.online…
      </div>
    );
  }

  return isAuthed ? children : <Navigate to="/login" replace />;
}

// When an unauthenticated user opens the root URL (/), it displays the login page.
// Once authenticated, it displays the real website (HomePage).
function RootHandler() {
  const { isAuthed, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] text-sm text-gray-500 font-medium">
        Loading OnlyPlots.online…
      </div>
    );
  }

  return isAuthed ? <HomePage /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Root Route: Initially displays Login, then Real Website when logged in */}
      <Route path="/" element={<RootHandler />} />

      {/* Direct Route to Real Website */}
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/explore" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

      {/* Plot Details */}
      <Route path="/plot/:id" element={<ProtectedRoute><PlotDetailPage /></ProtectedRoute>} />

      {/* Categories */}
      <Route path="/buy-plots" element={<ProtectedRoute><ListingsPage category="buy-plots" /></ProtectedRoute>} />
      <Route path="/villa-plots" element={<ProtectedRoute><ListingsPage category="villa-plots" /></ProtectedRoute>} />
      <Route path="/residential-plots" element={<ProtectedRoute><ListingsPage category="residential-plots" /></ProtectedRoute>} />

      {/* Corridors & Resources */}
      <Route path="/investment-zones" element={<ProtectedRoute><InvestmentZonesPage /></ProtectedRoute>} />
      <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />

      {/* Static / Information */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Legal */}
      <Route path="/privacy-policy" element={<LegalPage type="privacy-policy" />} />
      <Route path="/terms" element={<LegalPage type="terms" />} />
      <Route path="/refund-policy" element={<LegalPage type="refund-policy" />} />

      {/* Posting & Payments */}
      <Route path="/list-plot" element={<ProtectedRoute><ListPlotPage /></ProtectedRoute>} />
      <Route path="/payment/success" element={<ProtectedRoute><PaymentSuccessPage /></ProtectedRoute>} />

      {/* Dashboards */}
      <Route path="/dashboard" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/:section" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
      <Route path="/seller" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
      <Route path="/seller/:section" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/:section" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/superadmin" element={<Navigate to="/admin" replace />} />
      <Route path="/superadmin/login" element={<Navigate to="/login" replace />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Navigate to="/signup/buyer" replace />} />
      <Route path="/signup/buyer" element={<BuyerSignupPage />} />
      <Route path="/signup/builder" element={<BuilderSignupPage />} />
      <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
