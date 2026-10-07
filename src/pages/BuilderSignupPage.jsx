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
  Globe, 
  TrendingUp, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Check 
} from 'lucide-react';

const AUTH_BG = "https://horizons-cdn.hostinger.com/80a920ee-4d11-41fd-bea9-029ca0c028bb/d02862d1-45f5-498d-a4b0-640d7c7cbf9b-KXX5p.png";

const DESIGNATIONS = [
  "Director",
  "Managing Director",
  "CEO",
  "Sales Head",
  "Marketing Manager",
  "Authorized Signatory",
  "Other"
];

const COMPANY_TYPES = [
  { value: "builder", label: "Builder" },
  { value: "developer", label: "Developer" },
  { value: "both", label: "Builder / Developer" }
];

const CITIES = ["Hyderabad", "Bengaluru", "Chennai", "Pune", "Mumbai", "Visakhapatnam", "Other"];
const STATES = ["Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu", "Maharashtra", "Other"];

const BUILDER_CATS = [
  { title: "Open Plots", sub: "List plotted developments", img: De.grid },
  { title: "Villa Plots", sub: "Showcase villa communities", img: De.villa },
  { title: "Residential Plots", sub: "Promote residential projects", img: De.gate },
  { title: "Investment Zones", sub: "Reach investors & NRIs", img: De.road }
];

