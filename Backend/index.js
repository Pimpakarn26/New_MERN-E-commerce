const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./router/user.router");
const productRouter = require("./router/product.router");
const cartRouter = require("./router/cart.router");
const stripeRouter = require("./router/stripe.router");
const orderRouter = require("./router/order.router");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc/swagger-output.json");

require('dotenv').config();

const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT || 5000;  // fallback to 5000 if PORT is not defined
const DB_URL = process.env.DB_URL;

// CORS allowed origins (you can set this dynamically based on your environment)
const allowedOrigins = [BASE_URL || 'https://new-mern-e-commerce.vercel.app'];

const app = express();

// Connect to MongoDB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);  // Allow requests from allowed origins
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Allow cookies to be sent
}));

// Stripe webhook must use raw body
app.use("/api/v1/stripe/webhook", express.raw({ type: "application/json" }));

// Middleware to parse JSON requests
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SE NPRU Web_blog E-commerce_Restful API</h1>");
});

// Swagger UI documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/stripe", stripeRouter);
app.use("/api/v1/order", orderRouter);

// Serve uploaded images locally
app.use("/upload", express.static(__dirname + "/upload"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
