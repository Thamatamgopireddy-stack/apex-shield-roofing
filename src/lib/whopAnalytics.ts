declare global {
  interface Window {
    whop?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export type CustomWhopEvent =
  | "service_viewed"
  | "deposit_started"
  | "estimate_requested";

export function trackWhopEvent(
  eventName: CustomWhopEvent,
  properties: Record<string, unknown> = {}
) {
  const payload = {
    ...properties,
    timestamp: new Date().toISOString(),
    vertical: "roofing",
  };

  if (typeof window !== "undefined" && typeof window.whop?.track === "function") {
    window.whop.track(eventName, payload);
  }

  console.info(`[Whop Pixel] whop.track("${eventName}")`, payload);
}
