"use server";

import OpenAI from "openai";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createSession(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const content = formData.get("content") as string;

  if (!clientId || !content) {
    throw new Error("Missing required fields");
  }

  let aiResult = {
    summary:
      "AI summary unavailable. The original session note has been saved successfully.",
    actions: "No AI action points available.",
    followUp: "No AI follow-up message available.",
  };

  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content:
            "You help coaches, freelancers, and small business owners turn rough client session notes into useful summaries. Always return valid JSON.",
        },
        {
          role: "user",
          content: `
Return ONLY valid JSON in this exact format:

{
  "summary": "A concise summary of the session",
  "actions": "Clear action points for the business owner",
  "followUp": "A friendly follow-up message written to the client"
}

Session notes:
${content}
          `,
        },
      ],
    });

    const aiText = completion.choices[0]?.message?.content;

    if (aiText) {
      aiResult = JSON.parse(aiText);
    }
  } catch (error) {
    console.error("OpenAI failed:", error);
  }

  await prisma.session.create({
    data: {
      content,
      summary: aiResult.summary,
      actions: aiResult.actions,
      followUp: aiResult.followUp,
      clientId,
    },
  });

  redirect(`/clients/${clientId}`);
}

export async function deleteSession(formData: FormData) {
  const sessionId = formData.get("sessionId") as string;
  const clientId = formData.get("clientId") as string;

  if (!sessionId || !clientId) {
    throw new Error("Missing required fields");
  }

  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });

  redirect(`/clients/${clientId}`);
}