export default function BuilderSignupPage() {
  const { signupWithFiles } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: '',
    authorized_person: '',
    phone: '',
    email: '',
    designation: 'Managing Director',
    company_type: 'developer',
    company_website: '',
    city: 'Hyderabad',
    state: 'Telangana',
    about_company: ''
  });

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Uploaded documents state
  const [docs, setDocs] = useState({
    logo: null,
    rera: null,
    reg: null
  });

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocMockUpload = (docKey) => {
    setDocs(prev => ({
      ...prev,
      [docKey]: prev[docKey] ? null : `doc_${docKey}_uploaded.pdf`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signupWithFiles(formData.email, password, {
        ...formData,
        docs
      });
      navigate('/login', { 
        replace: true,
        state: { 
          signupSuccess: true, 
          message: 'Builder account registered successfully! Please sign in with your email and password.',
          email: formData.email,
          role: 'builder'
        } 
      });
    } catch (err) {
      setError(err?.message || 'Could not register builder account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.2fr)_minmax(380px,0.8fr)] bg-[#f6f8f6]">
      
      {/* Left Column: Brand Hero Banner for Builders */}
      <div className="relative hidden overflow-hidden lg:flex lg:flex-col">
        <img
          src={AUTH_BG}
          alt="OnlyPlots Builder Hero"
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
              Partner with<br />
              <span className="text-[#7CFF9A]">Verified Buyers</span>
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/85">
              List your projects and connect with serious buyers across India.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-y-3.5">
              {[
                { t: "Showcase Your Projects", d: "Reach genuine plot buyers and investors", icon: Building2 },
                { t: "Verified Lead Enquiries", d: "Get high-quality, intent-based leads", icon: User },
                { t: "Exclusive Builder Dashboard", d: "Manage projects, leads & site visits", icon: TrendingUp },
                { t: "Build Trust", d: "HMDA / RERA verified projects get priority", icon: ShieldCheck }
              ].map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-[#7CFF9A] mt-0.5">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-white leading-snug">{b.t}</div>
                      <div className="text-[11px] text-white/70">{b.d}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom 4 Categories */}
            <div className="mt-8 grid grid-cols-4 gap-2.5">
              {BUILDER_CATS.map((cat, idx) => (
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
                { top: "HMDA / RERA", bottom: "Verified Projects" },
                { top: "50+", bottom: "Prime Locations" },
                { top: "10,000+", bottom: "Active Buyers" },
                { top: "High ROI", bottom: "Serious Investors" }
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

      {/* Right Column: Builder Signup Form */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="mx-auto w-full max-w-[500px] my-auto py-6">
          
          {/* Role Switcher Bar */}
          <div className="flex rounded-xl bg-gray-200/80 p-1">
            <Link
              to="/signup/buyer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-bold text-gray-600 hover:bg-white/60 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Buyer</span>
            </Link>

            <span className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0B5C2E] py-2.5 text-[13px] font-bold text-white shadow-sm">
              <Building2 className="h-4 w-4" />
              <span>Builder</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mt-5 flex items-end justify-between gap-2">
            <h2 className="text-[20px] font-black text-gray-900 tracking-tight">
              Sign Up as Builder
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
            
            {/* Company Name & Authorized Person */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <label className="block text-[11px] font-semibold text-gray-500">Company / Builder Name *</label>
                <div className="mt-0.5 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-400 shrink-0" />
                  <input
                    required
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => handleFieldChange('company_name', e.target.value)}
                    placeholder="Enter company name"
                    className="w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400 font-medium text-gray-900"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <label className="block text-[11px] font-semibold text-gray-500">Authorized Person Name *</label>
                <div className="mt-0.5 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400 shrink-0" />
                  <input
                    required
                    type="text"
                    value={formData.authorized_person}
                    onChange={(e) => handleFieldChange('authorized_person', e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400 font-medium text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Number & Email */}
            <div className="grid gap-3 sm:grid-cols-2">
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
            </div>

            {/* Designation & Company Type */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <label className="block text-[11px] font-semibold text-gray-500">Designation *</label>
                <select
                  required
                  value={formData.designation}
                  onChange={(e) => handleFieldChange('designation', e.target.value)}
                  className="w-full bg-transparent text-[13px] outline-none text-gray-800 font-medium mt-0.5"
                >
                  <option value="">Select designation</option>
                  {DESIGNATIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <label className="block text-[11px] font-semibold text-gray-500">Company Type *</label>
                <select
                  required
                  value={formData.company_type}
                  onChange={(e) => handleFieldChange('company_type', e.target.value)}
                  className="w-full bg-transparent text-[13px] outline-none text-gray-800 font-medium mt-0.5"
                >
                  <option value="">Select type (Builder / Developer)</option>
                  {COMPANY_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Company Website */}
            <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
              <label className="block text-[11px] font-semibold text-gray-500">Company Website (Optional)</label>
              <div className="mt-0.5 flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-400 shrink-0" />
                <input
                  type="url"
                  value={formData.company_website}
                  onChange={(e) => handleFieldChange('company_website', e.target.value)}
                  placeholder="https://yourcompany.com"
                  className="w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400 font-medium text-gray-900"
                />
              </div>
            </div>

            {/* City & State */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <label className="block text-[11px] font-semibold text-gray-500">City *</label>
                <select
                  required
                  value={formData.city}
                  onChange={(e) => handleFieldChange('city', e.target.value)}
                  className="w-full bg-transparent text-[13px] outline-none text-gray-800 font-medium mt-0.5"
                >
                  <option value="">Select city</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <label className="block text-[11px] font-semibold text-gray-500">State *</label>
                <select
                  required
                  value={formData.state}
                  onChange={(e) => handleFieldChange('state', e.target.value)}
                  className="w-full bg-transparent text-[13px] outline-none text-gray-800 font-medium mt-0.5"
                >
                  <option value="">Select state</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* About Your Company */}
            <div>
              <label className="mb-1 block text-[12px] font-semibold text-gray-700">About Your Company *</label>
              <div className="rounded-xl border border-gray-200 bg-white p-3 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
                <textarea
                  required
                  rows={3}
                  value={formData.about_company}
                  onChange={(e) => handleFieldChange('about_company', e.target.value)}
                  placeholder="Tell us about your company, ongoing and upcoming projects…"
                  className="w-full resize-none bg-transparent text-[13px] outline-none placeholder:text-gray-400 font-medium"
                />
              </div>
            </div>

            {/* Upload Documents (3 Interactive Tiles) */}
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <label className="text-[12px] font-semibold text-gray-700">Upload Documents *</label>
                <span className="text-[10px] text-gray-400">Accepted formats: PDF, JPG, PNG (Max 5MB each)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'logo', label: 'Company Logo', icon: Building2 },
                  { key: 'rera', label: 'RERA Certificate', icon: ShieldCheck },
                  { key: 'reg', label: 'Business Reg (ROC/GST)', icon: FileText }
                ].map(({ key, label, icon: Icon }) => {
                  const isUploaded = !!docs[key];
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => handleDocMockUpload(key)}
                      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-3 text-center transition ${
                        isUploaded
                          ? "border-green-600 bg-green-50 text-green-800 shadow-2xs"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500 mb-1">
                        {isUploaded ? <Check className="h-4 w-4 text-green-700 font-black" /> : <Upload className="h-3.5 w-3.5" />}
                      </div>
                      <span className="text-[10.5px] font-bold leading-tight line-clamp-1">{label}</span>
                      <span className="text-[9px] text-gray-400 mt-0.5">
                        {isUploaded ? "Uploaded ✓" : "Click to attach"}
                      </span>
                    </button>
                  );
                })}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <span>{loading ? "Creating account…" : "Create Builder Account"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}
