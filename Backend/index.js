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
require("dotenv").config();

// ตรวจสอบตัวแปร environment ที่จำเป็น
const requiredEnvVars = ['PORT', 'DB_URL', 'BASE_URL', 'JWT_SECRET', 'STRIPE_SECRET_KEY'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: ${envVar} is not defined in environment variables`);
    process.exit(1);
  }
}

const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

//create app
const app = express();

//connect data base
mongoose.connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });

//allow web can connect app
app.use(cors({ origin: BASE_URL, credentials: true }));
// stripe webhook must use raw body
app.use("/api/v1/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("<h1>Welcome to SE NPRU Web_blog E-commerce_Restful API</h1>");
});

//router
//http://localhost:5000/api/docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/stripe", stripeRouter);
app.use("/api/v1/order",orderRouter);


//upload image for local
app.use("/upload", express.static(__dirname + "/upload"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
