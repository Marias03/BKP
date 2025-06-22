// src/app/api/create-payment-intent/route.ts

import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export async function POST(req: NextRequest) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100000,
    currency: "rub",
    payment_method_types: ["card"],
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}
