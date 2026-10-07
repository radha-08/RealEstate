import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { YM } from '../data/initialData';

export default function LegalPage({ type = 'privacy-policy' }) {
  const doc = YM[type] || YM['privacy-policy'];

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-black text-gray-950 sm:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Last updated: September 2025
        </p>

        <p className="mt-4 text-base leading-relaxed text-gray-700">
          {doc.description}
        </p>

        <div className="mt-10 space-y-8">
          {doc.sections.map((sec, index) => (
            <section key={index} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
              <h2 className="text-base font-black text-gray-950">
                {index + 1}. {sec.h}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                {sec.p}
              </p>
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
