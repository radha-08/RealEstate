import React, { useState } from 'react';
import { Calculator, IndianRupee, PieChart, ShieldAlert } from 'lucide-react';

export default function EmiCalculator({ initialPrice = 2500000 }) {
  const [plotPrice, setPlotPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(15);

  const downPayment = (plotPrice * downPaymentPercent) / 100;
  const loanAmount = plotPrice - downPayment;

  // Monthly Interest Rate
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  // EMI Formula
  const monthlyEmi = monthlyRate > 0 && totalMonths > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0;

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-gray-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-black text-gray-950">
            Plot Loan & EMI Calculator
          </h3>
          <p className="text-xs text-gray-500">
            Calculate your monthly repayment based on plot purchase value
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Sliders Form */}
        <div className="space-y-5">
          {/* Total Plot Cost */}
          <div>
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
              <span>Total Plot Cost</span>
              <span className="text-green-700 font-extrabold">₹{plotPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={500000}
              max={15000000}
              step={50000}
              value={plotPrice}
              onChange={(e) => setPlotPrice(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-[10.5px] text-gray-400 mt-1">
              <span>₹5 Lakh</span>
              <span>₹1.5 Crore</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="text-gray-900 font-extrabold">₹{Math.round(downPayment).toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-[10.5px] text-gray-400 mt-1">
              <span>10% (Min)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
              <span>Interest Rate (p.a.)</span>
              <span className="text-gray-900 font-extrabold">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={7.0}
              max={13.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-[10.5px] text-gray-400 mt-1">
              <span>7.0% (SBI/HDFC)</span>
              <span>13.0%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
              <span>Loan Tenure</span>
              <span className="text-gray-900 font-extrabold">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min={3}
              max={25}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-[10.5px] text-gray-400 mt-1">
              <span>3 Years</span>
              <span>25 Years</span>
            </div>
          </div>
        </div>

        {/* Calculation Result Card */}
        <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50/50 p-6 border border-green-200/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-green-700">
            Estimated Monthly Repayment
          </span>

          <div className="mt-2 text-3xl font-black text-gray-950 flex items-baseline gap-1">
            <span>₹{Math.round(monthlyEmi).toLocaleString('en-IN')}</span>
            <span className="text-xs font-semibold text-gray-500">/ month</span>
          </div>

          <div className="mt-6 space-y-3 pt-4 border-t border-green-200/60 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Principal Loan Amount:</span>
              <span className="font-bold text-gray-900">₹{Math.round(loanAmount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Interest Payable:</span>
              <span className="font-bold text-green-800">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount Payable:</span>
              <span className="font-bold text-gray-950">₹{Math.round(totalPayment).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Visual Bar */}
          <div className="mt-6">
            <div className="h-2.5 w-full rounded-full bg-gray-200 overflow-hidden flex">
              <div
                style={{ width: `${(loanAmount / totalPayment) * 100}%` }}
                className="bg-green-600 h-full"
                title="Principal"
              />
              <div
                style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                className="bg-emerald-300 h-full"
                title="Interest"
              />
            </div>
            <div className="mt-2 flex justify-between text-[10.5px] font-medium text-gray-500">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-600 inline-block" />
                Principal ({Math.round((loanAmount / totalPayment) * 100)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-300 inline-block" />
                Interest ({Math.round((totalInterest / totalPayment) * 100)}%)
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-white p-3 text-[11px] text-gray-600 border border-green-100 flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
            <span>Bank loans for HMDA/DTCP/RERA approved plots are available from SBI, HDFC, ICICI, and Axis Bank.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
