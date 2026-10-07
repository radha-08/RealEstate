import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Car, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

export default function ScheduleVisitModal({ plot, isOpen, onClose }) {
  const { scheduleVisit } = useData();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    visitor_name: user?.name || '',
    visitor_phone: user?.phone || '',
    visitor_email: user?.email || '',
    visit_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    visit_time: '11:00 AM',
    people_count: 2,
    transport: 'own_car',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    scheduleVisit({
      plot_id: plot.id,
      plot_name: plot.title || plot.name,
      location: plot.location,
      ...formData
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="mt-4 text-xl font-black text-gray-950">
              Site Visit Scheduled!
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Your site visit for <strong className="text-gray-900">{plot.title || plot.name}</strong> on{' '}
              <strong className="text-gray-900">{formData.visit_date}</strong> at{' '}
              <strong className="text-gray-900">{formData.visit_time}</strong> has been confirmed.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Our site coordinator will call <span className="font-semibold text-gray-800">{formData.visitor_phone}</span> to coordinate your pickup or route directions.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 w-full rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700"
            >
              Done & View Plot
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-600">
                Free Site Visit Coordination
              </span>
              <h2 className="text-lg font-black text-gray-950">
                Schedule Site Visit: {plot.title || plot.name}
              </h2>
              <p className="text-xs text-gray-500">{plot.location}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.visitor_name}
                    onChange={(e) => setFormData({ ...formData, visitor_name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.visitor_phone}
                    onChange={(e) => setFormData({ ...formData, visitor_phone: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
                    placeholder="+91 98765 00000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700">Visit Date *</label>
                  <div className="relative mt-1">
                    <input
                      type="date"
                      required
                      value={formData.visit_date}
                      onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700">Preferred Time Slot *</label>
                  <select
                    value={formData.visit_time}
                    onChange={(e) => setFormData({ ...formData, visit_time: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
                  >
                    <option value="10:00 AM">10:00 AM - Morning</option>
                    <option value="11:30 AM">11:30 AM - Late Morning</option>
                    <option value="02:00 PM">02:00 PM - Afternoon</option>
                    <option value="04:00 PM">04:00 PM - Evening</option>
                    <option value="05:30 PM">05:30 PM - Sunset</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700">Number of Persons</label>
                  <select
                    value={formData.people_count}
                    onChange={(e) => setFormData({ ...formData, people_count: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
                  >
                    <option value={1}>1 Person</option>
                    <option value={2}>2 Persons (Couple)</option>
                    <option value={3}>3-4 Persons (Family)</option>
                    <option value={5}>5+ Persons (Group)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700">Mode of Transport</label>
                  <select
                    value={formData.transport}
                    onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
                  >
                    <option value="own_car">Own Vehicle / Car</option>
                    <option value="cab">Public Transport / Cab</option>
                    <option value="need_pickup">Need Site Pickup from ORR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700">Notes / Questions (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-green-600 focus:outline-none"
                  placeholder="e.g. Interested in corner plots or East facing..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-green-600 py-3 text-sm font-bold text-white shadow-md hover:bg-green-700 transition-colors"
                >
                  Confirm Free Site Visit
                </button>
                <p className="mt-2 text-center text-[11px] text-gray-400">
                  Zero obligation • Site coordinators provide plot map & layout walkthrough
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
