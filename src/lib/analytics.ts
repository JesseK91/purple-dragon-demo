export interface TrackedEvent {
  eventName: string;
  timestamp: string;
  payload: Record<string, unknown>;
}

export function track(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const timestamp = new Date().toISOString();
  const eventRecord: TrackedEvent = { eventName, timestamp, payload };

  // Log in browser developer tools console
  console.info(`[demo-track] ${eventName}`, payload);

  try {
    // Append to localStorage for dashboard retrieval
    const existing = localStorage.getItem("demo_analytics_events");
    const events: TrackedEvent[] = existing ? JSON.parse(existing) : [];
    
    // Cap at most recent 200 events
    events.unshift(eventRecord);
    if (events.length > 200) {
      events.pop();
    }
    
    localStorage.setItem("demo_analytics_events", JSON.stringify(events));
    
    // Dispatch custom event to notify active views
    const customEvent = new CustomEvent("new-analytics-event", { detail: eventRecord });
    window.dispatchEvent(customEvent);
  } catch (e) {
    console.error("Local storage analytics sync failed", e);
  }

  // Fire-and-forget persistent analytics ingestion.
  void fetch("/api/lead-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: eventName,
      source: "storefront",
      payload,
      occurred_at: timestamp,
    }),
  }).catch(() => {
    // Local analytics remains the fallback when network call fails.
  });
}

export function getTrackedEvents(): TrackedEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const existing = localStorage.getItem("demo_analytics_events");
    return existing ? JSON.parse(existing) : [];
  } catch {
    return [];
  }
}

export function clearTrackedEvents() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("demo_analytics_events");
  } catch {}
}
