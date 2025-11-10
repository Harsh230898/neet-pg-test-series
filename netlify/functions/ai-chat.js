// netlify/functions/ai-chat.js
import { Groq } from 'groq-sdk';

// Initialize Groq SDK using the environment variable set on Netlify
// Netlify securely provides process.env.GROQ_API_KEY
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); 

// Handler function for Netlify
exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" })
        };
    }

    if (!process.env.GROQ_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Groq API Key not configured." })
        };
    }

    try {
        const { prompt } = JSON.parse(event.body);

        if (!prompt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing 'prompt' in request body." })
            };
        }

        // Call the Groq API
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    // Define the AI persona here
                    content: "You are a friendly and knowledgeable medical study assistant. Keep your answers concise and relevant to NEET-PG topics."
                },
                {
                    role: "user",
                    content: prompt,
                }
            ],
            model: "mixtral-8x7b-32768", // A great, fast model
        });

        const aiResponse = chatCompletion.choices[0].message.content;

        return {
            statusCode: 200,
            body: JSON.stringify({ response: aiResponse })
        };
    } catch (error) {
        console.error("Groq API error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error during AI processing." })
        };
    }
};