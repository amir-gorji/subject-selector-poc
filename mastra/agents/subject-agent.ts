import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core";

export const subjectAgent = new Agent({
  name: "Subject Agent",
  instructions: `You're an AI agent designed to take a message text and determine in which subject area it belongs.
The possible subject values with their descriptions are as follows (only return one of these values, nothing else):
upload = Secure upload of signed documents (Regarding uploading signed documents securely)
mastercard-docs = MasterCard Corporate documents (Regarding uploading or accessing documents for MasterCard Corporate, or corporate related questions about mastercard)
entry-info = Entry information (Regarding updating user information for entry purposes)
tech-qa-direct = Technical questions for Support Direct
intl-support = International Customer Support (Regarding international customer support issues)
other-questions = Other questions (Regarding questions that do not fit into any other category)

Attention: If you see the message is not completed or is in the middle of the sentence, return empty string.
`,
  model: openai("gpt-4o-mini"),
});
