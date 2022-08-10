import { Button, Result } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { decreaseCartQuantity } from "../../redux/slices/cart/cartSlice";

export const CancelledPayment = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let mount = true;
    if (mount) {
      dispatch(decreaseCartQuantity());
    }
    return () => {
      mount = false;
    };
  }, []);
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Link to="/">
          <Button type="primary" key="console">
            Go Home
          </Button>
        </Link>
      }
    />
  );
};
