import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { De } from '../data/images';
import { 
  ShieldCheck, 
  Target, 
  Users, 
  TrendingUp, 
  Award, 
  Building2, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: "Verified Plots Listed", value: "1,500+" },
    { label: "Approved Layouts", value: "45+" },
    { label: "Active Plot Buyers", value: "12,000+" },
    { label: "Buyer Brokerage", value: "₹0 Free" }
  ];

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-gray-900">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[280px] md:h-[320px] overflow-hidden">
        <img
          src={De.entrance}
          alt="About OnlyPlots"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04160d]/90 via-[#04160d]/75 to-[#04160d]/45" />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-4 sm:px-6">
          <span className="mb-2 w-fit rounded-lg bg-green-600 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white">
            Our Mission
          </span>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            About OnlyPlots.online
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-200 max-w-xl">
            India's dedicated marketplace for open plots, villa plots and residential plots — verified listings, transparent deals.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-green-700">
              Why We Built OnlyPlots
            </span>
            <h2 className="mt-2 text-3xl font-black text-gray-950">
              Only Plots. No Distractions.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Buying land is one of the most high-value decisions in India, yet the major real estate platforms treat open plots as an afterthought — burying them under thousands of multi-story flats, commercial leases, and rental rooms.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              We started <strong className="text-gray-900">OnlyPlots.online</strong> with a singular mission: build the most trusted, frictionless, and transparent platform dedicated exclusively to plotted real estate.
            </p>

            <div className="mt-6 space-y-3 text-xs font-bold text-gray-800">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-green-600 shrink-0" />
                <span>Zero spam, zero fake listings, and no unapproved agricultural fragmentation.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-green-600 shrink-0" />
                <span>Transparent Layout Permits (LP numbers) verified directly against Master Plans.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-green-600 shrink-0" />
                <span>Direct developer connectivity with zero buyer commissions.</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
            <img
              src={De.villa}
              alt="Plotted Layout Enclave"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-lg font-black">Strict Verification Protocol</h3>
              <p className="text-xs text-gray-200 mt-1">
                Every layout is vetted for HMDA/DTCP sanctions, RERA registration, and 30-year clean titles before publication.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="rounded-3xl bg-[#04160d] p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl md:text-5xl font-black text-green-400">
                  {s.value}
                </div>
                <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars Section */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-green-700">
              Core Commitments
            </span>
            <h2 className="mt-2 text-3xl font-black text-gray-950">
              The Four Pillars of OnlyPlots
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
              <ShieldCheck className="h-8 w-8 text-green-600" />
              <h3 className="mt-4 text-base font-black text-gray-950">Title Clarity</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Independent advocate legal checks ensure all listed plots hold encumbrance-free freehold titles.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
              <Target className="h-8 w-8 text-green-600" />
              <h3 className="mt-4 text-base font-black text-gray-950">No Distractions</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                100% plotted inventory. You will never see apartment towers or rental classifieds on our platform.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <h3 className="mt-4 text-base font-black text-gray-950">Growth Corridors</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                We focus on high-ROI infrastructure belts: Regional Ring Road (RRR), Airport Corridor, and Future City.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
              <Users className="h-8 w-8 text-green-600" />
              <h3 className="mt-4 text-base font-black text-gray-950">Direct Promoter Deals</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Connect directly with certified layout owners for clear pricing and transparent booking tokens.
              </p>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
