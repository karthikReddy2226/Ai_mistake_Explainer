import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  const { question, wrongAnswer } = await req.json();

  const prompt = `
A student made a mistake.

Question:
${question}

Wrong Answer:
${wrongAnswer}

Explain:
1. Why it is wrong
2. Correct approach
3. How to avoid this mistake
4. Learning tip
`;

  const result = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt,
  });

  return Response.json({
    explanation: result.text,
  });
}
