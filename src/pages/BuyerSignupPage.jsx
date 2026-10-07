import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { De } from '../data/images';
import { 
  Building2, 
  User, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Phone, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Headphones, 
  Bell 
} from 'lucide-react';

const AUTH_BG = "https://horizons-cdn.hostinger.com/80a920ee-4d11-41fd-bea9-029ca0c028bb/d02862d1-45f5-498d-a4b0-640d7c7cbf9b-KXX5p.png";
const GOOGLE_ICON = "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg";

const CITIES = ["Hyderabad", "Bengaluru", "Chennai", "Pune", "Mumbai", "Visakhapatnam", "Other"];

const BUDGET_RANGES = [
  "Under ₹15L",
  "₹15L – ₹30L",
  "₹30L – ₹50L",
  "₹50L – ₹1Cr",
  "Above ₹1Cr"
];

const PREFERRED_LOCATIONS_MAP = {
  Hyderabad: ["Kothur", "Shadnagar", "Tukkuguda", "Maheshwaram", "Adibatla", "Future City", "Yacharam"],
  Bengaluru: ["Devanahalli", "Yelahanka", "Hoskote", "Sarjapur", "Anekal", "Bannerghatta", "Doddaballapur"],
  Chennai: ["Sriperumbudur", "Oragadam", "Guduvanchery", "Tambaram", "Chengalpattu", "Ponmar", "Mudichur"],
  Pune: ["Wagholi", "Hinjewadi", "Baner", "Wakad", "Talegaon", "Chakan", "Lonavala"],
  Mumbai: ["Navi Mumbai", "Thane", "Panvel", "Kalyan", "Dombivli", "Virar", "Karjat"],
  Visakhapatnam: ["Gajuwaka", "Bheemunipatnam", "Anandapuram", "Pendurthi", "Madhurawada", "Kapuluppada", "Atchuthapuram"],
  Other: []
};

const PLOT_INTEREST_TYPES = [
  { id: "open_plots", label: "Open Plots", icon: Building2 },
  { id: "villa_plots", label: "Villa Plots", icon: Sparkles },
  { id: "residential_plots", label: "Residential Plots", icon: Layers },
  { id: "investment_zones", label: "Investment Zones", icon: TrendingUp }
];

