import { afterEach, describe, expect, it, vi } from "vitest";
import { postEvaluation } from "@/lib/evaluation.server";

afterEach(() => vi.unstubAllGlobals());

describe("Evaluation request", () => {
  it("includes the configured API key and JSON header on every attack", async () => {
    const fetchMock = vi.fn().mockImplementation(async () => new Response('{"output":"ok"}'));
    vi.stubGlobal("fetch", fetchMock);
    for (const prompt of ["First attack", "Second attack"]) {
      await postEvaluation({ user_id: "demo-user", prompt, guardrails_active: true }, "test-only-key");
    }
    expect(fetchMock).toHaveBeenCalledTimes(2);
    for (const [url, options] of fetchMock.mock.calls) {
      expect(url).toBe("https://2f60837b-ed41-4c2c-9198-fb731e9ca900-00-23hk4p8yseq33.sisko.replit.dev/api/evaluate");
      expect(options.method).toBe("POST");
      expect(options.headers["Content-Type"]).toBe("application/json");
      expect(options.headers["X-API-Key"]).toBe("test-only-key");
    }
  });

  it("preserves upstream errors while removing echoed credentials", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("Invalid test-only-key", { status: 401 })));
    expect(await postEvaluation({ user_id: "demo-user", prompt: "attack", guardrails_active: false }, "test-only-key"))
      .toMatchObject({ ok: false, status: 401, raw: "Invalid [REDACTED]" });
  });
});