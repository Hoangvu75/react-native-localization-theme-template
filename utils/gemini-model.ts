import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
