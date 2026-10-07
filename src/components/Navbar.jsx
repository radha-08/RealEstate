import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  LayoutDashboard, 
  ChevronDown,
  Menu,
  X,
  User
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthed, user, logout } = useAuth();

  const navLinks = [
    { label: "Buy Plots", to: "/buy-plots", hasDrop: true },
    { label: "Villa Plots", to: "/villa-plots", hasDrop: true },
    { label: "Residential Plots", to: "/residential-plots", hasDrop: true },
    { label: "Investment Zones", to: "/investment-zones", hasDrop: true },
    { label: "Resources", to: "/resources", hasDrop: true },
    { label: "About Us", to: "/about", hasDrop: false }
  ];

  const getDashboardLink = () => {
    if (!user) return "/dashboard";
    if (user.role === "builder") return "/seller";
    if (user.role === "admin") return "/admin";
    return "/dashboard";
  };

  const getInitials = () => {
    const name = user?.name || user?.email?.split('@')[0] || '';
    if (!name) return 'VR';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white shadow-2xs">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-4 sm:px-6">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="leading-tight">
            <div className="text-2xl font-black tracking-tight flex items-center">
              <span className="text-gray-950">Only</span>
              <span className="text-[#0B5C2E]" style={{ color: '#0B5C2E' }}>Plots</span>
              <span 
                className="ml-1.5 inline-block -translate-y-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: '#0B5C2E' }}
              >
                .online
              </span>
            </div>
            <p className="text-[10px] font-medium text-gray-500 tracking-wide">
              Only Plots. No Distractions.
            </p>
          </div>
        </Link>

        {/* Center Nav Links with dropdown carets */}
        <nav className="hidden xl:flex items-center gap-1 font-medium text-[13.5px]">
          {navLinks.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`flex items-center gap-1 rounded-lg px-3 py-2 transition-colors ${
                  active
                    ? "font-bold text-[#0B5C2E]"
                    : "text-gray-700 hover:text-black hover:bg-gray-50"
                }`}
                style={active ? { color: '#0B5C2E' } : {}}
              >
                <span>{link.label}</span>
                {link.hasDrop && <ChevronDown className="h-3.5 w-3.5 text-gray-500" />}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Clean, Single Dashboard button + User Profile + Logout */}
        <div className="flex items-center gap-3">
          {isAuthed ? (
            <>
              {/* Single Elegant Dashboard Button */}
              <Link
                to={getDashboardLink()}
                className="flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-all hover:opacity-95"
                style={{ backgroundColor: '#0B5C2E', color: '#ffffff' }}
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Dashboard</span>
              </Link>

              {/* User Profile Chip with Avatar Initials */}
              <Link 
                to={getDashboardLink()} 
                title={`Logged in as ${user?.name || user?.email || 'User'}`}
                className="flex items-center gap-2 rounded-full border border-gray-200/90 bg-gray-50/80 py-1 pl-1 pr-3 hover:bg-gray-100 transition-colors shadow-2xs"
              >
                <div 
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-xs shrink-0"
                  style={{ backgroundColor: '#E02424', color: '#ffffff' }}
                >
                  {getInitials()}
                </div>
                <span className="text-xs font-bold text-gray-800 max-w-[110px] truncate hidden sm:inline">
                  {user?.name || user?.email?.split('@')[0] || 'User'}
                </span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-semibold text-gray-700 hover:text-black px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup/buyer"
                className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:opacity-95"
                style={{ backgroundColor: '#0B5C2E', color: '#ffffff' }}
              >
                <span>Sign Up</span>
              </Link>
            </>
          )}

          {/* Mobile Menu Hamburger (Visible on small screens only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden rounded-xl p-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer ml-1"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2 animate-in fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <span>{link.label}</span>
              {link.hasDrop && <ChevronDown className="h-3 w-3 text-gray-400" />}
            </Link>
          ))}
          
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between px-3">
            {isAuthed ? (
              <>
                <div className="flex items-center gap-2">
                  <div 
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ backgroundColor: '#E02424', color: '#ffffff' }}
                  >
                    {getInitials()}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-[10px] text-gray-500">{user?.email || ''}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="text-xs font-semibold text-red-600 flex items-center gap-1 py-1"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 w-full">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-bold text-gray-700 bg-gray-100 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/signup/buyer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-bold text-white rounded-xl"
                  style={{ backgroundColor: '#0B5C2E' }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
