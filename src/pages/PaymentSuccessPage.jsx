import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PaymentSuccessPage() {
  useEffect(() => {
    try {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-sm">
          
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-12 w-12" />
          </div>

          <span className="mt-6 inline-block rounded-full bg-green-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-green-800">
            Payment Verified
          </span>

          <h1 className="mt-3 text-2xl font-black text-gray-950 sm:text-3xl">
            Featured Plan Activated!
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500">
            Your payment via PhonePe QR has been reconciled. Your layout has been granted Featured Placement status across OnlyPlots.online.
          </p>

          <div className="mt-8 rounded-2xl bg-gray-50 p-4 border border-gray-100 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction Mode:</span>
              <span className="font-bold text-gray-900">PhonePe UPI (Instant Settlement)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid:</span>
              <span className="font-bold text-green-700">₹9.99 (Special Promotional Rate)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Duration:</span>
              <span className="font-bold text-gray-900">30 Days Featured Visibility</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Invoice Status:</span>
              <span className="font-bold text-gray-900">Paid & Recorded</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/seller"
              className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-xs font-black text-white hover:bg-green-700 shadow-sm transition-colors"
            >
              <span>Go to Seller Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20just%20completed%20the%20PhonePe%20Featured%20Plan%20activation%20on%20OnlyPlots.online."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500 bg-emerald-50 py-3 text-xs font-black text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              <span>Contact Promoter Concierge</span>
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
