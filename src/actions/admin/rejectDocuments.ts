"use server";
import prisma from "@/lib/prisma/client";
import { State } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function sendTelegramMessage(text: string) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID,
          text: text,
        }),
      }
    );

    if (!response.ok) {
      console.error('Failed to send Telegram message:', await response.text());
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
}

export default async function rejectDocuments(userId: string){
  const res = await prisma.approvedState.upsert({
    where: { userId },
    update: { state: State.REJECTED },
    create: {
      user: {
        connect: {
            id: userId,
        }
      },
      state: State.REJECTED,
    },
    include: {
      user: true
    }
  });

  revalidatePath("/")

  if(res.user) {
    const message = `🚨 *DOCUMENT REJECTED* 🚨\n\n` +
      `*User*: ${res.user.email}\n` +
      `*Reason*: "Does not meet requirements"\n\n` +
      `*Required actions*:\n` +
      `1. Request a new invitation letter\n` +
      `2. Regularize your situation before the visa caducates\n` +
      `3. Leave the country if not regularized\n\n` +
      `_Contact your administrator for more information_`;

    await sendTelegramMessage(message);
  }

  return {
    success: !!res,
  }
}
