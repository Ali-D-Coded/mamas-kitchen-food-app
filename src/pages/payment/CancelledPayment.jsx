import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const CancelledPayment = () => {
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Link to="/">
          <Button type="primary" key="console">
            Go Console
          </Button>
        </Link>
      }
    />
  );
};
