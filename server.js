import express from "express";
import path from "path";
import stripe from "stripe";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./gql/typeDefs.js";
import { resolvers } from "./gql/resolvers.js";
import admin from "firebase-admin";

// Dev dotenv
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Initialize Firebase Admin for backend access
admin.initializeApp({
  credential: admin.credential.cert(
    process.env.NODE_ENV === "production"
      ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
      : process.env.GOOGLE_APPLICATION_CREDENTIALS
  ),
  databaseURL: "https://crwn-clothing-994f7.firebaseio.com",
});

// Create instance of Firestore database
const firestore = admin.firestore();

// Create Stripe instance
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// Create Express server app
const expressServer = express();
const port = process.env.PORT || 5000;

expressServer.use(express.json());
expressServer.use(
  express.urlencoded({
    extended: true,
  })
);

if (process.env.NODE_ENV === "production") {
  expressServer.use(express.static(path.join(__dirname, "client/build")));

  expressServer.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Start Apollo Server (GraphQL)
let apolloServer = null;
const startApolloServer = async () => {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => firestore,
  });

  try {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: expressServer });
  } catch (error) {
    console.log(error);
  }
};

startApolloServer();

// Handle processing of Stripe payments
expressServer.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripeInstance.charges.create(body, (stripeError, stripeResponse) => {
    if (stripeError) {
      res.status(500).send({ error: stripeError });
    } else {
      res.status(200).send({ success: stripeResponse });
    }
  });
});

// Start Express server
expressServer.listen(port, (error) => {
  if (error) throw error;
  console.log(`Express server running on port ${port}`);
});
