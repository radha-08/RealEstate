import React, { useState } from 'react';
import { X, CheckCircle, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { De } from '../data/images';
import { useNavigate } from 'react-router-dom';

export default function PhonePeModal({ isOpen, onClose, plan, onPaymentSuccess }) {
  const [whatsapp, setWhatsapp] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
      if (onPaymentSuccess) {
        onPaymentSuccess({ plan, utrNumber, whatsapp });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="mt-4 text-xl font-black text-gray-950">
              Payment Confirmed!
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Your {plan?.name || "Featured Plan"} has been activated.
            </p>
            <div className="mt-4 rounded-xl bg-gray-50 p-3 text-xs text-gray-600 text-left space-y-1">
              <div><strong>UTR / Ref:</strong> {utrNumber || `UPI-${Date.now().toString().slice(-6)}`}</div>
              <div><strong>WhatsApp:</strong> {whatsapp || "+91 98765 43210"}</div>
              <div><strong>Status:</strong> Active (Verified)</div>
            </div>
            <button
              onClick={() => {
                onClose();
                navigate('/payment/success');
              }}
              className="mt-6 w-full rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center">
              <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-green-800">
                Official Merchant Payment
              </span>
              <h3 className="mt-2 text-xl font-black text-gray-900">
                Pay ₹{plan?.price || "9.99"} — PhonePe QR
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Enter WhatsApp number, scan the QR code to pay
              </p>
            </div>

            {/* QR Image */}
            <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div className="relative overflow-hidden rounded-xl bg-white p-2 shadow-sm border border-gray-200">
                <img
                  src={De.phonepeQr}
                  alt="PhonePe QR Code ₹9.99"
                  className="h-48 w-48 object-contain"
                />
              </div>
              <p className="mt-2 text-[11px] font-semibold text-gray-500 flex items-center gap-1.5">
                <Smartphone className="h-3.5 w-3.5 text-purple-600" />
                Scan with PhonePe, Google Pay, or Paytm
              </p>
            </div>

            <form onSubmit={handleVerify} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700">
                  Your WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 00000"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700">
                  UPI Ref ID / UTR Number (Optional for auto-match)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 423589123456"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white shadow-md hover:bg-green-700 disabled:opacity-60 transition-colors"
                >
                  {loading ? (
                    <span className="animate-pulse">Verifying UPI Payment...</span>
                  ) : (
                    <>
                      <span>I Have Completed Payment</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400">
                <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                <span>100% Secure • Instant Layout Verification</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
