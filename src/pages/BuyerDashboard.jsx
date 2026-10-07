import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { De } from '../data/images';
import { 
  Heart, 
  Bell, 
  MapPin, 
  Search, 
  ChevronDown, 
  Bookmark, 
  Calendar, 
  MessageSquare, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  LayoutDashboard, 
  User, 
  Building2, 
  CreditCard, 
  FileText, 
  Mail, 
  Star, 
  Users, 
  Tag, 
  LogOut,
  X,
  Check,
  RotateCcw
} from 'lucide-react';

export default function BuyerDashboard() {
  const { user, logout } = useAuth();
  const { listings, shortlists, toggleShortlist } = useData();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [showQRModal, setShowQRModal] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState(false);

  // Search & Filter State
  const [searchLocality, setSearchLocality] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedBudget, setSelectedBudget] = useState('Min - Max');
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [budgetDropdownOpen, setBudgetDropdownOpen] = useState(false);

  const typeDropdownRef = useRef(null);
  const budgetDropdownRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
        setTypeDropdownOpen(false);
      }
      if (budgetDropdownRef.current && !budgetDropdownRef.current.contains(event.target)) {
        setBudgetDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const savedPlots = listings.filter((p) => shortlists.includes(p.id));

  const getInitials = (name) => {
    const raw = name || user?.email?.split('@')[0] || '';
    if (!raw) return 'VR';
    const parts = raw.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return raw.slice(0, 2).toUpperCase();
  };

  // 13 Navigation items + 1 Logout matching exact screenshot
  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'My Profile', icon: User },
    { label: 'Properties', icon: Building2 },
    { label: 'Saved Properties', icon: Heart },
    { label: 'My Enquiries', icon: MessageSquare },
    { label: 'Site Visits', icon: Calendar },
    { label: 'Payments', icon: CreditCard },
    { label: 'Documents', icon: FileText },
    { label: 'Alerts', icon: Bell },
    { label: 'Messages', icon: Mail },
    { label: 'Favorites', icon: Star },
    { label: 'Referrals', icon: Users },
    { label: 'Offers', icon: Tag },
  ];

  // 3 Exact plots from the screenshot (media_1791212927005.png)
  const baseRecommendedPlots = [
    {
      id: 'rec-1',
      plotId: 'pavani-royale',
      title: 'Premium HMDA Open Plot',
      location: 'Kothur, Hyderabad',
      city: 'Hyderabad',
      area_locality: 'Kothur',
      area: '200 Sq Yd',
      plot_area: 200,
      facing: 'East Facing',
      road: '100 Ft Road',
      price: '₹15,000',
      priceNum: 15000,
      badge: 'NEW',
      badgeBg: 'bg-[#0B5C2E]',
      approval: 'HMDA Approved',
      typeLabel: 'Open Plot',
      kind: 'open',
      tagGreen: 'HMDA Approved',
      tagBlue: 'Gated Community',
      image: De.road,
    },
    {
      id: 'rec-2',
      plotId: 'sapphire-county',
      title: 'Villa Plot in Gated Community',
      location: 'Shadnagar, Hyderabad',
      city: 'Hyderabad',
      area_locality: 'Shadnagar',
      area: '300 Sq Yd',
      plot_area: 300,
      facing: 'North Facing',
      road: '60 Ft Road',
      price: '₹12,999',
      priceNum: 12999,
      badge: 'FEATURED',
      badgeBg: 'bg-[#7C3AED]',
      approval: 'DTCP Approved',
      typeLabel: 'Villa Plot',
      kind: 'villa',
      tagGreen: 'DTCP Approved',
      tagBlue: 'Park & Landscaping',
      image: De.grid,
    },
    {
      id: 'rec-3',
      plotId: 'fortune-smart-city',
      title: 'Residential Plot',
      location: 'Maheshwaram, Hyderabad',
      city: 'Hyderabad',
      area_locality: 'Maheshwaram',
      area: '167 Sq Yd',
      plot_area: 167,
      facing: 'West Facing',
      road: '40 Ft Road',
      price: '₹11,500',
      priceNum: 11500,
      badge: 'POPULAR',
      badgeBg: 'bg-[#2563EB]',
      approval: 'RERA Approved',
      typeLabel: 'Residential Plot',
      kind: 'residential',
      tagGreen: 'RERA Approved',
      tagBlue: 'Club House',
      image: De.entrance,
    }
  ];

  // Dynamic filter logic
  const hasActiveFilters = searchLocality.trim() !== '' || selectedType !== 'All Types' || selectedBudget !== 'Min - Max';

  const displayedPlots = useMemo(() => {
    let result = [...baseRecommendedPlots];

    if (searchLocality.trim()) {
      const q = searchLocality.toLowerCase().trim();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.area_locality.toLowerCase().includes(q)
      );
    }

    if (selectedType !== 'All Types') {
      if (selectedType === 'Villa Plots') {
        result = result.filter(p => p.kind === 'villa' || p.typeLabel.toLowerCase().includes('villa'));
      } else if (selectedType === 'Residential Plots') {
        result = result.filter(p => p.kind === 'residential' || p.typeLabel.toLowerCase().includes('residential'));
      } else if (selectedType === 'Open Plots') {
        result = result.filter(p => p.kind === 'open' || p.typeLabel.toLowerCase().includes('open'));
      }
    }

    if (selectedBudget !== 'Min - Max') {
      if (selectedBudget === 'Under ₹12,000 / Sq Yd') {
        result = result.filter(p => p.priceNum <= 12000);
      } else if (selectedBudget === '₹12,000 – ₹15,000 / Sq Yd') {
        result = result.filter(p => p.priceNum >= 12000 && p.priceNum <= 15000);
      } else if (selectedBudget === 'Above ₹15,000 / Sq Yd') {
        result = result.filter(p => p.priceNum > 15000);
      }
    }

    if (!hasActiveFilters || result.length === 0) {
      return baseRecommendedPlots;
    }

    return result;
  }, [baseRecommendedPlots, searchLocality, selectedType, selectedBudget, hasActiveFilters]);

  const handleResetFilters = () => {
    setSearchLocality('');
    setSelectedType('All Types');
    setSelectedBudget('Min - Max');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocality.trim()) params.set('q', searchLocality.trim());
    navigate(`/buy-plots?${params.toString()}`);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentSuccessMsg(true);
    setTimeout(() => {
      setShowQRModal(false);
      setPaymentSuccessMsg(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-black">
      {/* Top Header matching exact screenshot media_1791212927005.png */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/90 bg-white">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-xl font-black text-black">Only</span>
            <span className="text-xl font-black text-[#0B5C2E]">Plots</span>
            <span className="ml-0.5 rounded bg-[#0B5C2E] px-1.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              .online
            </span>
          </Link>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Shortlist button with counter */}
            <Link
              to="/dashboard"
              onClick={() => setActiveMenu('Saved Properties')}
              className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-black hover:bg-gray-50 transition-colors shadow-2xs"
            >
              <Heart className="h-3.5 w-3.5 text-black" />
              <span>Shortlist</span>
              <span className="flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#0B5C2E] px-1 text-[10.5px] font-bold text-white">
                {savedPlots.length}
              </span>
            </Link>

            {/* Notification Bell */}
            <button
              onClick={() => setActiveMenu('Alerts')}
              className="relative flex h-8 w-8 items-center justify-center rounded-full text-black hover:bg-gray-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="h-4.5 w-4.5 text-black" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

            {/* User Pill: Dynamic Avatar circle + Vikrant Rathod / Buyer */}
            <div className="flex items-center gap-2 pl-1">
              <div 
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-2xs"
                style={{ backgroundColor: '#E02424', color: '#ffffff' }}
              >
                {getInitials(user?.name)}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <div className="text-xs font-bold text-black">
                  {user?.name || 'Vikrant Rathod'}
                </div>
                <div className="text-[10.5px] text-gray-500 capitalize">
                  {user?.role || 'Buyer'}
                </div>
              </div>
            </div>

            {/* Logout Link */}
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="text-xs font-medium text-gray-600 hover:text-black transition-colors ml-1 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout: Fixed 2-column flex layout so the sidenavbar is ALWAYS on the left side */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-6">
        <div className="flex flex-row gap-6 items-start">
          
          {/* Left Sidenavbar: fixed width on left side matching screenshot */}
          <aside 
            className="w-[215px] shrink-0 space-y-3"
            style={{ width: '215px', minWidth: '215px', flexShrink: 0 }}
          >
            {/* User Profile Card */}
            <div className="rounded-2xl border border-gray-200/90 bg-white p-3.5 shadow-2xs flex items-center gap-3">
              <div 
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-2xs"
                style={{ backgroundColor: '#E02424', color: '#ffffff' }}
              >
                {getInitials(user?.name)}
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="text-xs font-bold text-black truncate">
                  {user?.name || 'Vikrant Rathod'}
                </div>
                <div className="text-[10.5px] text-gray-500 truncate mt-0.5">
                  {user?.email || 'vikrantrathodofficial@gmail.com'}
                </div>
              </div>
            </div>

            {/* Menu items matching exact image */}
            <nav className="rounded-2xl border border-gray-200/90 bg-white p-2 shadow-2xs space-y-0.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.label;
                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveMenu(item.label)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'text-white shadow-xs'
                        : 'text-black hover:bg-gray-100'
                    }`}
                    style={isActive ? { backgroundColor: '#0B5C2E', color: '#ffffff' } : { color: '#000000' }}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-black'}`} />
                    <span className={isActive ? 'text-white font-bold' : 'text-black font-semibold'}>{item.label}</span>
                  </button>
                );
              })}

              {/* Logout button at bottom of sidebar */}
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-left text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4 shrink-0 text-red-600" />
                <span className="text-red-600 font-semibold">Logout</span>
              </button>
            </nav>
          </aside>

          {/* Right Main Content area */}
          <main className="flex-1 min-w-0 space-y-4">
            
            {/* Header Row: Welcome Title + Search Bar */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black">
                  Welcome back, {user?.name?.split(' ')[0] || 'Vikrant'}!
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  Let's find the perfect plot for your dream investment or future home.
                </p>
              </div>

              {/* Search Bar matching screenshot */}
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-2xs"
              >
                {/* Locality Input */}
                <div className="flex items-center gap-1.5 pl-2 relative">
                  <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter Locality, City or Zone"
                    value={searchLocality}
                    onChange={(e) => setSearchLocality(e.target.value)}
                    className="w-36 sm:w-48 text-xs text-black placeholder:text-gray-400 focus:outline-none bg-transparent"
                  />
                  {searchLocality && (
                    <button
                      type="button"
                      onClick={() => setSearchLocality('')}
                      className="text-gray-400 hover:text-black p-0.5 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                <div className="h-5 w-[1px] bg-gray-200" />

                {/* Interactive All Types Dropdown */}
                <div className="relative" ref={typeDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setTypeDropdownOpen(!typeDropdownOpen);
                      setBudgetDropdownOpen(false);
                    }}
                    className="flex items-center gap-1 px-1.5 py-1 text-xs text-black font-semibold hover:bg-gray-50 rounded transition-colors cursor-pointer"
                  >
                    <span>{selectedType}</span>
                    <ChevronDown className="h-3 w-3 text-black" />
                  </button>

                  {typeDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-44 rounded-xl border border-gray-100 bg-white p-1 shadow-xl z-50 animate-in fade-in zoom-in-95">
                      {['All Types', 'Open Plots', 'Villa Plots', 'Residential Plots'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setSelectedType(type);
                            setTypeDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-xs text-left font-medium transition-colors cursor-pointer ${
                            selectedType === type
                              ? 'bg-[#E8F8EE] text-[#0B5C2E] font-bold'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>{type}</span>
                          {selectedType === type && <Check className="h-3 w-3 text-[#0B5C2E]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="h-5 w-[1px] bg-gray-200" />

                {/* Interactive Min - Max Dropdown */}
                <div className="relative" ref={budgetDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setBudgetDropdownOpen(!budgetDropdownOpen);
                      setTypeDropdownOpen(false);
                    }}
                    className="flex items-center gap-1 px-1.5 py-1 text-xs text-black font-semibold hover:bg-gray-50 rounded transition-colors cursor-pointer"
                  >
                    <span>{selectedBudget}</span>
                    <ChevronDown className="h-3 w-3 text-black" />
                  </button>

                  {budgetDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-100 bg-white p-1 shadow-xl z-50 animate-in fade-in zoom-in-95">
                      {[
                        'Min - Max',
                        'Under ₹12,000 / Sq Yd',
                        '₹12,000 – ₹15,000 / Sq Yd',
                        'Above ₹15,000 / Sq Yd'
                      ].map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => {
                            setSelectedBudget(budget);
                            setBudgetDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-xs text-left font-medium transition-colors cursor-pointer ${
                            selectedBudget === budget
                              ? 'bg-[#E8F8EE] text-[#0B5C2E] font-bold'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>{budget}</span>
                          {selectedBudget === budget && <Check className="h-3 w-3 text-[#0B5C2E]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Plots Button */}
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-[#0B5C2E] px-4 py-2 text-xs font-semibold text-white hover:bg-[#084824] transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Search Plots</span>
                </button>
              </form>
            </div>

            {/* 6 Metric KPI Cards in a single horizontal row matching screenshot media_1791212927005.png */}
            <div 
              className="grid grid-cols-6 gap-2.5"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: '10px' }}
            >
              {/* 1. Saved Searches */}
              <div className="rounded-2xl border border-gray-200/90 bg-white p-3 shadow-2xs flex items-center gap-2.5">
                <div 
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: '#ECFDF5', color: '#059669' }}
                >
                  <Bookmark className="h-4 w-4" />
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-[10.5px] font-medium text-gray-600 truncate">Saved Searches</div>
                  <div className="text-lg font-bold text-black mt-0.5">2</div>
                  <div className="text-[9.5px] text-gray-400 truncate">Active searches</div>
                </div>
              </div>

              {/* 2. Shortlisted Plots */}
              <div className="rounded-2xl border border-gray-200/90 bg-white p-3 shadow-2xs flex items-center gap-2.5">
                <div 
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}
                >
                  <Heart className="h-4 w-4" />
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-[10.5px] font-medium text-gray-600 truncate">Shortlisted Plots</div>
                  <div className="text-lg font-bold text-black mt-0.5">{savedPlots.length}</div>
                  <div className="text-[9.5px] text-gray-400 truncate">Plots saved</div>
                </div>
              </div>

              {/* 3. Site Visits */}
              <div className="rounded-2xl border border-gray-200/90 bg-white p-3 shadow-2xs flex items-center gap-2.5">
                <div 
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: '#FFFBEB', color: '#D97706' }}
                >
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-[10.5px] font-medium text-gray-600 truncate">Site Visits</div>
                  <div className="text-lg font-bold text-black mt-0.5">6</div>
                  <div className="text-[9.5px] text-gray-400 truncate">Visits scheduled</div>
                </div>
              </div>

              {/* 4. Enquiries Sent */}
              <div className="rounded-2xl border border-gray-200/90 bg-white p-3 shadow-2xs flex items-center gap-2.5">
                <div 
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: '#FAF5FF', color: '#9333EA' }}
                >
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-[10.5px] font-medium text-gray-600 truncate">Enquiries Sent</div>
                  <div className="text-lg font-bold text-black mt-0.5">13</div>
                  <div className="text-[9.5px] text-gray-400 truncate">Total enquiries</div>
                </div>
              </div>

              {/* 5. Price Alerts */}
              <div className="rounded-2xl border border-gray-200/90 bg-white p-3 shadow-2xs flex items-center gap-2.5">
                <div 
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: '#ECFDF5', color: '#059669' }}
                >
                  <Bell className="h-4 w-4" />
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-[10.5px] font-medium text-gray-600 truncate">Price Alerts</div>
                  <div className="text-lg font-bold text-black mt-0.5">0</div>
                  <div className="text-[9.5px] text-gray-400 truncate">Active alerts</div>
                </div>
              </div>

              {/* 6. Recent Views */}
              <div className="rounded-2xl border border-gray-200/90 bg-white p-3 shadow-2xs flex items-center gap-2.5">
                <div 
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: '#FFF7ED', color: '#EA580C' }}
                >
                  <Eye className="h-4 w-4" />
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-[10.5px] font-medium text-gray-600 truncate">Recent Views</div>
                  <div className="text-lg font-bold text-black mt-0.5">35</div>
                  <div className="text-[9.5px] text-gray-400 truncate">Plots viewed</div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Recommended Plots + Verified Alerts Card in side-by-side flex */}
            <div 
              className="flex flex-row gap-4 items-stretch"
              style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'stretch' }}
            >
              
              {/* Left Section: Recommended Plots For You (Horizontal row of 3 cards) */}
              <div 
                className="flex-1 min-w-0 flex flex-col justify-between"
                style={{ flex: '1 1 0%', minWidth: 0 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-sm font-bold text-black">
                        Recommended Plots For You
                      </h2>
                      <p className="text-[11px] text-gray-500">
                        Based on your searches, budget and preferences
                      </p>
                    </div>

                    <Link
                      to="/buy-plots"
                      className="text-xs font-semibold text-[#0B5C2E] hover:underline flex items-center gap-1"
                    >
                      <span>View All Recommendations</span>
                      <span>→</span>
                    </Link>
                  </div>

                  {/* Horizontal row of 3 cards matching exact screenshot */}
                  <div 
                    className="grid grid-cols-3 gap-3"
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}
                  >
                    {displayedPlots.map((plot) => (
                      <div
                        key={plot.id}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-2xs transition-all hover:shadow-md"
                      >
                        {/* Image */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100" style={{ height: '150px' }}>
                          <img
                            src={plot.image}
                            alt={plot.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Badge */}
                          <div className="absolute left-2.5 top-2.5">
                            <span 
                              className="inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs"
                              style={{ backgroundColor: plot.badge === 'NEW' ? '#0B5C2E' : plot.badge === 'FEATURED' ? '#7C3AED' : '#2563EB' }}
                            >
                              {plot.badge}
                            </span>
                          </div>
                          {/* Heart */}
                          <button
                            onClick={() => toggleShortlist(plot.plotId)}
                            className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-black shadow-sm cursor-pointer"
                          >
                            <Heart className={`h-3.5 w-3.5 ${shortlists.includes(plot.plotId) ? 'fill-red-500 text-red-500' : 'text-black'}`} />
                          </button>
                        </div>

                        {/* Body */}
                        <div className="p-3 flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="text-xs font-bold text-black line-clamp-1">
                              {plot.title}
                            </h3>
                            <div className="mt-1 flex items-center gap-1 text-[10.5px] text-gray-500">
                              <MapPin className="h-3 w-3 shrink-0" />
                              <span className="truncate">{plot.location}</span>
                            </div>
                            <div className="mt-2 text-[10.5px] text-gray-700 flex items-center gap-1.5 font-medium">
                              <span>{plot.area}</span>
                              <span>•</span>
                              <span>{plot.facing}</span>
                              <span>•</span>
                              <span>{plot.road}</span>
                            </div>

                            <div className="mt-2 flex items-baseline gap-1">
                              <span className="text-sm font-bold text-[#0B5C2E]">
                                {plot.price}
                              </span>
                              <span className="text-[10px] text-gray-500 font-medium">/ Sq Yd</span>
                            </div>

                            {/* Tags matching screenshot */}
                            <div className="mt-2 flex flex-wrap items-center gap-1">
                              <span className="rounded bg-green-50 px-1.5 py-0.5 text-[9.5px] font-semibold text-green-700">
                                {plot.tagGreen}
                              </span>
                              <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9.5px] font-semibold text-blue-600">
                                {plot.tagBlue}
                              </span>
                            </div>
                          </div>

                          <div className="mt-2.5 pt-1">
                            <Link
                              to={`/plot/${plot.plotId}`}
                              className="block w-full rounded-lg border border-[#0B5C2E] py-1 text-center text-xs font-semibold text-[#0B5C2E] hover:bg-[#0B5C2E] hover:text-white transition-colors"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shortlisted Properties Drawer when menu item clicked */}
                {activeMenu === 'Saved Properties' && (
                  <div className="mt-4 rounded-2xl bg-white border border-gray-200 p-4">
                    <h3 className="text-xs font-bold text-black mb-2">Shortlisted Properties ({savedPlots.length})</h3>
                    {savedPlots.length === 0 ? (
                      <p className="text-xs text-gray-500">No properties in shortlist yet. Tap heart icon on any plot to add.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {savedPlots.map(p => (
                          <div key={p.id} className="p-2 border rounded-xl flex items-center gap-3">
                            <img src={p.image} alt={p.title} className="h-12 w-12 rounded-lg object-cover" />
                            <div>
                              <p className="text-xs font-bold text-black">{p.title}</p>
                              <p className="text-[11px] text-[#0B5C2E] font-bold">{p.price} / Sq Yd</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Section: Verified Alerts Card matching exact screenshot media_1791212927005.png */}
              <div 
                className="w-[280px] shrink-0"
                style={{ width: '280px', minWidth: '280px', flexShrink: 0 }}
              >
                <div 
                  className="h-full rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col justify-between"
                  style={{ backgroundColor: '#0B3B1E', color: '#ffffff' }}
                >
                  <div>
                    {/* Top Pill / Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold mb-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <span>Get Open Plot</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold tracking-tight text-white">
                      Verified Alerts
                    </h2>
                    <p className="text-xs text-emerald-200/90 mt-0.5">
                      for 365 days @ just
                    </p>

                    {/* Price */}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white">₹9.99</span>
                      <span className="text-xs text-emerald-200">Rupees Only</span>
                    </div>

                    {/* Features List */}
                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-emerald-100">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>Verified Open Plots Only</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-100">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>HMDA / DTCP / RERA Verified</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-100">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>Instant Alerts on WhatsApp</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-100">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>Best Investment Opportunities</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-100">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>Cancel Anytime</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Banner & Action Button */}
                  <div className="mt-5 pt-2">
                    <div 
                      className="rounded-xl px-2.5 py-1.5 text-center text-[11px] mb-2.5 font-medium border"
                      style={{ backgroundColor: '#072814', borderColor: '#165B32', color: '#D4E8A0' }}
                    >
                      Payment received – awaiting team activation
                    </div>

                    <button
                      onClick={() => setShowQRModal(true)}
                      className="w-full rounded-xl py-2.5 px-3 text-center text-xs font-bold text-black shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:opacity-95"
                      style={{ backgroundColor: '#F5B422', color: '#000000' }}
                    >
                      <span className="text-black font-bold">View Payment QR</span>
                    </button>

                    <p className="mt-2 text-center text-[9.5px] text-emerald-300/80">
                      Pay via PhonePe QR • Team activates after payment
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </main>

        </div>
      </div>

      {/* PhonePe ₹9.99 QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center">
            {/* Close button */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-black cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
              <span>PhonePe UPI Payment</span>
            </div>

            <h3 className="text-lg font-bold text-black">
              Verified Alerts Activation
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Scan QR code with PhonePe, GPay, or any UPI app
            </p>

            {/* QR Image */}
            <div className="mx-auto my-4 w-52 rounded-2xl border border-gray-200 bg-gray-50 p-3 shadow-inner">
              <img
                src={De.phonepeQr}
                alt="PhonePe QR Code ₹9.99"
                className="h-46 w-46 object-contain mx-auto"
              />
            </div>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 py-1.5 px-3 text-xs font-bold text-emerald-800 mb-4 inline-block">
              Amount to Pay: ₹9.99
            </div>

            {/* UTR Form */}
            {paymentSuccessMsg ? (
              <div className="rounded-xl bg-green-100 p-3 text-xs font-bold text-green-800 flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />
                <span>Payment recorded! Activating alerts…</span>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter 12-digit UPI / UTR Reference No."
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs text-black focus:outline-none focus:border-green-600"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#0B5C2E] py-2.5 text-xs font-bold text-white hover:bg-[#084824] transition-colors cursor-pointer"
                >
                  I Have Completed Payment
                </button>
              </form>
            )}

            <p className="mt-3 text-[10px] text-gray-500">
              Instant activation for 365 days of WhatsApp & SMS alerts.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
