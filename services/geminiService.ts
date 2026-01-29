
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ScreeningRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeResume(request: ScreeningRequest): Promise<AnalysisResult> {
  const { resumeText, jobDescription } = request;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following resume against the job description.
    
    Job Description:
    ${jobDescription}
    
    Resume:
    ${resumeText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          matchScore: { type: Type.NUMBER, description: "A score from 0-100 indicating the fit." },
          matchedSkills: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Specific skills found in the resume that match the job description."
          },
          missingSkills: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Essential skills from the job description not explicitly present in the resume."
          },
          summary: { type: Type.STRING, description: "A professional summary of the match." },
          candidateStrengths: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Top 3 strengths of the candidate for this role."
          },
          improvements: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Advice for the candidate to improve their profile."
          },
          unbiasedVerdict: { 
            type: Type.STRING, 
            description: "An explanation of why this screening is fair and unbiased, focusing purely on skill and experience alignment."
          }
        },
        required: ["matchScore", "matchedSkills", "missingSkills", "summary", "candidateStrengths", "improvements", "unbiasedVerdict"]
      },
      systemInstruction: "You are a professional HR Screening AI with 20 years of technical recruiting experience. You provide objective, high-accuracy analysis of resumes compared to job descriptions. You ignore demographic information and focus strictly on skills, experience, and accomplishments."
    },
  });

  const resultText = response.text;
  if (!resultText) throw new Error("No response from AI");
  
  return JSON.parse(resultText) as AnalysisResult;
}
