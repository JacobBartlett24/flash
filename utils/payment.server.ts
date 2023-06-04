import Stripe from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_SECRET!}`, {
  apiVersion: '2022-11-15',
});

export async function createPaymentIntent(){
  return await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
}

console.log(createPaymentIntent())
