import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 Correct way to read env variable in Vite
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log("API KEY:", API_KEY); // debug

// ❌ safety check
if (!API_KEY) {
  throw new Error("Gemini API Key not found. Check your .env file");
}

// 🚀 init Gemini
const genAI = new GoogleGenerativeAI(API_KEY);

export default genAI;