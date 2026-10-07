import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhonePeModal from '../components/PhonePeModal';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { PRICING_PLANS } from '../data/initialData';
import { De } from '../data/images';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Upload, 
  Sparkles, 
  CreditCard,
  ArrowRight
} from 'lucide-react';

export default function ListPlotPage() {
  const { addPlot } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'buy', // buy | villa | residential
    location: '',
    city: 'Hyderabad',
    state: 'Telangana',
    landmark: '',
    plot_area: 200,
    area_unit: 'Sq Yd',
    priceNum: 14500,
    facing: 'East Facing',
    road_width: '60 Ft Road',
    approval: 'HMDA Approved',
    lp_number: 'LP No. 00012/LO/HMDA/2025',
    description: '',
    contact_name: user?.name || 'Verified Promoter',
    contact_phone: user?.phone || '+91 98765 43210'
  });

  const [selectedPlan, setSelectedPlan] = useState('featured');
  const [isPhonePeOpen, setIsPhonePeOpen] = useState(false);
  const [createdPlot, setCreatedPlot] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlot = {
      id: `plot-${Date.now()}`,
      title: formData.title,
      name: formData.title,
      location: `${formData.location}, ${formData.city}`,
      city: formData.city,
      area_locality: formData.location,
      price: `₹${Number(formData.priceNum).toLocaleString('en-IN')}`,
      priceNum: Number(formData.priceNum),
      area: `${formData.plot_area} ${formData.area_unit}`,
      plot_area: Number(formData.plot_area),
      area_unit: formData.area_unit,
      road: formData.road_width,
      road_width: formData.road_width,
      approval: formData.approval,
      approvals: formData.approval,
      facing: formData.facing,
      badge: selectedPlan === 'featured' ? 'FEATURED' : 'NEW',
      tag2: formData.landmark || 'Clear Title',
      image: formData.category === 'villa' ? De.villa : formData.category === 'residential' ? De.meadows : De.road,
      image_url: formData.category === 'villa' ? De.villa : formData.category === 'residential' ? De.meadows : De.road,
      kind: formData.category,
      lat: 17.15 + (Math.random() - 0.5) * 0.1,
      lng: 78.35 + (Math.random() - 0.5) * 0.1,
      description: formData.description || `${formData.title} is an approved plotted venture with excellent road connectivity and immediate registration status.`,
      status: selectedPlan === 'basic' ? 'published' : 'pending_payment',
      plan: selectedPlan
    };

    const saved = addPlot(newPlot);
    setCreatedPlot(saved);

    if (selectedPlan === 'featured') {
      setIsPhonePeOpen(true);
    } else {
      navigate('/seller');
    }
  };

  const inputClass = "w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs font-medium focus:border-green-600 focus:outline-none";

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-green-800">
            List Your Property
          </span>
          <h1 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
            Post Your Open Plot Layout
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500">
            Reach thousands of serious plot buyers in India with verified credentials and direct lead delivery.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Step 1: Basic Information */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-base font-black text-gray-950 mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">1</span>
              Basic Layout Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Layout / Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fortune Pride Greens Phase 2"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={inputClass}
                  >
                    <option value="buy">Open Plots (HMDA/DTCP)</option>
                    <option value="villa">Gated Villa Plots</option>
                    <option value="residential">Residential Plots</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Locality / Area *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kothur / Shadnagar"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nearby Landmark / Corridor</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Mins from ORR Exit 14, Near Symbiosis University"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Step 2: Dimensions & Pricing */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-base font-black text-gray-950 mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">2</span>
              Pricing & Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Price (₹ / Sq Yd) *</label>
                <input
                  type="number"
                  required
                  value={formData.priceNum}
                  onChange={(e) => setFormData({ ...formData, priceNum: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Plot Area (Sq Yds) *</label>
                <input
                  type="number"
                  required
                  value={formData.plot_area}
                  onChange={(e) => setFormData({ ...formData, plot_area: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Facing *</label>
                <select
                  value={formData.facing}
                  onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                  className={inputClass}
                >
                  <option value="East Facing">East Facing</option>
                  <option value="North Facing">North Facing</option>
                  <option value="West Facing">West Facing</option>
                  <option value="South Facing">South Facing</option>
                  <option value="Corner Plot">Corner Plot</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Road Width *</label>
                <select
                  value={formData.road_width}
                  onChange={(e) => setFormData({ ...formData, road_width: e.target.value })}
                  className={inputClass}
                >
                  <option value="40 Ft Road">40 Ft Road</option>
                  <option value="60 Ft Road">60 Ft Road</option>
                  <option value="80 Ft Road">80 Ft Road</option>
                  <option value="100 Ft Road">100 Ft Road</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Statutory Approval *</label>
                <select
                  value={formData.approval}
                  onChange={(e) => setFormData({ ...formData, approval: e.target.value })}
                  className={inputClass}
                >
                  <option value="HMDA Approved">HMDA Approved</option>
                  <option value="DTCP Approved">DTCP Approved</option>
                  <option value="RERA Approved">RERA Registered</option>
                  <option value="Gram Panchayat">Gram Panchayat Layout</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">LP / Sanction Number</label>
                <input
                  type="text"
                  placeholder="e.g. LP No. 00045/LO/HMDA/2025"
                  value={formData.lp_number}
                  onChange={(e) => setFormData({ ...formData, lp_number: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold text-gray-700 mb-1">Description / Project Highlights</label>
              <textarea
                rows={3}
                placeholder="Mention key highlights: underground electricity, 100 ft roads, park facing, nearby SEZ, distance from highway..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Step 3: Listing Promotion Plans */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-base font-black text-gray-950 mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">3</span>
              Select Promotion & Verification Plan
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Choose visibility level for your plot venture on OnlyPlots.online.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Basic Free */}
              <div
                onClick={() => setSelectedPlan('basic')}
                className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                  selectedPlan === 'basic'
                    ? 'border-green-600 bg-green-50/40 ring-2 ring-green-600/30'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-700">Basic</span>
                  <span className="text-xs font-extrabold text-gray-900">Free</span>
                </div>
                <div className="mt-3 text-xl font-black text-gray-950">₹0</div>
                <ul className="mt-4 space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-1.5">✓ Standard Listing</li>
                  <li className="flex items-center gap-1.5">✓ Active for 60 Days</li>
                  <li className="flex items-center gap-1.5">✓ Basic Leads Form</li>
                </ul>
              </div>

              {/* Featured ₹9.99 (PhonePe QR) */}
              <div
                onClick={() => setSelectedPlan('featured')}
                className={`cursor-pointer rounded-2xl border p-5 relative transition-all ${
                  selectedPlan === 'featured'
                    ? 'border-green-600 bg-green-50/60 ring-2 ring-green-600'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="absolute -top-3 right-4 rounded-full bg-green-600 px-2.5 py-0.5 text-[10px] font-black text-white uppercase tracking-wider">
                  Special Offer
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-green-800">Featured Placement</span>
                  <Sparkles className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-3 text-2xl font-black text-green-700">₹9.99</div>
                <p className="text-[10px] text-gray-500 font-semibold">Pay via PhonePe QR</p>
                <ul className="mt-4 space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-1.5 font-bold">✓ 3x More Buyer Enquiries</li>
                  <li className="flex items-center gap-1.5">✓ Top Category Placement</li>
                  <li className="flex items-center gap-1.5">✓ WhatsApp Instant Forwarding</li>
                  <li className="flex items-center gap-1.5">✓ Instant PhonePe Verification</li>
                </ul>
              </div>

              {/* Builder Pro */}
              <div
                onClick={() => setSelectedPlan('premium')}
                className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                  selectedPlan === 'premium'
                    ? 'border-green-600 bg-green-50/40 ring-2 ring-green-600/30'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-700">Builder Pro</span>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Pro</span>
                </div>
                <div className="mt-3 text-2xl font-black text-gray-950">₹499 <span className="text-xs font-normal text-gray-500">/ mo</span></div>
                <ul className="mt-4 space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-1.5">✓ Up to 10 Layouts</li>
                  <li className="flex items-center gap-1.5">✓ Carousel Slot Eligibility</li>
                  <li className="flex items-center gap-1.5">✓ Dedicated CRM Dashboard</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Submit Action */}
          <div className="text-center pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-10 py-4 text-sm font-black text-white shadow-lg hover:bg-green-700 hover:scale-105 transition-all"
            >
              <span>Publish Layout Plot</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2 text-xs text-gray-400">
              By listing your plot, you confirm that you have valid authorization to market this property.
            </p>
          </div>

        </form>
      </div>

      {/* PhonePe QR Modal */}
      <PhonePeModal
        isOpen={isPhonePeOpen}
        onClose={() => {
          setIsPhonePeOpen(false);
          navigate('/seller');
        }}
        plan={PRICING_PLANS.featuredListing}
        onPaymentSuccess={() => {
          navigate('/payment/success');
        }}
      />

      <Footer />
    </div>
  );
}
