"use client";

import getStripe from "@/actions/getStripe";

import stripePackage from "stripe";
const stripePack = new stripePackage(
  'sk_test_51NnDfFJJKYvls7hTp0OywRcIRi3lVndZ56cAvf9KkivyzYnajm1ou7rl2fH70UAUcg5vKEBzcKbNdoA7h7QAtMmy00SAZLsJ7c'
);

// This line is no longer needed as we've fixed the error
// const errorCauser = stripePack();

// export async function generateUserStripeInfo(priceId: string): Promise<responseAction> {
export async function generateUserStripe(priceId: string) {
  try {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error("Failed to load Stripe.");
    }

    const session = await stripePack.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: "https://choreless-laundry.vercel.app/summery",
      cancel_url: "https://choreless-laundry.vercel.app/summery",
      mode: "subscription",
      customer_email: "assassin.william519@gmail.com",
    });

    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.error(result.error.message);
    }
    if (!session.url) {
      throw new Error("Failed to create Stripe checkout session.");
    }

    return session;
  } catch (error) {
    console.error("Error in generateUserStripe:", error);
    throw error;
  }
}