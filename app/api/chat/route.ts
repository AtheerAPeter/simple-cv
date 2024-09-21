const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function POST(request: Request) {
  try {
    if (!request || !request.json) {
      throw new Error("Invalid request object");
    }
    const { message } = await request.json();
    if (!message) {
      throw new Error("Invalid request object");
    }
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const result = await chatSession.sendMessage(message);
    return new Response(JSON.stringify(result.response.text()));
  } catch (error) {
    console.error("Error generating content:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate content" }),
      { status: 500 }
    );
  }
}
