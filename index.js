const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();


const stripe = Stripe(process.env.SECRET_KEY);
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//Base Url
app.get("/",(req,res)=>{
  res.send("Stripe Payment Gateway Integrated")
})

//Authentication checking for secert key 
const authentication=(req,res,next)=>{
  const secretKey=req.headers.authorization?.split(" ")[1];
  console.log(secretKey)
  if(!secretKey){
    res.status(500).json("Invalid SecretKey");

  }else{
    next();
  }

}


// Get all payment Intents
app.get(`/api/v1/get_intents`,authentication ,async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.list({ limit: 10 });
    res.status(200).json({ paymentIntent, msg: "Payment Intent Fetched" });
  } catch (error) {
    res.status(500).json(error);
  }
});


//Create intent for payment
app.post(`/api/v1/create_intent`,authentication , async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(req.body);
    res.status(200).json({ paymentIntent, msg: "Payment Intent Created" });
  } catch (error) {
    res.status(500).json(error);
  }
});
//Capture the created intent
app.post(`/api/v1/capture_intent/:id`,authentication , async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req);
    const paymentIntent = await stripe.paymentIntents.confirm(id, {
      payment_method: req.body.payment_method,
      return_url: `${req.protocol}://${req.get("host") + req.originalUrl}`,
    });
    res.status(200).json({ paymentIntent, msg: "Payment Intent Captured" });
  } catch (error) {
    res.json(error).status(500);
  }
});

//Cancel the created intent
app.post(`/api/v1/payment_intents/:id/cancel`,authentication , async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req);
    const paymentIntent = await stripe.paymentIntents.cancel(id);
    res.status(200).json({ paymentIntent, msg: "Payment Intent Cancelled" });
  } catch (error) {
    res.json(error).status(500);
  }
});

//Create a refund for the created intent
app.post(`/api/v1/create_refund/:id`,authentication , async (req, res) => {
  try {
    const refund = await stripe.refunds.create({
      charge: req.body.charge,
    });
    res.status(200).json({ refund, msg: "Refund Initiated" });
  } catch (error) {
    res.json(error).status(500);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening to PORT :${PORT}`);
});
