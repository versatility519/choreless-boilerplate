"use server";

import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
}

// const billingUrl = absoluteUrl("/dashboard/billing")
const billingUrl = absoluteUrl("/summery")

// export async function generateUserStripe(priceId: string): Promise<responseAction> {
export async function generateUserStripe(priceId: string) {

  let redirectUrl: string = "";

  try {
    const session = await auth()
    const user = session?.user;
    console.log("Pricing ID" ,priceId)
    console.log("Session" ,session)

    if (!user || !user.email || !user.id) {
      throw new Error("Unauthorized");
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      // User on Paid Plan - Create a portal session to manage subscription.
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      })

      redirectUrl = stripeSession.url as string
    } else {
      // User on Free Plan - Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: "assassin.william519@gmail.com",
        // customer_email: user.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        // metadata: {
        //   userId: user.id,
        // },
      })

      redirectUrl = stripeSession.url as string
    }
  } catch (error) {
    throw new Error("Failed to generate user stripe session");
  }

  redirect(redirectUrl)
}