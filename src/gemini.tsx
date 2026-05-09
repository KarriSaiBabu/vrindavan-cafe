const API_KEY = "AIzaSyAzgPQhEgfHQcj98oK15mic-YQU3BsRnNw";

export async function getGenAI() {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  return new GoogleGenerativeAI(API_KEY);
}
