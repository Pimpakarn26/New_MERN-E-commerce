const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        email: { type: String, required: true },
        customerId: { type: String, required: true },
        products: [
            {
                productId: { 
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {type: Number, required:true, default:1 },
            },
        ],
        subtotal:{type:Number, required:true},
        total: { type: Number, required: true },
        shipping:{type:Number, required:true},
        delivery_status: { type: String, required: true, default: "pending" },
        payment_status: { type: String, required: true, default: "unpaid" },
    },
    {
        timestamps: true,
    }
);

const OrderCartModel = model("CartItem", OrderSchema);
module.exports = OrderCartModel;