const stripe = require("stripe")(
  "sk_test_51JwRDeI4IOxw6fNy8wZvvBwUhvO7cnhT7QAfAc0fKM2iAt4bew20pwwPDZjF23GTFPtG9ywvzePJiAvNZ0xbQVyn00r26WrXdK"
);
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/payment-sheet", async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2020-08-27" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "eur",
    // price: "price_1K7fljI4IOxw6fNyTkdBQdKv",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51JwRDeI4IOxw6fNyLVSM5MLoIHELFJ6VatMjL584hZE4ZrkStNswDuINmjvcURfOdhIVF7m6U0MpJCQCEeGm2vcy00UUpYgvS4",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
