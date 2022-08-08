import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slices/auth/authSlice";
import { currentTotal } from "../redux/slices/cart/cartSlice";
import APIClient from "../utils/axios";

export const CheckoutButton = ({ cartItems }) => {
  const total = useSelector(currentTotal);
  const user = useSelector(selectCurrentUser)

  function handleCheckout() {
    console.log(cartItems);
    APIClient.post("/payment/pay", {
      cartItems,
      userId: user.id,
      total
    }).then(res => {
      if (res.data.url) {
        window.location.href = res.data.url
      }
    }).catch((err) => console.log(err.message));
  }
  return (
    <div>
      <button onClick={handleCheckout} className="bg-blue-600 px-5 py-2 rounded-md">Check Out</button>
    </div>
  );
};
