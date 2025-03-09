// const Stripe = require('strip');
// const stripe = new Stripe (process.env.STRIPE_SECRET_KEY);
// const OrderModel = require('../models/Order');
// const CartModel = require('../models/Cart');

// exports.createCheckoutSession = async (req, res) => {
//  const cartItems = req.body.cart;
//  const products = cartItems.map((item) => {
//     return{
//         productId : item.productId,
//         quantity: item.quantity,
//     };
//  });
//  //customer info
//     const customer = await stripe.customers.create({
//         metadata: {
//             email: req.body.email.toSring(),
//             cart: JSON.stringify(products),
//         },
//     });
//     const line_items = cartItems.map((item) => {
//         return{
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: item.name,
//                 },
//                 unit_amount: item.price * 100,
//             },
//             quantity: item.quantity,
//         };
//     });
    
// };
// const clearCart = async (customer) => {
//  try{
//     await CartModel.deleteMany({email});
//     console.log("Cart is cleared");

//  }catch(error){
//         res.status(500).send
//         ({ message: error.message || "Something error occurred while creatinp new order",
//         });
//     }
// }

// const createOrder = async (customer, data) => {
//     const products = JSON.parse(customer.methoddata.cart);
//     console.log("Products", products);
//     try{
//         const newOrder = await OrderModel.create({
//             email: customer.methoddata.email,
//             customerId: data.customer,
//             products: products,
//             subtotal: data.amount_subtotal,
//             total: data.amount_total,
//             shipping: data.customer_details,
//             payment_status: data.payment_status,
//         });
//         if(newOrder){
//             await clearCart(customer.metadata.email);
//             console.log("Order created successfully!");

//         }
//     }catch(error){
//         res.status(500).send
//         ({ message: error.message || "Something error occurred while creatinp new order",
//         });
//     }
// }
// exports.webhook = (req, res) => {
//     const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
//     const sig = req.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//     } catch (err) {
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the event
//     switch (event.type) {
//         case 'checkout.session.completed':
//             console.log('Checkout session completed!');
//             stripe.customers.retrieve(data.customer).then(async (customer) => {
//                 try{
//                     await createOrder(customer, data);
//                 }catch(error){
//                     res.status(500).send
//                     ({ message: `Webhook Error: ${err.message}`});
//                 }
//             });
//             break;
//         // ... handle other event types
//         default:
//             console.log(`Unhandled event type ${event.type}`);
//     }
//     res.status(200).end();
// };

