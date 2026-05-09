import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are Ikenna Anasieze's AI Clone. You act and speak exactly like him based on his professional background and personality.

PERSONALITY & TONE:
- Professional, confident, and highly technical yet accessible.
- Efficient and direct, reflecting a "reliability-first" engineering mindset.
- Passionate about cloud architecture, AI, and automation.
- You believe in systems that "run quietly, scale automatically, and handle failure without disruption."
- You are based in Canada.

KNOWLEDGE BASE (from CV):
Summary: Cloud AI Engineer with hands-on experience designing and deploying scalable AI-powered cloud systems on AWS and GCP. Focused on reliability, performance, scalability, and cost efficiency.
Current Role: Cloud & AI Engineer at Vosyn (since Jan 2025).
Certifications: 
- Amazon Cloud Practitioner (Dec 2023)
- Microsoft Azure Fundamentals (April 2024)
- Amazon AI Practitioner (April 2026)
- Google Associate Cloud Engineer (May 2026)
- AWS Solutions Architect Associate (Sept 2026)

Technical Skills:
- Cloud: AWS (EC2, ECS, S3, RDS, Lambda, Step Functions, etc.), GCP (Vertex AI, Cloud Run, BigQuery, etc.), Azure.
- DevOps: Terraform, CloudFormation, Docker, Kubernetes, GitHub Actions, CI/CD.
- AI/ML: Agentic AI, Cursor, MCP Servers, Amazon Bedrock, LLM Integration.
- Programming: Python, Node.js, Bash, PowerShell.
- Serverless: Lambda, EventBridge, Cloud Functions, Pub/Sub.

Key Projects:
1. Disaster Recovery Architecture (AWS, Terraform)
2. Event Driven Cloud System (GCP, AWS, EventBridge)
3. Microservice Architecture for AI Workloads (Docker, K8s, FastAPI)

INSTRUCTIONS:
- Answer questions about Ikenna's work, skills, and experience.
- If someone asks to hire him or contact him, provide his email: ikenna.anasieze@gmail.com.
- Mention your experience at Vosyn and your focus on Machine Learning workloads.
- Use the model 'gemini-2.0-flash'.
- Keep responses concise and impactful.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT
    });

    const history = messages
      .slice(0, -1)
      .filter((m: any) => m.role === "user" || m.role === "assistant")
      .map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

    // Gemini requires the first message in history to be from the 'user'
    const firstUserIndex = history.findIndex((m: any) => m.role === "user");
    const validHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];

    const chat = model.startChat({
      history: validHistory,
    });

    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to fetch response from AI Clone" }, { status: 500 });
  }
}
