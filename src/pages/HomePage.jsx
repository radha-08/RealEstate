import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlotCard from '../components/PlotCard';
import { Zo, FD } from '../data/initialData';
import { useData } from '../context/DataContext';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  Building2, 
  Layers, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Plane, 
  Sprout, 
  Rocket,
  Landmark,
  PhoneCall,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchLocation, setSearchLocation] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const { listings } = useData();
  const navigate = useNavigate();

  // 6 second auto-rotation matching original bundle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % Zo.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = Zo[activeSlide];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let url = '/buy-plots?';
    if (searchLocation) url += `q=${encodeURIComponent(searchLocation)}&`;
    if (filterType !== 'all') url += `type=${encodeURIComponent(filterType)}`;
    navigate(url);
  };

  const getCorridorIcon = (iconName) => {
    switch (iconName) {
      case 'plane': return <Plane className="h-4 w-4" />;
      case 'sprout': return <Sprout className="h-4 w-4" />;
      case 'rocket': return <Rocket className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  // Filter listings for the home tabs
  const filteredPlots = listings.filter((plot) => {
    if (activeTab === 'villa') return plot.kind === 'villa' || plot.name.toLowerCase().includes('villa');
    if (activeTab === 'residential') return plot.kind === 'residential' || plot.name.toLowerCase().includes('residential');
    if (activeTab === 'budget') return plot.priceNum <= 13000;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-gray-900">
      <Navbar />

      {/* Hero Carousel Section */}
      <section className="relative overflow-hidden bg-[#04160d]">
        <div className="relative h-[480px] md:h-[540px]">
          {/* Background Images with crossfade */}
          {Zo.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={slide.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#04160d]/95 via-[#04160d]/75 to-transparent" />

          {/* Slide Content */}
          <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-4 sm:px-6">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="rounded-lg bg-green-600 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
                  {currentSlide.badge}
                </span>
                <span className="rounded-lg bg-white/20 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-green-300">
                  {currentSlide.appreciation} Projected 3-Yr Growth
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl md:leading-[1.1]">
                {currentSlide.title}{' '}
                <span className="text-green-400">{currentSlide.accent}</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-3 text-lg font-medium text-gray-200">
                {currentSlide.sub}
              </p>

              {/* Price Callout */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-green-400">
                  {currentSlide.price}
                </span>
                <span className="text-sm font-semibold text-gray-300">
                  / Sq Yd onwards
                </span>
              </div>

              {/* Features Chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {currentSlide.features.map((feat, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-gray-200 backdrop-blur-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                    {feat}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/buy-plots"
                  className="rounded-xl bg-green-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-green-500 transition-all hover:scale-105"
                >
                  Explore Layout Plots
                </Link>
                <Link
                  to="/resources"
                  className="rounded-xl bg-white/15 px-5 py-3 text-sm font-bold text-white backdrop-blur-md hover:bg-white/25 transition-colors"
                >
                  Calculate EMI & ROI
                </Link>
              </div>
            </div>

            {/* Slide Navigation Dots */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2">
              {Zo.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === activeSlide ? "w-8 bg-green-400" : "w-2.5 bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Search Floating Container */}
        <div className="relative mx-auto -mt-8 max-w-[1200px] px-4 sm:px-6 z-20">
          <form
            onSubmit={handleSearchSubmit}
            className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 shadow-xl"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 items-center">
              
              {/* Location Input */}
              <div className="sm:col-span-5 relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600" />
                <input
                  type="text"
                  placeholder="Enter location (e.g. Kothur, Shadnagar, Tukkuguda)..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Plot Category */}
              <div className="sm:col-span-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-3.5 text-sm font-semibold text-gray-700 focus:border-green-600 focus:bg-white focus:outline-none"
                >
                  <option value="all">All Plot Categories</option>
                  <option value="buy">Open Plots (HMDA/DTCP)</option>
                  <option value="villa">Gated Villa Plots</option>
                  <option value="residential">Residential Plots (RERA)</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-black text-white shadow-md hover:bg-green-700 transition-colors"
                >
                  <Search className="h-4.5 w-4.5" />
                  <span>Search Plots</span>
                </button>
              </div>

            </div>
          </form>
        </div>
      </section>

      {/* Growth Corridors Bar */}
      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-green-600" />
            Top Investment Corridors in Hyderabad
          </h2>
          <Link to="/investment-zones" className="text-xs font-bold text-green-700 hover:underline">
            View All Zones →
          </Link>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {FD.map((corridor) => (
            <Link
              key={corridor.name}
              to={`/buy-plots?q=${encodeURIComponent(corridor.name)}`}
              className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-2xs hover:border-green-500 hover:bg-green-50/50 transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-100 text-green-700">
                {getCorridorIcon(corridor.icon)}
              </div>
              <div>
                <div className="text-xs font-extrabold text-gray-900 leading-none">
                  {corridor.name}
                </div>
                <div className="text-[10px] font-semibold text-gray-500 mt-0.5">
                  {corridor.tag}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Listings Section */}
      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <span className="rounded-md bg-green-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-green-800">
              Verified Open Plots
            </span>
            <h2 className="mt-2 text-2xl font-black text-gray-950 sm:text-3xl">
              Featured Plot Layouts
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Hand-picked open plots with 100% legal title verification and bank loan sanctions.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 rounded-xl bg-gray-200/70 p-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`rounded-lg px-3.5 py-2 transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-gray-950 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Plots ({listings.length})
            </button>
            <button
              onClick={() => setActiveTab('villa')}
              className={`rounded-lg px-3.5 py-2 transition-all ${
                activeTab === 'villa'
                  ? 'bg-white text-gray-950 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Villa Plots
            </button>
            <button
              onClick={() => setActiveTab('residential')}
              className={`rounded-lg px-3.5 py-2 transition-all ${
                activeTab === 'residential'
                  ? 'bg-white text-gray-950 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Residential Plots
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`rounded-lg px-3.5 py-2 transition-all ${
                activeTab === 'budget'
                  ? 'bg-white text-gray-950 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Under ₹13,000/Yd
            </button>
          </div>
        </div>

        {/* Plots Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPlots.slice(0, 8).map((plot) => (
            <PlotCard key={plot.id} plot={plot} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            to="/buy-plots"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3.5 text-sm font-black text-white shadow-md hover:bg-green-700 transition-all hover:scale-105"
          >
            <span>Browse All {listings.length} Verified Plots</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Why OnlyPlots Section */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-green-50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-green-700">
              The OnlyPlots Advantage
            </span>
            <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
              Only Plots. No Distractions.
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Unlike generic real estate portals cluttered with apartments and villas, OnlyPlots is laser-focused exclusively on open plots with transparent documentation.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-black text-gray-950">
                100% Verified Layouts
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Every listing is verified against HMDA, DTCP, or RERA approvals and LP numbers before going live.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-black text-gray-950">
                Direct Developer Pricing
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Connect directly with certified layout promoters and owners. Zero middlemen, zero hidden commissions.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-black text-gray-950">
                High Growth Corridors
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Curated layouts along the Regional Ring Road (RRR), ORR Exits, Airport Corridor, and upcoming Future City.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-black text-gray-950">
                Bank Loan Assistance
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Direct tie-ups with leading banks including SBI, HDFC, and ICICI for fast-track plot loan sanctioning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Builder / Seller Promo Banner */}
  <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-50 via-white to-green-50 p-8 md:p-12">

    <div className="relative z-10 max-w-2xl">

      <span className="rounded-lg bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-700">
        For Builders & Layout Developers
      </span>

      <h2 className="mt-3 text-3xl font-black text-gray-900 md:text-4xl">
        Sell Your Plot Layout Faster to Verified Buyers
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-gray-700">
        Showcase your HMDA or DTCP approved plotted venture to over 10,000+ active
        plot buyers. Instant PhonePe QR activation and direct WhatsApp lead delivery.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/list-plot"
          className="rounded-xl bg-green-500 px-6 py-3 text-sm font-black text-gray-950 transition-all hover:scale-105 hover:bg-green-400"
        >
          + Post Your Layout
        </Link>

        <Link
          to="/signup/builder"
          className="rounded-xl border border-green-700 px-6 py-3 text-sm font-bold text-green-800 transition-colors hover:bg-green-50"
        >
          Register as Developer
        </Link>
      </div>

    </div>
  </div>
</section>

      <Footer />
    </div>
  );
}
