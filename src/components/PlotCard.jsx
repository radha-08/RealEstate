import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function PlotCard({ plot }) {
  const { isShortlisted, toggleShortlist } = useData();
  const saved = isShortlisted(plot.id);

  // Price formatting
  const priceFormatted = typeof plot.price === 'number'
    ? `₹${plot.price}`
    : plot.price?.startsWith('₹') ? plot.price : `₹${plot.price}`;

  // Badge background color matching Image 2
  const getBadgeStyle = (badge) => {
    if (!badge) return 'bg-[#0B5C2E] text-white';
    const b = badge.toUpperCase();
    if (b.includes('FEATURED')) return 'bg-[#7C3AED] text-white';
    if (b.includes('DTCP')) return 'bg-[#EA580C] text-white';
    if (b.includes('RERA')) return 'bg-[#2563EB] text-white';
    if (b.includes('POPULAR')) return 'bg-[#2563EB] text-white';
    return 'bg-[#0B5C2E] text-white';
  };

  // Approval label
  const approvalLabel = plot.approval || plot.approvals || 'HMDA Approved';
  
  // Type label
  const typeLabel = plot.typeLabel || (
    plot.kind === 'villa' ? 'Villa Plot' :
    plot.kind === 'residential' ? 'Residential Plot' : 'Open Plot'
  );

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs transition-all duration-200 hover:shadow-md hover:border-gray-300">
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <img
          src={plot.image || plot.image_url}
          alt={plot.title || plot.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge on top-left */}
        {plot.badge && (
          <div className="absolute left-3 top-3">
            <span className={`inline-block rounded px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider shadow-xs ${getBadgeStyle(plot.badge)}`}>
              {plot.badge}
            </span>
          </div>
        )}

        {/* Circular Heart Button on top-right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleShortlist(plot.id);
          }}
          aria-label="Save Plot"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur-xs transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              saved ? 'fill-red-500 text-red-500' : 'text-gray-700'
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Title */}
        <Link to={`/plot/${plot.id}`} className="hover:text-green-800 transition-colors">
          <h3 className="text-[16px] font-bold text-gray-950 line-clamp-1">
            {plot.title || plot.name}
          </h3>
        </Link>

        {/* Location */}
        <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          <span className="line-clamp-1">{plot.location}</span>
        </div>

        {/* Specs Row: Area Facing Road */}
        <div className="mt-2.5 flex items-center gap-3 text-xs text-gray-500 font-medium">
          <span>{plot.area || `${plot.plot_area || 200} Sq Yd`}</span>
          <span>{plot.facing || 'West'}</span>
          <span>{plot.road || plot.road_width || '40 Ft'}</span>
        </div>

        {/* Price Row: ₹35000 / Sq Yd */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-[17px] font-extrabold text-[#0B5C2E]">
            {priceFormatted}
          </span>
          <span className="text-xs text-gray-400 font-medium">/ Sq Yd</span>
        </div>

        {/* Tag Pills */}
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          {approvalLabel && (
            <span className="rounded bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700">
              {approvalLabel}
            </span>
          )}
          {typeLabel && (
            <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
              {typeLabel}
            </span>
          )}
        </div>

        {/* Bottom Full-Width Button */}
        <div className="mt-4 pt-1">
          <Link
            to={`/plot/${plot.id}`}
            className="block w-full rounded-lg border border-[#0B5C2E] py-2 text-center text-xs font-bold text-[#0B5C2E] hover:bg-[#0B5C2E] hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
