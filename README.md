# Stripe Payment Gateway Integration - Node.js Backend

This repository contains the Node.js backend code for integrating the Stripe Payment Gateway. The implemented APIs allow you to create payment intents, capture created intents, create refunds, and retrieve a list of all payment intents.

# Prerequisites

  Before using this code, make sure you have created a sandbox account on Stripe and obtained the necessary access and secret keys.

# Setup

  **Clone the repository:**

      git clone https://github.com/MohdZaid96/portone_Stripe_integration.git
      cd payment_stripe


  **Install dependencies:**

      npm install


  **Create a .env file in the root directory with your Stripe secret key:**

      SECRET_KEY=your_stripe_secret_key
      PORT=8080
      Replace your_stripe_secret_key with your actual Stripe secret key.


  **Run the server:**


      npm start
      The server will run on the specified port (default is 3000).


# Implemented APIs

  **Create Payment Intent:**

    Endpoint: POST /api/v1/create_intent
    Description: Create a payment intent for processing payments.
    Request Body Example:
    {
      "amount": "2000",
      "currency": "usd",
      "automatic_payment_methods": {
        "enabled": true
      }
    }


  **Capture Created Intent:**

    Endpoint: POST /api/v1/capture_intent/:id
    Description: Capture a created payment intent.
    Request Body Example:
    {
      "payment_method": "pm_card_visa"
    }

  **Cancel Created Intent:**

    Endpoint: POST /api/v1/payment_intents/:id/cancel
    Description: Cancel a created payment intent.
    


  **Create Refund for Created Intent:**

    Endpoint: POST /api/v1/create_refund/:id
    Description: Initiate a refund for a payment intent.
    Request Body Example:
    {
      "charge": "ch_123456789"
    }


  **Get List of All Intents:**

    Endpoint: GET /api/v1/get_intents
    Description: Retrieve a list of all payment intents.


**Postman Collection Link**

  https://www.postman.com/security-cosmologist-69473520/workspace/public/collection/36407920-60da3a99-9152-4eee-91f0-784ccb686347


# References
  Stripe API Documentation
  Payment Intents Guide









