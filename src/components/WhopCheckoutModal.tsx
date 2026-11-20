import React, { useEffect, useState } from "react";
import { loadWhop } from "@whop/elements";
import {
  WhopElements,
  Checkout,
  CheckoutElement,
  ExpressCheckoutElement,
  Payments,
  BrandingElement,
} from "@whop/elements-react";
import type { ServicePlan } from "../config/siteConfig";
import { trackWhopEvent } from "../lib/whopAnalytics";

const whopPromise = loadWhop();

interface WhopCheckoutModalProps {
  plan: ServicePlan | null;
  onClose: () => void;
}

export function WhopCheckoutModal({ plan, onClose }: WhopCheckoutModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [saveCardForFinal, setSaveCardForFinal] = useState(true);
  const [checkoutConfigId, setCheckoutConfigId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!plan) return;
    setCheckoutConfigId(null);
    setErrorMsg(null);
    setCompleted(false);
    setSaveCardForFinal(Boolean(plan.isDeposit));

    trackWhopEvent("service_viewed", {
      service_slug: plan.slug,
      service_title: plan.title,
      price_cents: plan.priceCents,
    });
  }, [plan]);

  if (!plan) return null;

  async function handleStartEmbeddedCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!plan) return;
    setLoading(true);
    setErrorMsg(null);

    if (plan.isDeposit) {
      trackWhopEvent("deposit_started", {
        service_slug: plan.slug,
        amount_cents: plan.priceCents,
        save_payment_method: saveCardForFinal,
        customer_email: customerEmail,
      });
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.whopPlanId,
          savePaymentMethod: plan.isDeposit && saveCardForFinal,
          customerEmail,
          customerName,
          metadata: {
            service_slug: plan.slug,
            property_address: propertyAddress,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to initialize Whop checkout.");
      }
      setCheckoutConfigId(data.checkoutConfigurationId);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
              {plan.badge}
            </span>
            <h3 className="mt-1 text-xl font-bold text-slate-900">{plan.title}</h3>
            <p className="text-sm text-slate-500">
              Total Due Today:{" "}
              <strong className="text-slate-900">{plan.priceDisplay}</strong> · Powered by Whop
              Payments
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {completed ? (
          <div className="py-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
              ✓
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Booking & Payment Confirmed!
            </h4>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Thank you, <strong>{customerName || "Homeowner"}</strong>. Your receipt and dispatch
              window have been sent to <strong>{customerEmail}</strong>.
              {plan.isDeposit && saveCardForFinal
                ? " Your payment method is securely vaulted on file for your final completion invoice."
                : ""}
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Return to Apex Shield
            </button>
          </div>
        ) : !checkoutConfigId ? (
          <form onSubmit={handleStartEmbeddedCheckout} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Homeowner Full Name
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Jordan Taylor"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Email for Receipt & Inspection Report
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="jordan@example.com"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Property Street Address & ZIP
              </label>
              <input
                type="text"
                required
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                placeholder="412 Barton Springs Rd, Austin, TX 78704"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {plan.isDeposit && (
              <label className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={saveCardForFinal}
                  onChange={(e) => setSaveCardForFinal(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-600"
                />
                <span>
                  <strong className="text-slate-900">
                    Save payment method on file for Final Completion Invoice
                  </strong>
                  <br />
                  Authorizes Apex Shield to vault this card via Whop Setup Intent so your remaining
                  balance can be settled upon final walkthrough without re-entering card details.
                </span>
              </label>
            )}

            <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
              Supports{" "}
              <strong className="text-slate-800">
                Apple Pay, Google Pay, Cards, ACH Bank Transfer, Klarna & Afterpay
              </strong>{" "}
              directly inside our embedded Whop checkout.
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-400 disabled:opacity-60"
            >
              {loading
                ? "Initializing Secure Whop Checkout..."
                : `Continue to Payment (${plan.priceDisplay})`}
            </button>
          </form>
        ) : (
          <div className="mt-5">
            <WhopElements elements={whopPromise}>
              <Checkout
                plan={plan.whopPlanId}
                checkoutConfiguration={checkoutConfigId}
              >
                <div className="mb-4">
                  <ExpressCheckoutElement />
                </div>
                <CheckoutElement />
                <div className="mt-4">
                  <Payments>
                    <BrandingElement />
                  </Payments>
                </div>
              </Checkout>
            </WhopElements>
            <button
              type="button"
              onClick={() => setCompleted(true)}
              className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Confirm Payment Complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
