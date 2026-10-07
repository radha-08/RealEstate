import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  Layers, 
  Check, 
  X, 
  Eye, 
  TrendingUp, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function AdminDashboard() {
  const { section = 'listings' } = useParams();
  const [activeTab, setActiveTab] = useState(section);
  const { listings, leads, contactMessages, siteVisits, updatePlotStatus } = useData();
  const { user } = useAuth();

  const handleApprove = (id) => {
    updatePlotStatus(id, 'published');
  };

  const handleReject = (id) => {
    updatePlotStatus(id, 'rejected');
  };

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        
        {/* Admin Header */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-950 text-white shadow-sm">
                <ShieldCheck className="h-7 w-7 text-green-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-gray-950">
                    OnlyPlots SuperAdmin Console
                  </h1>
                  <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-purple-800">
                    Root Access
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  Moderation, Layout Approvals, User Directory & Payment Reconciliation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-xl border border-green-200">
                System Health: Normal (Vite & LocalEngine)
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
              <div className="text-xs font-bold text-gray-500">Total Listings</div>
              <div className="mt-1 text-2xl font-black text-gray-950">{listings.length}</div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
              <div className="text-xs font-bold text-gray-500">Total Leads</div>
              <div className="mt-1 text-2xl font-black text-purple-700">{leads.length}</div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
              <div className="text-xs font-bold text-gray-500">Contact Queries</div>
              <div className="mt-1 text-2xl font-black text-blue-700">{contactMessages.length}</div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
              <div className="text-xs font-bold text-gray-500">Scheduled Visits</div>
              <div className="mt-1 text-2xl font-black text-green-700">{siteVisits.length}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200 pb-3 mb-6 overflow-x-auto scrollbar-none">
          {[
            { id: 'listings', label: `Moderation & Listings (${listings.length})`, icon: Layers },
            { id: 'leads', label: `Platform Leads (${leads.length})`, icon: Users },
            { id: 'messages', label: `Contact Inquiries (${contactMessages.length})`, icon: Mail },
            { id: 'visits', label: `Site Visits (${siteVisits.length})`, icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-all ${
                  activeTab === tab.id
                    ? 'bg-gray-950 text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Moderation / Listings */}
        {activeTab === 'listings' && (
          <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-[11px] font-black uppercase text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">Plot Venture</th>
                    <th className="px-6 py-4">Authority</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {listings.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/70">
                      <td className="px-6 py-4">
                        <Link to={`/plot/${p.id}`} className="font-black text-gray-950 hover:text-green-700">
                          {p.title || p.name}
                        </Link>
                        <div className="text-[10px] text-gray-400">{p.location}</div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded bg-green-50 px-2 py-0.5 text-[10.5px] font-bold text-green-700">
                          {p.approval || 'HMDA'}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-bold text-gray-900">
                        {p.price}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                          p.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.status || 'published'}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        {p.status !== 'published' ? (
                          <button
                            onClick={() => handleApprove(p.id)}
                            className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-700"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Approve</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReject(p.id)}
                            className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-200"
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>Suspend</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Leads */}
        {activeTab === 'leads' && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xs divide-y divide-gray-100">
            {leads.map((l) => (
              <div key={l.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-black text-gray-950">{l.buyer_name}</h4>
                  <p className="text-xs text-gray-600 font-semibold mt-0.5">Plot: {l.plot_name}</p>
                  <p className="text-xs text-gray-500">{l.requirement}</p>
                  <p className="text-[11px] text-gray-400 mt-1">Contact: {l.buyer_phone} • {l.buyer_email || 'No email'}</p>
                </div>
                <span className="rounded bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Contact Inquiries */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {contactMessages.map((msg) => (
              <div key={msg.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-gray-950">{msg.name}</h4>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[10.5px] font-bold text-blue-700">
                    {msg.status}
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold text-gray-700">Subject: {msg.subject}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">{msg.message}</p>
                <div className="mt-3 flex gap-4 text-[11px] text-gray-400 border-t border-gray-100 pt-2">
                  <span>Email: <strong className="text-gray-700">{msg.email}</strong></span>
                  {msg.phone && <span>Phone: <strong className="text-gray-700">{msg.phone}</strong></span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Site Visits */}
        {activeTab === 'visits' && (
          <div className="space-y-4">
            {siteVisits.map((v) => (
              <div key={v.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-black text-gray-950">{v.plot_name}</h4>
                  <p className="text-xs text-gray-600">Visitor: {v.visitor_name} ({v.visitor_phone})</p>
                  <p className="text-xs text-gray-400">Date: {v.visit_date} at {v.visit_time}</p>
                </div>
                <span className="rounded bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
