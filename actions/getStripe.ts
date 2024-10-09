import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
/**
 * Returns a Stripe promise that can be used to initialize Stripe.
 * The Stripe promise is cached and reused across multiple calls.
 *
 * @returns {Promise<Stripe>} A promise that resolves to the Stripe object.
 */
const getStripe = () => {
  if (!stripePromise) {
    console.log("Stripe Promise is null, creating a new one");
    stripePromise = loadStripe(
      "pk_test_51NnDfFJJKYvls7hTtsa2g4cSwViNaLmL8RsajaylZkrEG980Z7Ad2Mitrbgqpzbrwq2eY7jyWFDd6yzEPGnrBGmK002kELgwCF",
    );
  }
  return stripePromise;
};

export default getStripe;
