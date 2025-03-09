import React, { useContext } from "react";
import StripeService from "../services/stripe.service";
import { AuthContext } from "../contexts/AuthContext";

const PaymentButton = ({ cartItem }) => {
  const { user } = useContext(AuthContext);
  const handleCheckout = () => {
    StripeService.createCheckoutSession({
      cart: cartItem,
      email: user.email,
    })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => console.log(error.massage));
  };

  return (
    <div>
      {" "}
      <button
        className="btn bg-red text-white"
        onClick={() => handleCheckout()}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default PaymentButton;