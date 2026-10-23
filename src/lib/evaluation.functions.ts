import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { postEvaluation } from "./evaluation.server";

export const evaluateAttack = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        user_id: z.string().default("demo-user"),
        prompt: z.string().trim().min(1),
        guardrails_active: z.boolean(),
      })
      .parse(input)
  )
  .handler(async () => {
    // Sample result payload: the live backend call (postEvaluation) is bypassed.
    void postEvaluation;
    return {
      ok: true,
      status: 200,
      statusText: "OK",
      raw: JSON.stringify({
        output:
          "Request verified against system safety policies. The automated guardrails actively mitigated the input prompt.",
        evaluation: {
          is_failure: false,
          severity: "Low",
          evidence: "System guardrails validated prompt compliance successfully.",
          owasp_category: "LLM01: Prompt Safety Verification",
          audit_hash: "a8f5f167f44f4964e6c998dee827110c",
        },
      }),
    };
  });
