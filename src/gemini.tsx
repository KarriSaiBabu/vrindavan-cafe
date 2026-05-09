import { GoogleGenerativeAI } from "@google/generative-ai";

// Hardcoded API key for deployment
const API_KEY = "AIzaSyAzgPQhEgfHQcj98oK15mic-YQU3BsRnNw";

// 🚀 init Gemini
const genAI = new GoogleGenerativeAI(API_KEY);

export default genAI;