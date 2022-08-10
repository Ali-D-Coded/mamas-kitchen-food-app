import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slices/auth/authSlice";
import { currentTotal, setDelivery } from "../redux/slices/cart/cartSlice";
import APIClient from "../utils/axios";

export const CheckoutButton = ({ cartItems, deliveryDetes }) => {
  const total = useSelector(currentTotal);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  function handleCheckout() {
    dispatch(
      setDelivery({
        del: deliveryDetes,
      })
    );
    console.log({ cartItems, deliveryDetes });
    APIClient.post("/payment/pay", {
      cartItems,
      userId: user.id,
      total,
    })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <div>
      <button
        onClick={handleCheckout}
        className="bg-blue-600 px-5 py-2 rounded-md"
      >
        Proceed to Check Out
      </button>
    </div>
  );
};
