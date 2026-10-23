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
  .handler(async ({ data }) => {
    const apiKey = process.env["BAYORA_API_KEY"] || "bayora-secret-123";
    return postEvaluation(data, apiKey);
  });