export default function BuyerSignupPage() {
  const { signup, oauthLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    password: '',
    plot_interest: ['open_plots'],
    budget_range: '',
    preferred_locations: ['Kothur', 'Shadnagar']
  });

  const [customLocation, setCustomLocation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCityChange = (newCity) => {
    setFormData(prev => ({
      ...prev,
      city: newCity,
      preferred_locations: []
    }));
    setCustomLocation('');
  };

  const toggleInterest = (id) => {
    setFormData(prev => {
      const exists = prev.plot_interest.includes(id);
      const updated = exists
        ? prev.plot_interest.filter(item => item !== id)
        : [...prev.plot_interest, id];
      return {
        ...prev,
        plot_interest: updated.length ? updated : prev.plot_interest
      };
    });
  };

  const toggleLocation = (loc) => {
    setFormData(prev => {
      const exists = prev.preferred_locations.includes(loc);
      const updated = exists
        ? prev.preferred_locations.filter(item => item !== loc)
        : [...prev.preferred_locations, loc];
      return {
        ...prev,
        preferred_locations: updated
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        preferred_locations: formData.city === 'Other' && customLocation 
          ? [customLocation] 
          : formData.preferred_locations
      };
      await signup(payload);
      navigate('/login', { 
        replace: true,
        state: { 
          signupSuccess: true, 
          message: 'Account created successfully! Please sign in with your credentials to explore plots.',
          email: formData.email,
          role: 'buyer'
        } 
      });
    } catch (err) {
      setError(err?.message || 'Could not create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.2fr)_minmax(380px,0.8fr)] bg-[#f6f8f6]">
      
      {/* Left Column: Brand Hero Banner */}
      <div className="relative hidden overflow-hidden lg:flex lg:flex-col">
        <img
          src={AUTH_BG}
          alt="OnlyPlots Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#02140c]/95 via-[#042016]/82 to-[#03140c]/45" />

        <div className="relative z-10 flex h-full min-h-screen flex-col px-10 pb-8 pt-8 text-white">
          
          <div className="flex items-center justify-between gap-6">
            <Link to="/" className="leading-none shrink-0">
              <div className="text-[22px] font-extrabold tracking-tight">
                <span className="text-white">Only</span>
                <span className="text-green-500">Plots</span>
                <span className="ml-1.5 inline-block -translate-y-[2px] rounded bg-green-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  .online
                </span>
              </div>
              <div className="mt-0.5 text-[10px] text-green-100/60 font-medium">
                Only Plots. No Distractions.
              </div>
            </Link>

            <nav className="hidden items-center gap-5 text-[12.5px] font-medium text-white/85 xl:flex">
              <Link to="/buy-plots" className="hover:text-green-400 transition-colors">Buy Plots</Link>
              <Link to="/villa-plots" className="hover:text-green-400 transition-colors">Villa Plots</Link>
              <Link to="/residential-plots" className="hover:text-green-400 transition-colors">Residential Plots</Link>
              <Link to="/investment-zones" className="hover:text-green-400 transition-colors">Investment Zones</Link>
              <Link to="/resources" className="hover:text-green-400 transition-colors">Resources</Link>
            </nav>
          </div>

          <div className="mt-auto max-w-[560px] pt-16">
            <h1 className="text-[52px] font-black leading-[1.02] tracking-tight drop-shadow-sm">
              Invest Today<br />
              in a Better<br />
              <span className="text-[#7CFF9A]">Tomorrow</span>
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/85">
              Explore HMDA & RERA Approved Premium Open Plots across top growth corridors.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {[
                { t: "Verified Projects (HMDA / RERA)", icon: ShieldCheck },
                { t: "Prime Growth Corridors", icon: TrendingUp },
                { t: "Best Investment Opportunities", icon: Sparkles },
                { t: "Transparent Pricing", icon: CheckCircle2 },
                { t: "Trusted Builders", icon: Building2 },
                { t: "End-to-End Support", icon: Headphones }
              ].map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-[#7CFF9A] mt-0.5">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="text-[13px] font-bold text-white leading-snug">{b.t}</div>
                  </div>
                );
              })}
            </div>

            {/* Bottom 4 Categories */}
            <div className="mt-8 grid grid-cols-4 gap-2.5">
              {[
                { title: "Open Plots", sub: "Investment that grows", img: De.grid },
                { title: "Villa Plots", sub: "Build your dream home", img: De.villa },
                { title: "Residential Plots", sub: "Prime locations", img: De.gate },
                { title: "Investment Zones", sub: "High growth corridors", img: De.road }
              ].map((cat, idx) => (
                <div key={idx} className="overflow-hidden rounded-xl border border-white/15 bg-white/5 backdrop-blur-xs">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img src={cat.img} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-2">
                    <div className="text-[11px] font-bold text-white truncate">{cat.title}</div>
                    <div className="text-[9px] text-white/60 truncate">{cat.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-4 gap-2 border-t border-white/15 pt-5 text-center">
              {[
                { top: "HMDA / RERA", bottom: "Approved Projects" },
                { top: "50+", bottom: "Prime Locations" },
                { top: "10,000+", bottom: "Happy Customers" },
                { top: "High ROI", bottom: "Future Ready Investment" }
              ].map((st, idx) => (
                <div key={idx}>
                  <div className="text-[16px] font-black text-[#7CFF9A]">{st.top}</div>
                  <div className="text-[10px] font-semibold text-white/70">{st.bottom}</div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Right Column: Buyer Signup Form */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="mx-auto w-full max-w-[480px] my-auto py-6">
          
          {/* Role Switcher Bar */}
          <div className="flex rounded-xl bg-gray-200/80 p-1">
            <span className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0B5C2E] py-2.5 text-[13px] font-bold text-white shadow-sm">
              <User className="h-4 w-4" />
              <span>Buyer</span>
            </span>

            <Link
              to="/signup/builder"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-bold text-gray-600 hover:bg-white/60 transition-colors"
            >
              <Building2 className="h-4 w-4" />
              <span>Builder</span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mt-5 flex items-end justify-between gap-2">
            <h2 className="text-[20px] font-black text-gray-900 tracking-tight">
              Sign Up as Buyer
            </h2>
            <p className="text-[12px] text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-green-700 hover:underline">
                Login
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            
            {/* Name and Mobile */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <label className="block text-[11px] font-semibold text-gray-500">Full Name *</label>
                <div className="mt-0.5 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400 shrink-0" />
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400 font-medium text-gray-900"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <label className="block text-[11px] font-semibold text-gray-500">Mobile Number *</label>
                <div className="mt-0.5 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                  <input
                    required
                    type="tel"
                    pattern="[0-9+\s-]{10,15}"
                    value={formData.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    placeholder="Enter 10 digit mobile number"
                    className="w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400 font-medium text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Email and City */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <label className="block text-[11px] font-semibold text-gray-500">Email Address *</label>
                <div className="mt-0.5 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400 font-medium text-gray-900"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <label className="block text-[11px] font-semibold text-gray-500">City *</label>
                <div className="mt-0.5 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full bg-transparent text-[13px] outline-none text-gray-800 font-medium"
                  >
                    <option value="">Select your city</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Type of Plot Interested */}
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-gray-700">
                Type of Plot Interested *
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PLOT_INTEREST_TYPES.map(({ id, label, icon: Icon }) => {
                  const selected = formData.plot_interest.includes(id);
                  return (
                    <button
                      type="button"
                      key={id}
                      onClick={() => toggleInterest(id)}
                      className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-[11px] font-semibold transition ${
                        selected
                          ? "border-green-600 bg-green-50 text-green-900 shadow-2xs ring-1 ring-green-600/20"
                          : "border-gray-200 bg-white text-gray-600 hover:border-green-300"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${selected ? "text-green-700" : "text-gray-400"}`} />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Range and Preferred Locations */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <label className="block text-[11px] font-semibold text-gray-500">
                  Budget Range (Optional)
                </label>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-gray-400">₹</span>
                  <select
                    value={formData.budget_range}
                    onChange={(e) => handleFieldChange('budget_range', e.target.value)}
                    className="w-full bg-transparent text-[13px] outline-none text-gray-800 font-medium"
                  >
                    <option value="">Select budget range</option>
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Preferred Locations */}
              <div className="sm:col-span-1">
                <label className="mb-1 block text-[11px] font-semibold text-gray-500">
                  Preferred Locations (Optional) {formData.city && formData.city !== "Other" ? `— ${formData.city}` : ""}
                </label>

                {formData.city === "Other" ? (
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
                    <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                    <input
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      placeholder="Enter preferred city / area"
                      className="w-full bg-transparent text-[13px] outline-none font-medium"
                    />
                  </div>
                ) : formData.city && PREFERRED_LOCATIONS_MAP[formData.city]?.length > 0 ? (
                  <div>
                    <div className="flex flex-wrap gap-1.5 rounded-xl border border-gray-200 bg-white p-2">
                      {PREFERRED_LOCATIONS_MAP[formData.city].map((loc) => {
                        const isPicked = formData.preferred_locations.includes(loc);
                        return (
                          <button
                            type="button"
                            key={loc}
                            onClick={() => toggleLocation(loc)}
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold transition ${
                              isPicked
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {isPicked && <MapPin className="h-2.5 w-2.5" />}
                            <span>{loc}</span>
                          </button>
                        );
                      })}
                    </div>
                    {formData.preferred_locations.length > 0 && (
                      <p className="mt-1 text-[10.5px] text-gray-400">
                        {formData.preferred_locations.length} selected
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-2 text-[11px] text-gray-400">
                    Select a city above to see related location chips.
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
              <label className="block text-[11px] font-semibold text-gray-500">Password *</label>
              <div className="mt-0.5 flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-400 shrink-0" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400 font-medium text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2 text-[12px] text-gray-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 accent-[#0B5C2E]"
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="font-semibold text-green-700 hover:underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="font-semibold text-green-700 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B5C2E] py-3 text-[14px] font-bold text-white hover:bg-[#094a25] disabled:opacity-60 shadow-sm transition-all"
            >
              <span>{loading ? "Creating account…" : "Create Account"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Social */}
          <div className="my-4 flex items-center gap-3 text-[11px] font-medium text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            <span>OR</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={async () => {
                await oauthLogin('Google');
                navigate('/dashboard');
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-[12px] font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 shadow-2xs"
            >
              <img src={GOOGLE_ICON} alt="" className="h-4 w-4" />
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                await oauthLogin('Apple');
                navigate('/dashboard');
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-[12px] font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 shadow-2xs"
            >
              <span className="text-[15px] leading-none"></span>
              <span>Continue with Apple</span>
            </button>
          </div>

          {/* 4 Trust Badges */}
          <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-green-100 bg-green-50/60 p-3 sm:grid-cols-4">
            {[
              { icon: ShieldCheck, text: "100% Verified Projects" },
              { icon: CheckCircle2, text: "No Brokerage Direct Connect" },
              { icon: Bell, text: "Latest Offers & Updates" },
              { icon: Headphones, text: "Personalized Assistance" }
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-center">
                <Icon className="h-4 w-4 text-green-700 shrink-0" />
                <span className="text-[10px] font-semibold leading-tight text-gray-700">
                  {text}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
