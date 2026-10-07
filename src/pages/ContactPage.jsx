import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useData } from '../context/DataContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Loader2, 
  Clock, 
  MessageSquare 
} from 'lucide-react';

export default function ContactPage() {
  const { addContactMessage } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      addContactMessage(formData);
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 800);
  };

  const inputClass = "w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors";

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-green-800">
            Get In Touch
          </span>
          <h1 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Questions about a plot, listing your layout venture, or seeking legal verification support? Send us a message and our team will get back to you promptly.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          
          <div className="space-y-4">
            {/* Phone */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-gray-900">Call Us</h3>
              <p className="mt-1 text-sm font-semibold text-gray-800">+91 98765 43210</p>
              <p className="text-xs text-gray-400 mt-0.5">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-gray-900">Email Support</h3>
              <p className="mt-1 text-sm font-semibold text-gray-800">support@onlyplots.online</p>
              <p className="text-xs text-gray-400 mt-0.5">Typical response within 2 hours</p>
            </div>

            {/* Location */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-gray-900">Visit Our Office</h3>
              <p className="mt-1 text-sm font-semibold text-gray-800">Hyderabad, Telangana, India</p>
              <p className="text-xs text-gray-400 mt-0.5">PIN 500081 (Near HITEC City / ORR)</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-4 text-xl font-black text-gray-950">
                    Message Sent Successfully!
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 max-w-sm">
                    Thanks for reaching out to OnlyPlots.online. One of our layout advisors will contact you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 rounded-xl border border-green-600 px-5 py-2.5 text-xs font-bold text-green-700 hover:bg-green-50"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-700">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-700">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-700">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClass}
                        placeholder="+91 98765 00000"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-700">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={inputClass}
                        placeholder="What is this regarding?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-700">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={inputClass}
                      placeholder="Tell us how we can help you find or sell plots..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-3 text-sm font-black text-white hover:bg-green-700 disabled:opacity-60 transition-colors shadow-sm"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
