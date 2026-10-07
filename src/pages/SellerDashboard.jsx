import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhonePeModal from '../components/PhonePeModal';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { PRICING_PLANS } from '../data/initialData';
import { 
  Building2, 
  Layers, 
  Users, 
  Eye, 
  Calendar, 
  PlusCircle, 
  CreditCard, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Trash2
} from 'lucide-react';

export default function SellerDashboard() {
  const { section = 'listings' } = useParams();
  const [activeTab, setActiveTab] = useState(section);
  const { listings, leads, siteVisits, updatePlotStatus } = useData();
  const { user } = useAuth();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPhonePeOpen, setIsPhonePeOpen] = useState(false);

  // Stats
  const totalViews = listings.reduce((sum, p) => sum + (p.views || 100), 0);
  const totalLeads = leads.length;
  const totalVisits = siteVisits.length;

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        
        {/* Builder Welcome Header */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-white shadow-sm">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-gray-950">
                    {user?.company_name || 'Sri Balaji Developers'}
                  </h1>
                  <span className="rounded-md bg-green-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-green-800">
                    Verified Developer
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  {user?.name} ({user?.designation || 'Managing Director'}) • {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedPlan(PRICING_PLANS.featuredListing);
                  setIsPhonePeOpen(true);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-green-600 bg-green-50 px-4 py-2.5 text-xs font-black text-green-700 hover:bg-green-100 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Upgrade with PhonePe (₹9.99)</span>
              </button>

              <Link
                to="/list-plot"
                className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-black text-white hover:bg-green-700 shadow-sm transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                <span>+ Post New Plot</span>
              </Link>
            </div>
          </div>

          {/* Metric KPIs */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
              <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                <span>Active Listings</span>
                <Layers className="h-4 w-4 text-green-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-gray-950">{listings.length}</div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
              <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                <span>Buyer Enquiries</span>
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-gray-950">{totalLeads}</div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
              <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                <span>Site Visits Booked</span>
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-gray-950">{totalVisits}</div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
              <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
                <span>Total Plot Views</span>
                <Eye className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-gray-950">{totalViews}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200 pb-3 mb-6 overflow-x-auto scrollbar-none">
          {[
            { id: 'listings', label: `My Listings (${listings.length})`, icon: Layers },
            { id: 'leads', label: `Buyer Leads CRM (${leads.length})`, icon: Users },
            { id: 'visits', label: `Site Visits (${siteVisits.length})`, icon: Calendar },
            { id: 'billing', label: 'Promotion Plans & PhonePe', icon: CreditCard }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: My Listings */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-[11px] font-black uppercase text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Plot Venture</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Rate & Area</th>
                      <th className="px-6 py-4">Approval</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Views / Leads</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {listings.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image || p.image_url}
                              alt=""
                              className="h-10 w-12 rounded-lg object-cover"
                            />
                            <div>
                              <Link to={`/plot/${p.id}`} className="font-black text-gray-950 hover:text-green-700">
                                {p.title || p.name}
                              </Link>
                              <div className="text-[10px] text-gray-400">{p.facing || 'East Facing'}</div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {p.location}
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{p.price} / Yd</div>
                          <div className="text-[10px] text-gray-500">{p.area || `${p.plot_area} Sq Yd`}</div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded bg-green-50 px-2 py-0.5 text-[10.5px] font-bold text-green-700">
                            {p.approval || 'HMDA'}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                            p.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {p.status || 'Published'}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          <div className="font-bold">{p.views || 140} Views</div>
                          <div className="text-[10px] text-purple-700 font-semibold">{p.leads || 8} Leads</div>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <Link
                            to={`/plot/${p.id}`}
                            className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-800 hover:bg-green-50 hover:text-green-700"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leads CRM */}
        {activeTab === 'leads' && (
          <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-xs">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-gray-950">Buyer Enquiries & Price Quotes</h3>
                <p className="text-xs text-gray-500">Instant leads received directly from the OnlyPlots portal.</p>
              </div>
              <span className="rounded-lg bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
                {leads.length} Verified Leads
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <div key={lead.id} className="p-6 hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-gray-950">{lead.buyer_name}</h4>
                      <span className="rounded bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800">
                        {lead.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600 font-semibold">
                      Interested in: <strong className="text-gray-900">{lead.plot_name}</strong>
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">{lead.requirement}</p>
                    <div className="mt-2 flex gap-4 text-[11px] text-gray-400">
                      <span>Phone: <strong className="text-gray-700">{lead.buyer_phone}</strong></span>
                      {lead.buyer_email && <span>Email: {lead.buyer_email}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${lead.buyer_phone}`}
                      className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100"
                    >
                      <Phone className="h-3.5 w-3.5 text-green-600" />
                      <span>Call Buyer</span>
                    </a>
                    <a
                      href={`https://wa.me/${lead.buyer_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.buyer_name}, this is Sri Balaji Developers regarding your enquiry for ${lead.plot_name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Site Visits */}
        {activeTab === 'visits' && (
          <div className="space-y-4">
            {siteVisits.map((v) => (
              <div key={v.id} className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-[10.5px] font-bold text-blue-700">
                    Visit Requested: {v.visit_date} at {v.visit_time}
                  </span>
                  <h4 className="mt-2 text-base font-black text-gray-950">{v.plot_name}</h4>
                  <p className="text-xs text-gray-500">Visitor: <strong className="text-gray-800">{v.visitor_name}</strong> ({v.visitor_phone})</p>
                  <p className="text-xs text-gray-400 mt-0.5">Mode: {v.transport} • {v.people_count} Visitors</p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${v.visitor_phone}`}
                    className="flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white hover:bg-green-700"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Coordinate Site Visit</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Billing & Plans */}
        {activeTab === 'billing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(PRICING_PLANS).map((plan) => (
              <div
                key={plan.id}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="rounded-md bg-green-100 px-2.5 py-0.5 text-[10.5px] font-black uppercase text-green-800">
                    {plan.badge}
                  </span>
                  <h3 className="mt-3 text-xl font-black text-gray-950">{plan.name}</h3>
                  <div className="mt-2 text-3xl font-black text-gray-900">
                    {plan.priceLabel}
                  </div>
                  <ul className="mt-6 space-y-2.5 text-xs text-gray-600">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setIsPhonePeOpen(true);
                  }}
                  className="mt-8 w-full rounded-xl bg-green-600 py-3 text-xs font-black text-white hover:bg-green-700 shadow-sm"
                >
                  Activate via PhonePe QR
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* PhonePe Modal */}
      <PhonePeModal
        isOpen={isPhonePeOpen}
        onClose={() => setIsPhonePeOpen(false)}
        plan={selectedPlan || PRICING_PLANS.featuredListing}
      />

      <Footer />
    </div>
  );
}
