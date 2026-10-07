import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeafletMap from '../components/LeafletMap';
import EmiCalculator from '../components/EmiCalculator';
import ScheduleVisitModal from '../components/ScheduleVisitModal';
import PlotCard from '../components/PlotCard';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { GALLERY_IMAGES } from '../data/images';
import { 
  MapPin, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Car, 
  Sparkles,
  Download,
  Building,
  ArrowRight
} from 'lucide-react';

export default function PlotDetailPage() {
  const { id } = useParams();
  const { listings, isShortlisted, toggleShortlist, addLead } = useData();
  const { user } = useAuth();

  const plot = listings.find((p) => p.id === id) || listings[0];
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    message: 'Please send current best offer and layout plan.'
  });

  const photos = plot.photos && plot.photos.length > 0 ? plot.photos : GALLERY_IMAGES;
  const saved = isShortlisted(plot.id);

  const priceNum = plot.priceNum || 15000;
  const areaNum = plot.plot_area || 200;
  const totalCost = priceNum * areaNum;

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    addLead({
      buyer_name: quoteForm.name,
      buyer_phone: quoteForm.phone,
      plot_id: plot.id,
      plot_name: plot.title || plot.name,
      requirement: `Best Price Quote: ${quoteForm.message}`
    });
    setQuoteSent(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to enquire about ${plot.title || plot.name} (${plot.location}) priced at ${plot.price} on OnlyPlots.online.`
  );

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-gray-900">
      <Navbar />

      {/* Breadcrumb Bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 py-3 text-xs text-gray-500 sm:px-6">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <span>/</span>
          <Link to="/buy-plots" className="hover:text-green-700">Plots</Link>
          <span>/</span>
          <span className="font-semibold text-gray-900 truncate">{plot.title || plot.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        
        {/* Header Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-green-100 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-green-800">
                {plot.approval || "HMDA Approved"}
              </span>
              {plot.badge && (
                <span className="rounded-md bg-gray-900 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-white">
                  {plot.badge}
                </span>
              )}
            </div>
            <h1 className="mt-2 text-2xl font-black text-gray-950 sm:text-4xl">
              {plot.title || plot.name}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-gray-500">
              <MapPin className="h-4 w-4 text-green-600 shrink-0" />
              <span>{plot.location}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleShortlist(plot.id)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-colors ${
                saved
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Heart className={`h-4 w-4 ${saved ? "fill-red-600" : ""}`} />
              <span>{saved ? "Shortlisted" : "Save Plot"}</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: plot.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Media & Sidebar Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Main Photo Gallery */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-gray-900 shadow-md">
              <img
                src={photos[selectedPhoto] || plot.image}
                alt={plot.title || plot.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                Photo {selectedPhoto + 1} of {photos.length}
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {photos.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPhoto(i)}
                  className={`relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    selectedPhoto === i
                      ? "border-green-600 ring-2 ring-green-600/30"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt={`Thumbnail ${i}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Navigation Tabs */}
            <div className="mt-8 border-b border-gray-200">
              <div className="flex gap-6 text-sm font-bold">
                {['Overview', 'Specifications', 'Amenities', 'Location & Map', 'Loan Calculator'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 transition-colors ${
                      activeTab === tab
                        ? "border-b-2 border-green-600 text-green-700"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'Overview' && (
              <div className="space-y-6 pt-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="text-base font-black text-gray-950">Layout Description</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {plot.description}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-gray-500">
                    This property has been vetted through the OnlyPlots verification workflow. Layout boundaries, survey numbers, and HMDA/DTCP/RERA approvals have been verified with statutory master plans.
                  </p>
                </div>

                {/* Key Specs Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="text-base font-black text-gray-950 mb-4">Key Specifications</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <span className="text-gray-400 block font-semibold uppercase">Plot Area</span>
                      <span className="font-extrabold text-base text-gray-900">{plot.area || `${areaNum} Sq Yd`}</span>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <span className="text-gray-400 block font-semibold uppercase">Facing Direction</span>
                      <span className="font-extrabold text-base text-gray-900">{plot.facing || "East Facing"}</span>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <span className="text-gray-400 block font-semibold uppercase">Front Road Width</span>
                      <span className="font-extrabold text-base text-gray-900">{plot.road || "60 Ft Road"}</span>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <span className="text-gray-400 block font-semibold uppercase">Approval Authority</span>
                      <span className="font-extrabold text-base text-green-700">{plot.approval || "HMDA"}</span>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <span className="text-gray-400 block font-semibold uppercase">Possession</span>
                      <span className="font-extrabold text-base text-gray-900">Immediate</span>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <span className="text-gray-400 block font-semibold uppercase">Bank Loans</span>
                      <span className="font-extrabold text-base text-gray-900">SBI & HDFC Available</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Specifications */}
            {activeTab === 'Specifications' && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 pt-4 space-y-4">
                <h3 className="text-base font-black text-gray-950">Technical Specifications</h3>
                <div className="divide-y divide-gray-100 text-sm">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-500">Project Type</span>
                    <span className="font-bold text-gray-900">Plotted Gated Layout</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-500">Total Extent</span>
                    <span className="font-bold text-gray-900">25 Acres Phase 1</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-500">Electricity</span>
                    <span className="font-bold text-gray-900">Underground Cabling with Transformers</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-500">Drainage</span>
                    <span className="font-bold text-gray-900">Underground Sewerage System</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-500">Water Supply</span>
                    <span className="font-bold text-gray-900">Overhead Tank & Individual Pipeline</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-500">Compound Wall</span>
                    <span className="font-bold text-gray-900">Solar Fenced Perimeter</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Amenities */}
            {activeTab === 'Amenities' && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 pt-4">
                <h3 className="text-base font-black text-gray-950 mb-4">Layout Amenities & Infrastructure</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    "Grand Entrance Arch with Security Gate",
                    "60 Ft & 40 Ft Black Top BT Roads",
                    "Underground Drainage & STP",
                    "Lush Landscaped Parks with Gazebos",
                    "Avenue Plantation & Curated Flora",
                    "24x7 CCTV Surveillance System",
                    "Children's Play Park & Sand Pit",
                    "Walking & Jogging Track",
                    "Rain Water Harvesting Pits"
                  ].map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 border border-gray-100">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                      <span className="font-semibold text-gray-800">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Location & Map */}
            {activeTab === 'Location & Map' && (
              <div className="space-y-4 pt-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="text-base font-black text-gray-950 mb-2">Location & Neighborhood</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Exact coordinates rendered on OpenStreetMap. Proximity to major transport corridors.
                  </p>
                  <LeafletMap
                    center={[plot.lat || 17.0782, plot.lng || 78.2245]}
                    zoom={13}
                    markers={[
                      {
                        lat: plot.lat || 17.0782,
                        lng: plot.lng || 78.2245,
                        title: plot.title || plot.name,
                        subtitle: plot.location,
                        price: plot.price
                      }
                    ]}
                  />
                </div>
              </div>
            )}

            {/* Tab 5: Loan Calculator */}
            {activeTab === 'Loan Calculator' && (
              <div className="pt-4">
                <EmiCalculator initialPrice={totalCost} />
              </div>
            )}

          </div>

          {/* Right Action Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Price Box */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Direct Developer Rate
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-black text-green-700">
                  {plot.price}
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  / Sq Yd
                </span>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Estimated Total: <strong className="text-gray-900 font-bold">₹{totalCost.toLocaleString('en-IN')}</strong> (for {areaNum} Sq Yds)
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-black text-white shadow-md hover:bg-green-700 transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Free Site Visit</span>
                </button>

                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-500 bg-emerald-50 py-3 text-sm font-black text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600" />
                  <span>WhatsApp Developer</span>
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  Verified Title
                </span>
                <span>Zero Brokerage</span>
              </div>
            </div>

            {/* Quick Enquiry / Best Price Form */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black text-gray-950">
                Request Best Price Sheet
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Receive the developer's latest discounted price sheet and available plot inventory.
              </p>

              {quoteSent ? (
                <div className="mt-4 rounded-xl bg-green-50 p-4 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-green-600" />
                  <p className="mt-2 text-xs font-bold text-green-900">Request Sent!</p>
                  <p className="mt-1 text-[11px] text-green-700">The developer team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-green-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700">WhatsApp Mobile *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-green-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gray-900 py-2.5 text-xs font-black text-white hover:bg-green-700 transition-colors"
                  >
                    Send Enquiry Now
                  </button>
                </form>
              )}
            </div>

            {/* Verified Developer Badge */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 shrink-0">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-black text-gray-900">Sri Balaji Developers</h4>
                  <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                </div>
                <p className="text-[11px] text-gray-500">Certified Layout Promoter</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Member of OnlyPlots Builder Network</p>
              </div>
            </div>

          </div>

        </div>

        {/* Similar Plots Section */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-gray-950">
                Similar Plots You May Like
              </h3>
              <p className="text-xs text-gray-500">
                Other verified layouts in the same growth corridor
              </p>
            </div>
            <Link to="/buy-plots" className="text-xs font-bold text-green-700 hover:underline">
              Browse All →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {listings.filter(p => p.id !== plot.id).slice(0, 4).map((p) => (
              <PlotCard key={p.id} plot={p} />
            ))}
          </div>
        </div>

      </div>

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        plot={plot}
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
