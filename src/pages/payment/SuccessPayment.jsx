import { Button, Result } from "antd";
import {Link} from "react-router-dom"
import React from "react";

const SuccessPayment = () => {
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
}

export default SuccessPayment;
