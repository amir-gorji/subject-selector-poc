"use server";
import { mastra } from "../mastra";

export async function getSubject(message: string) {
  const agent = mastra.getAgent("subjectAgent");
  const result = await agent.generate(message);
  return result.text;
}
