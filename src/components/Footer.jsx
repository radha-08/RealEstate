import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const categories = [
    { label: "Buy Plots", to: "/buy-plots" },
    { label: "Villa Plots", to: "/villa-plots" },
    { label: "Residential Plots", to: "/residential-plots" },
    { label: "Investment Zones", to: "/investment-zones" },
    { label: "Resources & Calculator", to: "/resources" },
    { label: "About Us", to: "/about" },
    { label: "Contact Support", to: "/contact" }
  ];

  const locations = [
    { label: "Kothur Plots", to: "/buy-plots?q=Kothur" },
    { label: "Shadnagar Plots", to: "/buy-plots?q=Shadnagar" },
    { label: "Tukkuguda Airport Corridor", to: "/buy-plots?q=Tukkuguda" },
    { label: "Maheshwaram Plots", to: "/buy-plots?q=Maheshwaram" },
    { label: "Adibatla Aerospace Belt", to: "/buy-plots?q=Adibatla" },
    { label: "Yacharam Pharma Zone", to: "/buy-plots?q=Yacharam" }
  ];

  return (
    <footer className="border-t border-gray-200 bg-[#061b11] text-gray-300">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="text-2xl font-black tracking-tight flex items-center">
                <span className="text-white">Only</span>
                <span className="text-green-400">Plots</span>
                <span className="ml-1.5 rounded bg-green-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  .online
                </span>
              </div>
              <p className="text-[11px] font-medium text-green-200/60 mt-1">
                Only Plots. No Distractions.
              </p>
            </Link>

            <p className="text-[13.5px] leading-relaxed text-gray-300">
              India's first dedicated open plot marketplace. Verified layout approvals (HMDA, DTCP, RERA), direct developer pricing, and high appreciation growth corridors.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-[12.5px] text-green-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-400 shrink-0" />
                <span>100% Verified Legal Documents</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                <span>Zero Brokerage on Direct Builder Plots</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Explore Plots
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.label}>
                  <Link
                    to={c.to}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Corridors */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Growth Corridors
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {locations.map((loc) => (
                <li key={loc.label}>
                  <Link
                    to={loc.to}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {loc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact & Support
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-green-400 mt-1 shrink-0" />
                <span>Hyderabad, Telangana, India 500081</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-green-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-green-400 shrink-0" />
                <span>support@onlyplots.online</span>
              </li>
            </ul>

            <div className="mt-6 rounded-xl bg-white/5 p-4 border border-white/10">
              <p className="text-xs text-gray-300">
                Are you a Builder or Layout Developer?
              </p>
              <Link
                to="/list-plot"
                className="mt-2 inline-block rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-500 transition-colors"
              >
                List Your Layout Now
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © 2025 OnlyPlots.online — All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-green-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-green-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="hover:text-green-400 transition-colors">
              Refund Policy
            </Link>
          </div>

          <div className="text-green-400/80 font-medium">
            Made with care for Plot Buyers in India 🇮🇳
          </div>
        </div>
      </div>
    </footer>
  );
}
