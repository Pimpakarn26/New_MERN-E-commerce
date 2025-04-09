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

const app = express();

//connect to MongoDB
mongoose.connect(DB_URL)
  .then(() => {
    console.log("Connect to MongoDB Successfully");
  })
  .catch((error) => {
    console.log("DB Connect Failed", error);
  });

// Allow CORS from the specified BASE_URL
app.use(cors({ origin: BASE_URL, credentials: true }));

// Stripe webhook must use raw body
app.use("/api/v1/stripe/webhook", express.raw({ type: "application/json" }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to SE NPRU Web_blog E-commerce_Restful API</h1>");
});

// Swagger UI documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/stripe", stripeRouter);
app.use("/api/v1/order", orderRouter);

// Serve uploaded images locally
app.use("/upload", express.static(__dirname + "/upload"));

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
