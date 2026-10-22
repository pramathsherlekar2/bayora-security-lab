export type EvaluationInput = {
  user_id: string;
  prompt: string;
  guardrails_active: boolean;
};

export async function postEvaluation(input: EvaluationInput, apiKey: string) {
  const response = await fetch(
    "https://2f60837b-ed41-4c2c-9198-fb731e9ca900-00-23hk4p8yseq33.sisko.replit.dev/api/evaluate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(60000),
      redirect: "error",
    },
  );
  // Never allow an upstream error that echoes request credentials to expose them.
  const raw = (await response.text()).split(apiKey).join("[REDACTED]");
  return { ok: response.ok, status: response.status, statusText: response.statusText, raw };
}