import React, { useState } from "react";
import CartService from "../services/cart.service";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import useCart from "../Hooks/useCart";
import Swal from "sweetalert2";

const Card = ({ item }) => {
  const { _id, name, image, price, description, category } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = async () => {
    if (!user || !user.email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login first!",
      });
      return;
    }
    try {
      const cartItem = {
        productId: _id,
        name,
        email: user.email,
        quantity: 1,
        price,
        image,
      };
      
      const response = await CartService.createCart(cartItem);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Item has been added to your cart!",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();return //ถ้ามีต่อให้ใส่ return ด้วย
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 
            heartStar`}
        onClick={handleHeartClick}
      >
        <input
          type="radio"
          name="heart"
          className={`mask mask-heart ${isHeartFilled ? "bg-green-400" : ""}`}
        />
      </div>
      <figure>
        <img
          src={image}
          alt=""
          className="hover:scale-105 transition-all duration-300 md:h-60"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-action flex flex-grid justify-between items-center  mt-2">
          <h5 className="font-bold w-1/2">
            {price} <span className="text-sm text-red">฿</span>
          </h5>
          <button
            className="btn bg-red text-white w-1/2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
