import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { trackWhopEvent } from "../lib/whopAnalytics";

export function EstimateForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("78704");
  const [serviceType, setServiceType] = useState("Full Roof Replacement");
  const [roofAge, setRoofAge] = useState("10-15 years");
  const [insuranceClaim, setInsuranceClaim] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [leadResult, setLeadResult] = useState<{ leadId?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inServiceArea = siteConfig.serviceAreas.zipCodes.includes(zipCode.trim());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          address,
          zipCode,
          serviceType,
          roofAge,
          insuranceClaim,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to submit estimate request.");
      }

      trackWhopEvent("estimate_requested", {
        service_type: serviceType,
        zip_code: zipCode,
        roof_age: roofAge,
        insurance_claim: insuranceClaim,
        whop_lead_id: data.leadId,
      });

      setLeadResult({ leadId: data.leadId });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      id="free-estimate"
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Same-Day Satellite Roof Measurement
          </span>
          <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
            Request Your Free Written Estimate
          </h3>
        </div>
        <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 sm:inline-block">
          Synced to Whop CRM
        </span>
      </div>

      {leadResult ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h4 className="text-lg font-bold text-emerald-950">
            Estimate Request Received & Synced to Whop Leads
          </h4>
          <p className="mt-2 text-sm text-emerald-900">
            Our senior estimator is pulling EagleView satellite measurements for{" "}
            <strong>{address}</strong> ({zipCode}). We will call or text{" "}
            <strong>{phone}</strong> within 2 business hours.
          </p>
          {leadResult.leadId && (
            <p className="mt-3 font-mono text-xs text-emerald-800">
              Whop Lead Record ID: {leadResult.leadId}
            </p>
          )}
          <button
            type="button"
            onClick={() => setLeadResult(null)}
            className="mt-4 rounded-xl bg-emerald-900 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
          >
            Submit Another Property
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Full Name *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Rivera"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(512) 555-0148"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@homeowner.com"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Property ZIP Code *
            </label>
            <input
              type="text"
              required
              maxLength={5}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="78704"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
            />
            {zipCode.length === 5 && (
              <p
                className={`mt-1 text-[11px] font-medium ${
                  inServiceArea ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {inServiceArea
                  ? "✓ Core Central Texas dispatch zone — 24hr turnaround"
                  : "Extended metro zone — our estimator will confirm availability"}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700">
              Property Street Address *
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="2108 South Congress Ave, Austin, TX"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Project Scope</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
            >
              <option>Full Roof Replacement</option>
              <option>Hail / Wind Storm Damage Repair</option>
              <option>Active Roof Leak & Flashing Repair</option>
              <option>Standing-Seam Metal Upgrade</option>
              <option>Commercial Flat / TPO Roof</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Approximate Roof Age
            </label>
            <select
              value={roofAge}
              onChange={(e) => setRoofAge(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
            >
              <option>Under 5 years</option>
              <option>5-10 years</option>
              <option>10-15 years</option>
              <option>15+ years / Unknown</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={insuranceClaim}
                onChange={(e) => setInsuranceClaim(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-amber-600"
              />
              This project involves a homeowners insurance storm/hail claim
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700">
              Notes (Visible leaks, shingle type, gate code)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Water stain spotted near upstairs skylight after Tuesday storm..."
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 sm:col-span-2">
              {error}
            </div>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-60"
            >
              {submitting ? "Syncing Lead to Whop CRM..." : "Get My Free Roof Estimate →"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
