import {GoogleGenerativeAI} from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GeminiKey!)

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({model: "gemini-2.5-pro"})

    const result = await model.generateContent(prompt)
    console.log("bruhhh", result)
    const response = await result.response
    return response.text()
  } catch (err) {
    console.error("Gemini error:", err)
    return "⚠️ Failed to get response from Gemini."
  }
}
