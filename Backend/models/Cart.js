const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    name: { type: String, required: true },
    email:{type:String, required: true},
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true
  }
);
const CartModel = model("CartItem", CartSchema);
module.exports = CartModel;
