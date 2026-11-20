import React, { useState } from "react";

export function AdminInvoiceDemo() {
  const [open, setOpen] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [finalBalanceDollars, setFinalBalanceDollars] = useState("11400");
  const [collectionMethod, setCollectionMethod] = useState<
    "charge_automatically" | "send_invoice"
  >("charge_automatically");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleIssueFinalInvoice(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const amountCents = Math.round(parseFloat(finalBalanceDollars) * 100);
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: memberId.trim(),
          paymentMethodId: paymentMethodId.trim(),
          customerEmail: customerEmail.trim(),
          amountCents,
          collectionMethod,
          description:
            "GAF Timberline HDZ Full Roof Replacement — Final Balance (Less $500 Deposit)",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invoice creation failed");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-slate-700/70 bg-slate-900/90 p-5 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-300">
            CONTRACTOR BACK-OFFICE WORKFLOW
          </span>
          <h4 className="mt-1 text-base font-bold text-white">
            Step 2 Billing: Final Completion Invoice (Charge Saved Card or Send Link)
          </h4>
          <p className="text-xs text-slate-400">
            Demonstrates charging the vaulted payment method from the $500 deposit—or emailing a
            hosted Whop Invoice with BNPL/ACH—once the roof passes final inspection.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
        >
          {open ? "Hide Billing Console" : "Open Final Invoice Console"}
        </button>
      </div>

      {open && (
        <form
          onSubmit={handleIssueFinalInvoice}
          className="mt-5 grid grid-cols-1 gap-4 border-t border-slate-800 pt-5 sm:grid-cols-2"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-300">
              Whop Member ID (mber_...)
            </label>
            <input
              type="text"
              required
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="mber_xxxxxxxxxxxxxx"
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300">
              Collection Method
            </label>
            <select
              value={collectionMethod}
              onChange={(e) => setCollectionMethod(e.target.value as any)}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="charge_automatically">
                Charge Saved Card on File Automatically
              </option>
              <option value="send_invoice">
                Send Hosted Whop Invoice Link (Card / ACH / Klarna)
              </option>
            </select>
          </div>

          {collectionMethod === "charge_automatically" ? (
            <div>
              <label className="block text-xs font-semibold text-slate-300">
                Saved Payment Method ID (pm_...)
              </label>
              <input
                type="text"
                required
                value={paymentMethodId}
                onChange={(e) => setPaymentMethodId(e.target.value)}
                placeholder="pm_xxxxxxxxxxxxxx"
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-300">
                Homeowner Email
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="jordan@example.com"
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300">
              Final Completion Balance (USD)
            </label>
            <input
              type="number"
              min="1"
              step="0.01"
              required
              value={finalBalanceDollars}
              onChange={(e) => setFinalBalanceDollars(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-950/50 p-3 text-xs text-red-300 sm:col-span-2">
              {error}
            </div>
          )}

          {result && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/50 p-3 text-xs text-emerald-300 sm:col-span-2">
              ✓ Whop Invoice Created (<code>{result.invoiceId}</code>) — Status:{" "}
              <strong>{result.status}</strong>
            </div>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-60"
            >
              {loading
                ? "Processing via Whop Invoices API..."
                : "Issue & Settle Final Completion Invoice"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
