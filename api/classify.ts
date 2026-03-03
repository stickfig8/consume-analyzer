import { GoogleGenerativeAI } from "@google/generative-ai";
import { classifyPrompt } from "./prompts/prompts.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const expenses = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                classifyPrompt +
                "\n\nClassify the following data:\n" +
                JSON.stringify(expenses),
            },
          ],
        },
      ],
    });

    const text = result.response.text();

    // 혹시 markdown 감싸져 나오면 제거
    const cleaned = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleaned);

    // cli 환경 log
    console.log("Gemini raw text:", text);
    console.log("Parsed classification:", parsed);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Classification failed" });
  }
}
