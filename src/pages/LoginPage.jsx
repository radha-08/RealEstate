import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
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
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  MapPin, 
  Headphones, 
  PhoneCall, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

const AUTH_BG = "https://horizons-cdn.hostinger.com/80a920ee-4d11-41fd-bea9-029ca0c028bb/d02862d1-45f5-498d-a4b0-640d7c7cbf9b-KXX5p.png";
const GOOGLE_ICON = "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg";

const BUYER_CATS = [
  { title: "Open Plots", sub: "Investment that grows", img: De.grid },
  { title: "Villa Plots", sub: "Build your dream home", img: De.villa },
  { title: "Residential Plots", sub: "Prime locations", img: De.gate },
  { title: "Investment Zones", sub: "High growth corridors", img: De.road }
];

const BUILDER_CATS = [
  { title: "Open Plots", sub: "List plotted developments", img: De.grid },
  { title: "Villa Plots", sub: "Showcase villa communities", img: De.villa },
  { title: "Residential Plots", sub: "Promote residential projects", img: De.gate },
  { title: "Investment Zones", sub: "Reach investors & NRIs", img: De.road }
];

export default function LoginPage() {
  const [role, setRole] = useState('buyer'); // buyer | builder | admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [connectingProvider, setConnectingProvider] = useState(null);
  const [error, setError] = useState('');

  const { login, guestLogin, oauthLogin, DEFAULT_USERS } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');

  const signupSuccess = location.state?.signupSuccess;
  const signupMessage = location.state?.message;

  // Auto-fill email and role if coming from signup
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
    if (location.state?.role) {
      setRole(location.state.role);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password, role);
      const userRole = res?.record?.role || role;

      if (redirect) {
        navigate(redirect, { replace: true });
      } else if (userRole === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        // ALWAYS navigate to main page ('/') upon login as requested ("then to main page")
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    setError('');
    setConnectingProvider(provider);
    try {
      const res = await oauthLogin(provider);
      const userRole = res?.record?.role || role;
      if (userRole === 'builder') navigate('/seller', { replace: true });
      else if (userRole === 'admin') navigate('/admin', { replace: true });
      else navigate('/', { replace: true }); // Real website!
    } catch (err) {
      setError(`${provider} sign-in failed. Please try again.`);
    } finally {
      setConnectingProvider(null);
    }
  };

  const handleDemoFill = (selectedRole) => {
    setRole(selectedRole);
    const demo = DEFAULT_USERS[selectedRole];
    setEmail(demo.email);
    setPassword('demo123456');
  };

  // Content for left hero pane
  const heroContent = role === 'builder' ? {
    title: (
      <>
        Partner with<br />
        <span className="text-[#7CFF9A]">Verified Buyers</span>
      </>
    ),
    sub: "List your projects and connect with serious buyers across India.",
    bullets: [
      { t: "Showcase Your Projects", d: "Reach genuine plot buyers and investors", icon: Building2 },
      { t: "Verified Lead Enquiries", d: "Get high-quality, intent-based leads", icon: User },
      { t: "Exclusive Builder Dashboard", d: "Manage projects, leads & site visits", icon: TrendingUp },
      { t: "Build Trust", d: "HMDA / RERA verified projects get priority", icon: ShieldCheck }
    ],
    cats: BUILDER_CATS,
    stats: [
      { top: "HMDA / RERA", bottom: "Verified Projects" },
      { top: "50+", bottom: "Prime Locations" },
      { top: "10,000+", bottom: "Active Buyers" },
      { top: "High ROI", bottom: "Serious Investors" }
    ]
  } : {
    title: (
      <>
        Invest Today<br />
        in a Better<br />
        <span className="text-[#7CFF9A]">Tomorrow</span>
      </>
    ),
    sub: "Explore HMDA & RERA Approved Premium Open Plots",
    bullets: [
      { t: "Verified Projects (HMDA / RERA)", icon: ShieldCheck },
      { t: "Prime Growth Corridors", icon: TrendingUp },
      { t: "Best Investment Opportunities", icon: Sparkles },
      { t: "Transparent Pricing", icon: CheckCircle2 },
      { t: "Trusted Builders", icon: Building2 },
      { t: "End-to-End Support", icon: Headphones }
    ],
    cats: BUYER_CATS,
    stats: [
      { top: "HMDA / RERA", bottom: "Approved Projects" },
      { top: "50+", bottom: "Prime Locations" },
      { top: "10,000+", bottom: "Happy Customers" },
      { top: "High ROI", bottom: "Future Ready Investment" }
    ]
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
          
          {/* Top Brand Bar */}
          <div className="flex items-center justify-between gap-6">
            <Link to="/home" className="leading-none shrink-0">
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
              <Link
                to="/list-plot"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[12px] font-semibold hover:bg-white/20 transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-green-400" />
                <span>List Your Plot</span>
              </Link>
            </nav>
          </div>

          {/* Main Hero Copy */}
          <div className="mt-auto max-w-[560px] pt-16">
            <h1 className="text-[52px] font-black leading-[1.02] tracking-tight drop-shadow-sm">
              {heroContent.title}
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/85">
              {heroContent.sub}
            </p>

            {/* Bullets Grid */}
            <div className={`mt-8 grid gap-x-6 gap-y-3.5 ${role === 'builder' ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {heroContent.bullets.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-[#7CFF9A] mt-0.5">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-white leading-snug">{b.t}</div>
                      {b.d && <div className="text-[11px] text-white/70">{b.d}</div>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 4 Bottom Categories Thumbnails */}
            <div className="mt-8 grid grid-cols-4 gap-2.5">
              {heroContent.cats.map((cat, idx) => (
                <div key={idx} className="overflow-hidden rounded-xl border border-white/15 bg-white/5 backdrop-blur-xs group">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img src={cat.img} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-110" />
                  </div>
                  <div className="p-2">
                    <div className="text-[11px] font-bold text-white truncate">{cat.title}</div>
                    <div className="text-[9px] text-white/60 truncate">{cat.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="mt-8 grid grid-cols-4 gap-2 border-t border-white/15 pt-5 text-center">
              {heroContent.stats.map((st, idx) => (
                <div key={idx}>
                  <div className="text-[16px] font-black text-[#7CFF9A]">{st.top}</div>
                  <div className="text-[10px] font-semibold text-white/70">{st.bottom}</div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Right Column: Exact Auth Form Panel */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between pb-6 border-b border-gray-200">
          <Link to="/home" className="text-xl font-black">
            <span className="text-gray-950">Only</span>
            <span className="text-green-600">Plots</span>
            <span className="ml-1 text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded">.online</span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-[420px] my-auto py-6">
          
          {/* Signup Success Feedback Banner */}
          {signupSuccess && (
            <div className="mb-4 flex items-start gap-3 rounded-2xl bg-emerald-50 border border-emerald-200/90 p-4 text-xs shadow-xs animate-in fade-in">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-950 text-[13px]">Account Created Successfully!</p>
                <p className="text-[12px] text-emerald-800 mt-0.5 leading-relaxed">
                  {signupMessage || 'Please sign in with your credentials to access the portal.'}
                </p>
              </div>
            </div>
          )}

          {/* Role Switcher Tabs */}
          <div className="flex rounded-xl bg-gray-200/80 p-1">
            <button
              type="button"
              onClick={() => {
                setRole('buyer');
                setEmail('');
                setPassword('');
                setError('');
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-bold transition-all ${
                role === 'buyer'
                  ? 'bg-[#0B5C2E] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-white/60'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Buyer</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole('builder');
                setEmail('');
                setPassword('');
                setError('');
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-bold transition-all ${
                role === 'builder'
                  ? 'bg-[#0B5C2E] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-white/60'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Builder</span>
            </button>

            {/* <button
              type="button"
              onClick={() => {
                setRole('admin');
                setEmail('admin@onlyplots.online');
                setPassword('admin123456');
                setError('');
              }}
              className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-[12px] font-bold transition-all ${
                role === 'admin'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-500 hover:bg-white/60'
              }`}
              title="SuperAdmin Portal"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin</span>
            </button> */}
          </div>

          {/* Quick Demo Credentials Assistant */}
          {/* <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-50 border border-gray-200/80 px-3 py-2 text-[11px] text-gray-600">
            <span>Demo Account:</span>
            <button
              type="button"
              onClick={() => handleDemoFill(role)}
              className="font-bold text-[#0B5C2E] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Auto-fill Demo {role === 'builder' ? 'Builder' : role === 'admin' ? 'Admin' : 'Buyer'}</span>
            </button>
          </div> */}
      

          {/* Headings */}
          <div className="mt-6 flex items-end justify-between gap-2">
            <div>
              <h2 className="text-[22px] font-black text-gray-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="mt-0.5 text-[12px] text-gray-500">
                Sign in to enter the {role === 'builder' ? 'builder CRM' : role === 'admin' ? 'superadmin console' : 'real website'}
              </p>
            </div>
            <Link
              to={role === 'builder' ? '/signup/builder' : '/signup/buyer'}
              className="text-[12px] font-bold text-green-700 hover:underline"
            >
              Sign Up
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            {/* Email Field */}
            <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
              <label className="block text-[11px] font-semibold text-gray-500">
                Email Address *
              </label>
              <div className="mt-0.5 flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder={role === 'builder' ? 'builder@balajiinfra.com' : role === 'admin' ? 'admin@onlyplots.online' : 'you@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400 font-medium text-gray-900"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600/20">
              <label className="block text-[11px] font-semibold text-gray-500">
                Password *
              </label>
              <div className="mt-0.5 flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-400 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-[12px] pt-1">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-gray-300 accent-[#0B5C2E]"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset instructions sent to your email.");
                }}
                className="font-semibold text-green-700 hover:text-green-800 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B5C2E] py-3 text-[14px] font-bold text-white hover:bg-[#094a25] disabled:opacity-60 shadow-sm transition-all"
            >
              <span>
                {loading ? "Signing in…" : `Login & Enter ${role === 'builder' ? 'Builder CRM' : role === 'admin' ? 'Admin' : 'Real Website'}`}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* OR Divider */}
          <div className="my-5 flex items-center gap-3 text-[11px] font-medium text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            <span>OR</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={connectingProvider === 'Google'}
              onClick={() => handleOAuth('Google')}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-[12.5px] font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 disabled:opacity-60 shadow-2xs"
            >
              <img src={GOOGLE_ICON} alt="" className="h-4 w-4" />
              <span>{connectingProvider === 'Google' ? "Connecting…" : "Continue with Google"}</span>
            </button>

            <button
              type="button"
              disabled={connectingProvider === 'Apple'}
              onClick={() => handleOAuth('Apple')}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-[12.5px] font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 disabled:opacity-60 shadow-2xs"
            >
              <span className="text-[15px] leading-none"></span>
              <span>{connectingProvider === 'Apple' ? "Connecting…" : "Continue with Apple"}</span>
            </button>
          </div>

          {/* Don't have an account banner */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50/80 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-bold text-gray-900">
                  Don't have an account?
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-gray-500">
                  Create your free account and get access to the best plots, exclusive offers and project updates.
                </p>
                <Link
                  to={role === 'builder' ? '/signup/builder' : '/signup/buyer'}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-green-700 bg-white px-4 py-2 text-[12.5px] font-bold text-green-800 hover:bg-green-700 hover:text-white transition-colors"
                >
                  <span>Sign Up as {role === 'builder' ? 'Builder' : 'Buyer'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="relative hidden h-20 w-24 shrink-0 sm:block">
                <div className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="absolute bottom-0 left-0 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-green-100">
                  <Building2 className="h-7 w-7 text-green-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 3 Trust Badges */}
          <div className="mt-5 grid grid-cols-3 gap-1 rounded-xl border border-amber-100/80 bg-[#FBF7EE] px-2 py-3.5">
            {[
              { icon: ShieldCheck, text: "100% Verified Projects" },
              { icon: CheckCircle2, text: "No Brokerage Direct Connect" },
              { icon: Headphones, text: "Expert Assistance From Enquiry to Booking" }
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 px-1 text-center">
                <Icon className="h-4 w-4 text-green-700 shrink-0" />
                <span className="text-[10px] font-semibold leading-tight text-gray-700">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[11px] text-gray-400">
            Secure login powered by OnlyPlots.online
          </p>

        </div>

      </div>

    </div>
  );
}
