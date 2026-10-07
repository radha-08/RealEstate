import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeafletMap from '../components/LeafletMap';
import { De } from '../data/images';
import { FD } from '../data/initialData';
import { 
  TrendingUp, 
  MapPin, 
  ArrowRight, 
  Plane, 
  Sparkles, 
  Layers, 
  Building2, 
  Rocket, 
  ShieldCheck 
} from 'lucide-react';

export default function InvestmentZonesPage() {
  const [selectedZone, setSelectedZone] = useState('airport');

  const zones = [
    {
      id: 'airport',
      name: 'Airport Corridor (Tukkuguda – Shamshabad)',
      sub: '5–12 mins from RGIA Airport & ORR Exits 13/14',
      cagr: '24% YoY',
      priceRange: '₹14,000 – ₹22,000 / Sq Yd',
      lat: 17.2185,
      lng: 78.4984,
      catalysts: [
        'Rajiv Gandhi International Airport expansion',
        'Airport Express Metro corridor plan',
        'GMR Aerospace Park & SEZ',
        'Direct ORR 150 Ft radial road connectivity'
      ],
      description: 'The Airport Corridor is Hyderabad’s most coveted plotted real estate zone. Proximity to Rajiv Gandhi International Airport and ORR Exit 14 makes it the primary target for NRI investors and luxury villa community developments.'
    },
    {
      id: 'south',
      name: 'South Growth Belt (Kothur – Shadnagar)',
      sub: 'Bengaluru Highway (NH-44) Industrial & Logistics Spine',
      cagr: '28% YoY',
      priceRange: '₹11,500 – ₹17,000 / Sq Yd',
      lat: 17.1472,
      lng: 78.2917,
      catalysts: [
        'Upcoming Regional Ring Road (RRR) Southern Junction',
        'Symbiosis International University Campus',
        'Amazon Fulfillment Centers & P&G Manufacturing Hub',
        'National Highway 44 6-lane express expansion'
      ],
      description: 'The Kothur-Shadnagar corridor represents the highest volume of approved layout ventures. High institutional activity and rapid logistics industrialization drive steady 20%+ annual capital appreciation.'
    },
    {
      id: 'aerospace',
      name: 'Aerospace & Tech Belt (Adibatla – Bongloor)',
      sub: 'Near Tata Boeing, TCS Adibatla & Hardware Park',
      cagr: '21% YoY',
      priceRange: '₹13,000 – ₹19,500 / Sq Yd',
      lat: 17.2343,
      lng: 78.5866,
      catalysts: [
        'Tata Advanced Systems & Boeing Aerospace facility',
        'TCS Adibatla Global Delivery Campus (15,000+ engineers)',
        'Wonderla Junction & Outer Ring Road Exit 12',
        'Upcoming Foxconn Electronic Manufacturing Park'
      ],
      description: 'Adibatla is synonymous with high-tech aerospace manufacturing and IT services. Plotted communities here cater directly to tech employees and engineering executives looking to build custom bungalows.'
    },
    {
      id: 'future',
      name: 'Future City & Pharma SEZ (Yacharam – Mucherla)',
      sub: 'Megaproject Hub & Green Greenfield Urban Smart City',
      cagr: '32% YoY',
      priceRange: '₹8,500 – ₹14,000 / Sq Yd',
      lat: 17.0543,
      lng: 78.6834,
      catalysts: [
        'Government of Telangana Megaproject: Hyderabad Future City',
        'Proposed Young India Skills University Campus',
        'World-class AI & Healthcare research clusters',
        'Srisailam Highway Greenfield 300 Ft Expressway'
      ],
      description: 'Future City is envisioned as Hyderabad’s next-generation greenfield smart city. Early plot investors in Yacharam, Kadthal, and Mucherla stand to benefit from landmark government infrastructure allocations.'
    }
  ];

  const current = zones.find(z => z.id === selectedZone) || zones[0];

  const mapMarkers = zones.map(z => ({
    lat: z.lat,
    lng: z.lng,
    title: z.name,
    subtitle: z.priceRange,
    price: z.cagr
  }));

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[260px] md:h-[300px] overflow-hidden">
        <img
          src={De.map}
          alt="Investment Zones Map"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04160d]/90 via-[#04160d]/75 to-[#04160d]/40" />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-4 sm:px-6">
          <span className="mb-2 w-fit rounded-lg bg-green-600 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white">
            Market Intelligence
          </span>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Investment Zones
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-200 max-w-2xl">
            Explore top investment corridors and high-growth zones for verified open plots across Hyderabad.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
        
        {/* Corridors Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone.id)}
              className={`rounded-2xl p-4 text-left border transition-all ${
                selectedZone === zone.id
                  ? 'border-green-600 bg-white shadow-md ring-2 ring-green-600/20'
                  : 'border-gray-200 bg-white/70 hover:bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-green-700">
                  {zone.cagr}
                </span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="mt-2 text-sm font-black text-gray-950 line-clamp-1">
                {zone.name.split('(')[0]}
              </h3>
              <p className="mt-1 text-[11px] font-semibold text-gray-500">
                {zone.priceRange}
              </p>
            </button>
          ))}
        </div>

        {/* Detailed Zone Analysis Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-xs">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-green-600">
                    Growth Corridor Profile
                  </span>
                  <h2 className="text-2xl font-black text-gray-950 mt-1">
                    {current.name}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">{current.sub}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-green-700">{current.cagr}</div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Projected Return</div>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-gray-700">
                {current.description}
              </p>

              {/* Infrastructure Catalysts */}
              <div className="mt-6 rounded-2xl bg-gray-50 p-5 border border-gray-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-800 mb-3 flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-green-600" />
                  Key Infrastructure Drivers
                </h4>
                <ul className="space-y-2">
                  {current.catalysts.map((cat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-600 shrink-0" />
                      <span>{cat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex gap-3">
                <Link
                  to={`/buy-plots?q=${encodeURIComponent(current.name.split('(')[0].trim())}`}
                  className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-xs font-black text-white hover:bg-green-700 transition-colors shadow-sm"
                >
                  <span>View Verified Plots in this Zone</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive Corridors Map */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-black text-gray-950 mb-1">
                Regional Corridors Map
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Pins indicate major plotted layout clusters across Outer Ring Road (ORR) and Regional Ring Road (RRR).
              </p>
              <LeafletMap
                center={[current.lat, current.lng]}
                zoom={11}
                markers={mapMarkers}
                className="h-[380px] w-full rounded-xl"
              />
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
