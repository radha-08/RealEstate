import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlotCard from '../components/PlotCard';
import { useData } from '../context/DataContext';
import { Search, SlidersHorizontal, ShieldCheck, X, RotateCcw } from 'lucide-react';

export default function ListingsPage({ category = 'buy-plots' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const appParam = searchParams.get('approval') || 'Any';
  const faceParam = searchParams.get('facing') || 'Any';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedApproval, setSelectedApproval] = useState(appParam);
  const [selectedFacing, setSelectedFacing] = useState(faceParam);

  const { listings } = useData();

  // Sync state if URL search params change
  useEffect(() => {
    if (searchParams.get('q') !== null) {
      setSearchQuery(searchParams.get('q') || '');
    }
    if (searchParams.get('approval')) {
      setSelectedApproval(searchParams.get('approval'));
    }
    if (searchParams.get('facing')) {
      setSelectedFacing(searchParams.get('facing'));
    }
  }, [searchParams]);

  const approvalOptions = ['Any', 'HMDA', 'DTCP', 'RERA'];
  const facingOptions = [
    { id: 'Any', label: 'Any' },
    { id: 'East', label: 'East Facing' },
    { id: 'North', label: 'North Facing' },
    { id: 'West', label: 'West Facing' },
    { id: 'South', label: 'South Facing' },
    { id: 'Corner', label: 'Corner Plot' }
  ];

  const filteredListings = useMemo(() => {
    let result = [...listings];

    // Category filtering
    if (category === 'villa-plots') {
      result = result.filter(p => p.kind === 'villa' || (p.title && p.title.toLowerCase().includes('villa')) || (p.typeLabel && p.typeLabel.toLowerCase().includes('villa')));
    } else if (category === 'residential-plots') {
      result = result.filter(p => p.kind === 'residential' || (p.typeLabel && p.typeLabel.toLowerCase().includes('residential')));
    }

    // Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const title = (p.title || p.name || '').toLowerCase();
        const loc = (p.location || '').toLowerCase();
        const areaLoc = (p.area_locality || '').toLowerCase();
        const city = (p.city || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        const app = (p.approval || p.approvals || '').toLowerCase();
        const face = (p.facing || '').toLowerCase();
        const type = (p.typeLabel || p.kind || '').toLowerCase();
        const badge = (p.badge || '').toLowerCase();
        const price = String(p.price || p.priceNum || '');
        const area = String(p.area || p.plot_area || '');

        return (
          title.includes(q) ||
          loc.includes(q) ||
          areaLoc.includes(q) ||
          city.includes(q) ||
          desc.includes(q) ||
          app.includes(q) ||
          face.includes(q) ||
          type.includes(q) ||
          badge.includes(q) ||
          price.includes(q) ||
          area.includes(q)
        );
      });
    }

    // Approval filtering
    if (selectedApproval !== 'Any') {
      result = result.filter(p => {
        const app = (p.approval || p.approvals || p.badge || '').toUpperCase();
        return app.includes(selectedApproval.toUpperCase());
      });
    }

    // Facing filtering
    if (selectedFacing !== 'Any') {
      result = result.filter(p => {
        const face = (p.facing || '').toLowerCase();
        return face.includes(selectedFacing.toLowerCase());
      });
    }

    return result;
  }, [listings, category, searchQuery, selectedApproval, selectedFacing]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedApproval !== 'Any' || selectedFacing !== 'Any';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedApproval('Any');
    setSelectedFacing('Any');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Main Content Area: Left Sidebar is FIXED on the left side, matching Image 2 */}
        <main className="mx-auto max-w-[1440px] px-4 sm:px-6 py-6">
          <div className="flex flex-row gap-6 items-start">
            
            {/* Left Filter Sidebar - Always on Left Side */}
            <aside className="w-[220px] shrink-0">
              <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                    <SlidersHorizontal className="h-4 w-4 text-emerald-700" />
                    <span>Filters</span>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={resetAllFilters}
                      className="text-[11px] font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                      title="Clear all filters"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* SEARCH Section */}
                <div className="mb-5">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    SEARCH
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Location or name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-8 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* APPROVAL Section */}
                <div className="mb-5">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    APPROVAL
                  </label>
                  <div className="flex flex-col gap-1">
                    {approvalOptions.map((app) => (
                      <button
                        key={app}
                        onClick={() => setSelectedApproval(app)}
                        className={`w-full rounded-xl px-3.5 py-2 text-left text-xs font-semibold transition-colors cursor-pointer ${
                          selectedApproval === app
                            ? 'bg-[#E8F8EE] text-[#0B5C2E]'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FACING Section */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    FACING
                  </label>
                  <div className="flex flex-col gap-1">
                    {facingOptions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedFacing(item.id)}
                        className={`w-full rounded-xl px-3.5 py-2 text-left text-xs font-semibold transition-colors cursor-pointer ${
                          selectedFacing === item.id
                            ? 'bg-[#E8F8EE] text-[#0B5C2E]'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

            {/* Right Plot Listings Grid */}
            <section className="flex-1 min-w-0">
              {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredListings.map((plot) => (
                    <PlotCard key={plot.id} plot={plot} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                  <ShieldCheck className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-3 text-base font-bold text-gray-900">
                    No plots match your filters
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Try selecting different approval or facing options, or clearing your search.
                  </p>
                  <button
                    onClick={resetAllFilters}
                    className="mt-4 rounded-xl bg-[#0B5C2E] px-4 py-2 text-xs font-bold text-white hover:bg-[#084824] transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </section>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
