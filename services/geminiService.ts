import { GoogleGenAI, Chat } from "@google/genai";
import { Message } from '../types';

// Initialize API client lazily to avoid immediate crashes if keys are missing
let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    // Note: In a real production app, ensure this is handled securely.
    // The prompt explicitly states process.env.API_KEY is available.
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
      console.warn("Warning: API_KEY is missing or empty. Chat features will fail.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

let chatSession: Chat | null = null;
let currentModelName: string = '';

export const initializeChat = (modelName: string, systemInstruction: string) => {
  const client = getAiClient();
  chatSession = client.chats.create({
    model: 'gemini-2.5-flash', // Changed to standard flash model for better stability
    config: {
      systemInstruction: systemInstruction,
      temperature: 1.0, // High creativity for human-like improvisation
      topK: 64,
      topP: 0.95,
    },
  });
  currentModelName = modelName;
};

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  if (!chatSession) {
    console.error("Chat session not initialized");
    return "（连接中断... 请刷新页面重试）";
  }

  try {
    const response = await chatSession.sendMessage({ message: userMessage });
    return response.text || "（沉默... 他似乎在思考什么）";
  } catch (error) {
    console.error("Gemini API Error Details:", error);
    // Return a thematic error message, but log the real one above
    return "（信号受到干扰，就像在沙漠里手机没信号一样... 请检查 API Key 配置或网络连接）";
  }
};