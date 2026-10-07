import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmiCalculator from '../components/EmiCalculator';
import { De } from '../data/images';
import { 
  FileText, 
  CheckSquare, 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  Download, 
  Calculator,
  AlertCircle
} from 'lucide-react';

export default function ResourcesPage() {
  const [checkedItems, setCheckedItems] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  const legalSteps = [
    {
      id: 1,
      title: "30-Year Encumbrance Certificate (EC)",
      desc: "Ensure the plot has a Nil Encumbrance Certificate (EC) for at least the past 30 years, verified via the Registration & Stamps Department (IGR)."
    },
    {
      id: 2,
      title: "Approved Layout Sanction (HMDA / DTCP / RERA)",
      desc: "Verify the official Layout Permit (LP Number) and ensure the plot is not located in reserved open space, public park, or utility area."
    },
    {
      id: 3,
      title: "Title Deed Flow & Link Documents",
      desc: "Scrutinize the chain of ownership deeds from the original agricultural owner to the current developer to ensure unbroken chain of title."
    },
    {
      id: 4,
      title: "NALA (Non-Agricultural Land Conversion)",
      desc: "Confirm that the agricultural land was legally converted to Non-Agricultural land via the Revenue Department with paid NALA challan."
    },
    {
      id: 5,
      title: "RERA Project Registration",
      desc: "For ventures larger than 500 sq meters or exceeding 8 plots, check that the project is registered on the state RERA portal."
    },
    {
      id: 6,
      title: "Physical Demarcation & Survey Stones",
      desc: "Visit the site to verify clear boundary boundary stones, accurate square yard dimensions, and adherence to master road widths."
    },
    {
      id: 7,
      title: "Master Plan Zone Clearance",
      desc: "Ensure the layout does not fall under Master Plan Green Belt, Bio-conservation zone, water body buffer (FTL), or Defense corridor."
    },
    {
      id: 8,
      title: "Bank Approval / APF Number",
      desc: "Ask if leading nationalized banks (SBI, HDFC) have granted an Approved Project Financial (APF) code for plot mortgage loans."
    }
  ];

  const faqs = [
    {
      q: "What is the key difference between HMDA and DTCP layouts?",
      a: "HMDA (Hyderabad Metropolitan Development Authority) governs urban layout approvals within the 7,257 sq km Hyderabad metropolitan limits with strict 100 ft/60 ft minimum roads and underground infrastructure. DTCP (Directorate of Town and Country Planning) oversees areas beyond HMDA boundaries with standard planning guidelines."
    },
    {
      q: "Why is RERA mandatory for open plot layouts?",
      a: "Under the Real Estate (Regulation and Development) Act, any layout project with an area exceeding 500 sq meters must be registered with RERA. This prevents illegal unapproved plotting and protects buyers against delayed infrastructure delivery."
    },
    {
      q: "How are open plot areas calculated in Hyderabad?",
      a: "Plot areas in Hyderabad and Telangana are traditionally measured in Square Yards (Sq Yds). 1 Square Yard = 9 Square Feet. For instance, a 200 Sq Yd plot equals 1,800 Square Feet."
    },
    {
      q: "Can I get a bank loan for purchasing an open plot?",
      a: "Yes! Nationalized and private banks (SBI, HDFC, ICICI, Bank of Baroda) offer plot purchase loans up to 75-80% of the agreement value for approved HMDA/DTCP layouts with clear legal title."
    },
    {
      q: "What is NALA conversion and why is it mandatory?",
      a: "NALA stands for Non-Agricultural Land Assessment. Converting agricultural land to residential layout requires official government permission and fee payment. Unconverted plots cannot be legally registered for home construction."
    }
  ];

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-gray-900">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[240px] md:h-[280px] overflow-hidden">
        <img
          src={De.grid}
          alt="Resources Grid"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04160d]/90 via-[#04160d]/75 to-[#04160d]/40" />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-4 sm:px-6">
          <span className="mb-2 w-fit rounded-lg bg-green-600 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white">
            Buyer Knowledge Hub
          </span>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Plot Resources & Tools
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-200 max-w-xl">
            Legal checklists, EMI calculators, document verification guides, and expert answers for smart plot investors.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 space-y-12">
        
        {/* Section 1: EMI & Loan Calculator */}
        <div>
          <div className="mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-green-700">Financial Planning</span>
            <h2 className="text-2xl font-black text-gray-950 mt-1">Interactive Plot Loan & EMI Calculator</h2>
          </div>
          <EmiCalculator initialPrice={3000000} />
        </div>

        {/* Section 2: Interactive 8-Step Legal Checklist */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-green-700 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                Due Diligence Toolkit
              </span>
              <h2 className="text-2xl font-black text-gray-950 mt-1">
                8-Point Legal Verification Checklist
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Check off each item before paying an advance token to any layout promoter.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-50 px-4 py-2 text-center border border-green-200">
                <span className="text-xs font-bold text-gray-600 block">Progress</span>
                <span className="text-lg font-black text-green-700">{completedCount} / {legalSteps.length} Verified</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {legalSteps.map((step) => {
              const isDone = !!checkedItems[step.id];
              return (
                <div
                  key={step.id}
                  onClick={() => toggleCheck(step.id)}
                  className={`cursor-pointer rounded-2xl border p-4.5 transition-all ${
                    isDone
                      ? 'border-green-500 bg-green-50/50 shadow-xs'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => {}}
                      className="mt-1 h-5 w-5 rounded-md accent-green-600"
                    />
                    <div>
                      <h4 className={`text-sm font-black ${isDone ? 'text-green-950 line-through' : 'text-gray-900'}`}>
                        {step.id}. {step.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-gray-600">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Frequently Asked Questions */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="mb-6">
            <span className="text-xs font-black uppercase tracking-wider text-green-700">Buyer FAQ</span>
            <h2 className="text-2xl font-black text-gray-950 mt-1">Frequently Asked Questions</h2>
            <p className="text-xs text-gray-500 mt-0.5">Common questions answered by real estate advocates and layout planners.</p>
          </div>

          <div className="divide-y divide-gray-100">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="text-sm font-black text-gray-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180 text-green-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="mt-3 text-xs leading-relaxed text-gray-600 pr-6">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
