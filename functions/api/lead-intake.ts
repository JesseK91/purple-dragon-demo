type Env = {
  LEAD_GUARD_API_BASE_URL?: string;
  LEAD_GUARD_CLIENT_ID?: string;
  LEAD_GUARD_INTAKE_KEY?: string;
};

const jsonHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}) => {
  const apiBaseUrl = context.env.LEAD_GUARD_API_BASE_URL || "https://lead-guard-api.fly.dev";
  const clientId = context.env.LEAD_GUARD_CLIENT_ID || "purple-dragon";
  const intakeKey = context.env.LEAD_GUARD_INTAKE_KEY;

  let payload: unknown;
  try {
    payload = await context.request.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const forwardedPayload =
    payload && typeof payload === "object" && !Array.isArray(payload)
      ? { ...(payload as Record<string, unknown>) }
      : payload;

  const endpoint = `${apiBaseUrl.replace(/\/$/, "")}/v1/${encodeURIComponent(clientId)}/intake/request`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (intakeKey) {
    headers["X-Intake-Key"] = intakeKey;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(forwardedPayload),
    });

    const text = await response.text();
    let body: unknown = text;
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      body = { message: text };
    }

    if (!response.ok) {
      return jsonResponse(
        {
          error: "lead_guard_rejected",
          status: response.status,
          detail: body,
        },
        response.status,
      );
    }

    return jsonResponse(body, response.status);
  } catch (error) {
    return jsonResponse(
      {
        error: "lead_guard_unreachable",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      502,
    );
  }
};

export const onRequestOptions = async () => jsonResponse({ ok: true });
