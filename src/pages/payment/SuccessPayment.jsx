import { Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentCartItems,
  currentDateRange,
  currentTotal,
  decreaseCartQuantity,
  selectedDeliDetes,
} from "../../redux/slices/cart/cartSlice";
import APIClient from "../../utils/axios";
import { selectCurrentUser } from "../../redux/slices/auth/authSlice";

const SuccessPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const cartItems = useSelector(currentCartItems);
  const dateRange = useSelector(currentDateRange);
  const total = useSelector(currentTotal);
  const deliveryDetes = useSelector(selectedDeliDetes);
  useEffect(() => {
    let mount = true;
    const controller = new AbortController();
    // console.log("hrllo");
    if (mount) {
      if (cartItems.length >= 1) {
        APIClient.post("/orders/create", {
          userId: user.id,
          cartItems,
          total,
          dateRange,
          deliveryDetes,
        });
      }
      dispatch(decreaseCartQuantity());
      // window.location.reload();
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    return () => {
      mount = false;
      controller.abort();
    };
  }, []);
  return (
    <Result
      status="success"
      title="Your Order Was Successful"
      // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Link to="/">
          <Button type="primary" key="console">
            Go Home
          </Button>
        </Link>,
        //   <Button key="buy">Buy Again</Button>,
      ]}
    />
  );
};

export default SuccessPayment;
