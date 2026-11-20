import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { siteConfig, type ServicePlan } from "../config/siteConfig";
import { WhopCheckoutModal } from "../components/WhopCheckoutModal";
import { EstimateForm } from "../components/EstimateForm";
import { AdminInvoiceDemo } from "../components/AdminInvoiceDemo";

export const Route = createFileRoute("/")({
  component: RoofingStorefrontPage,
});

function RoofingStorefrontPage() {
  const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Emergency & License Bar */}
      <div className="bg-slate-950 px-4 py-2 text-xs text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <span>
            🛡️ Licensed & Insured ({siteConfig.company.licenseNumber}) · Serving{" "}
            {siteConfig.serviceAreas.metro}
          </span>
          <a
            href={`tel:${siteConfig.company.phone}`}
            className="font-bold text-amber-400 hover:underline"
          >
            24/7 Storm Tarping & Dispatch: {siteConfig.company.phone}
          </a>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 font-black text-slate-950">
              ▲
            </div>
            <div>
              <span className="block text-base font-extrabold tracking-tight text-slate-900">
                {siteConfig.company.shortName}
              </span>
              <span className="block text-[11px] font-medium text-slate-500">
                Roofing & Exteriors
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#services" className="hover:text-slate-900">
              Transparent Pricing
            </a>
            <a href="#how-it-works" className="hover:text-slate-900">
              Deposit & Billing Flow
            </a>
            <a href="#reviews" className="hover:text-slate-900">
              Homeowner Reviews
            </a>
            <a href="#service-area" className="hover:text-slate-900">
              Service Areas
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSelectedPlan(siteConfig.plans[0])}
              className="hidden rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 sm:inline-block"
            >
              Book $149 Inspection
            </button>
            <a
              href="#free-estimate"
              className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-sm hover:bg-amber-400"
            >
              Free Estimate
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
              <span>★ 4.9/5 Rating (340+ Central Texas Roofs)</span>
              <span>·</span>
              <span>GAF Master Elite® Certified</span>
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:leading-[1.12]">
              Storm-Ready Roofs Built to Outlast Texas Hail.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Book a 21-point drone & thermal roof inspection online, lock in your replacement
              crew with a $500 deposit, and pay your final balance only after walkthrough approval—
              with flexible financing via Klarna, Afterpay, or ACH.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <button
                onClick={() => setSelectedPlan(siteConfig.plans[0])}
                className="rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:bg-amber-400"
              >
                Book $149 Drone Inspection
              </button>
              <button
                onClick={() => setSelectedPlan(siteConfig.plans[2])}
                className="rounded-xl border border-slate-600 bg-slate-800/80 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Pay $500 Project Deposit
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-800 pt-6 text-xs">
              <div>
                <span className="block text-xl font-black text-white">
                  {siteConfig.company.warrantyYears} Yrs
                </span>
                <span className="text-slate-400">Workmanship Warranty</span>
              </div>
              <div>
                <span className="block text-xl font-black text-white">1-Day</span>
                <span className="text-slate-400">Most Replacements Done</span>
              </div>
              <div>
                <span className="block text-xl font-black text-white">$0 Down</span>
                <span className="text-slate-400">BNPL Options at Checkout</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <EstimateForm />
          </div>
        </div>
      </section>

      {/* Transparent Upfront Services & Embedded Whop Checkout Triggers */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Upfront Online Booking & Deposits
          </span>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
            Book Inspections, Flat-Rate Repairs, or Lock Your Crew Date
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Every payment runs through our embedded Whop checkout supporting Apple Pay, Google
            Pay, Cards, ACH, and Buy Now Pay Later.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {siteConfig.plans.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col justify-between rounded-3xl border p-7 shadow-sm transition hover:shadow-lg ${
                plan.isDeposit
                  ? "border-amber-400 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              <div>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                    plan.isDeposit
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {plan.badge}
                </span>
                <h3 className="mt-4 text-xl font-extrabold">{plan.title}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.priceDisplay}</span>
                  <span
                    className={`text-xs ${
                      plan.isDeposit ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {plan.isDeposit ? "credited to final balance" : "flat rate"}
                  </span>
                </div>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    plan.isDeposit ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {plan.description}
                </p>
                <ul className="mt-5 space-y-2.5 text-xs">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="font-bold text-amber-500">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedPlan(plan)}
                className={`mt-8 w-full rounded-xl py-3.5 text-sm font-extrabold transition ${
                  plan.isDeposit
                    ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {plan.ctaLabel}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Two-Stage Deposit -> Final Invoice Explanation + Contractor Console */}
      <section id="how-it-works" className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Homeowner Protection Guarantee
          </span>
          <h2 className="mt-1 text-3xl font-black">
            How Our Two-Stage Roof Replacement Billing Works
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <span className="font-mono text-xs font-bold text-amber-400">STAGE 01</span>
              <h3 className="mt-2 text-lg font-bold">$500 Deposit & Card Vaulting</h3>
              <p className="mt-2 text-sm text-slate-400">
                Pay $500 online to lock shingle pricing and schedule delivery. Your payment method
                is securely stored via Whop Setup Intent—never on our servers.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <span className="font-mono text-xs font-bold text-amber-400">STAGE 02</span>
              <h3 className="mt-2 text-lg font-bold">Tear-Off, Dry-In & Installation</h3>
              <p className="mt-2 text-sm text-slate-400">
                Our certified crew installs synthetic underlayment, ice/water shield, ridge vents,
                and architectural shingles—completing a 3-pass magnetic nail sweep.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <span className="font-mono text-xs font-bold text-amber-400">STAGE 03</span>
              <h3 className="mt-2 text-lg font-bold">Final Walkthrough & Balance Invoice</h3>
              <p className="mt-2 text-sm text-slate-400">
                Only after you sign off on the drone completion photos do we issue your final Whop
                Invoice—charging your card on file or letting you split via Klarna/ACH.
              </p>
            </div>
          </div>

          <AdminInvoiceDemo />
        </div>
      </section>

      {/* Social Proof / Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-black tracking-tight text-slate-900">
          Trusted by Central Texas Homeowners
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {siteConfig.reviews.map((rev) => (
            <div
              key={rev.author}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-sm text-amber-500">★★★★★</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">"{rev.quote}"</p>
              <div className="mt-4 border-t border-slate-100 pt-3">
                <span className="block text-sm font-bold text-slate-900">{rev.author}</span>
                <span className="block text-xs text-slate-500">
                  {rev.location} · {rev.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Local Service Areas Footer */}
      <footer id="service-area" className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {siteConfig.company.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {siteConfig.company.tagline} · License #{siteConfig.company.licenseNumber}
              </p>
              <p className="mt-3 text-xs text-slate-600">
                <strong>Cities Served:</strong> {siteConfig.serviceAreas.cities.join(" · ")}
              </p>
            </div>
            <div className="text-xs text-slate-500 md:text-right">
              <p className="font-bold text-slate-900">{siteConfig.company.phone}</p>
              <p>{siteConfig.company.email}</p>
              <p className="mt-2">Payments & Invoicing Powered by Whop</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Embedded Whop Checkout Modal */}
      <WhopCheckoutModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </div>
  );
}
