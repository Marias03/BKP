import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import prisma from "@/lib/prisma/client";
import {currentUser} from "@/lib/dal/user";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  const { amount } = await req.json();

  const payment = await prisma.visaPayment.create({
    data: {
      userId: user.id,
      amount,
    }
  });

  return NextResponse.json({ success: true, payment });
}

