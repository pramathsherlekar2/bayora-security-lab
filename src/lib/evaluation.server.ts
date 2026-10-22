export type EvaluationInput = {
  user_id: string;
  prompt: string;
  guardrails_active: boolean;
};

export async function postEvaluation(input: EvaluationInput, apiKey: string) {
  const response = await fetch(
    "https://fast-api-backend--pramathsherleka.replit.app/api/evaluate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({ user_id: "demo-user", prompt: input.prompt, guardrails_active: Boolean(input.guardrails_active) }),
      signal: AbortSignal.timeout(60000),
      redirect: "error",
    },
  );
  // Never allow an upstream error that echoes request credentials to expose them.
  const raw = (await response.text()).split(apiKey).join("[REDACTED]");
  return { ok: response.ok, status: response.status, statusText: response.statusText, raw };
}