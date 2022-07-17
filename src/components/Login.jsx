import React, { useRef, useState } from "react";
import { VscLocation } from "react-icons/vsc";
import { Button, Checkbox, Form, Input } from "antd";
// import {
//   FormControl,
//   TextField,
//   OutlinedInput,
//   InputLabel,
//   Stack,
//   InputAdornment,
//   IconButton,
//   Button,
//   Input,
// } from "@mui/material";
// import { alpha, styled } from "@mui/material/styles";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect } from "react";
import APIClient from "../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import jsCookie from "js-cookie";
import { useLoginMutation } from "../redux/slices/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/auth/authSlice";
import Loader from "./loadings/Loader";

// const CustomTextField = styled(TextField)({
//   "& label.Mui-focused": {
//     color: "black",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "black",
//   },
//   "& 	.MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#eee",
//       width: "100%",
//       borderRadius: "10px",
//     },
//     "&:hover fieldset": {
//       borderColor: "yellow",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#eee",
//       color: "#fff",
//     },
//   },
// });



const initialValues = {
  mobNo: "",
  password: "",
};

const Login = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [formValues.mobNo, formValues.password]);

  const onFinish = async (values) => {
    
    console.log({formValues,values});
    try {
      const userData = await login({
        mob_no: formValues.mobNo,
        password: formValues.password,
      }).unwrap();
      console.log(userData);
      dispatch(
        setCredentials({
          user: userData.user,
          accessToken: userData.token,
          role: userData.user.role,
        })
      );
      jsCookie.set("token", userData.token);

      setFormValues((prev) => ({
        ...prev,
        mobNo: "",
        password: "",
      }));
      navigate('/');
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server response");
      } else if (error.response?.status == 400) {
        setErrMsg("Missing username or password");
      } else if (error.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

   const onFinishFailed = (errorInfo) => {
     console.log("Failed:", errorInfo);
   };

  

  const content = isLoading ? (
    <Loader />
  ) : (
    <section className="px-8 pt-10 flex flex-col ">
      <p
        ref={errRef}
        className={
          errMsg
            ? "bg-red-300 text-red-900 px-3 py-2 text-center rounded-md"
            : "hidden"
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-[#AC3207] text-4xl font-nunito font-semibold text-center">
        Login
      </h1>
      <div className="mt-5 grid place-items-center">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please input your mobile number!",
              },
            ]}
          >
            <Input
              required
              ref={userRef}
              placeholder="1234567890"
              name={formValues.mobNo}
              value={formValues.mobNo}
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  mobNo: e.target.value,
                }));
              }}
              className="shadow-md border"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                min: 6
              },
            ]}
          >
            <Input.Password
              required
              placeholder="password"
              name={formValues.password}
              value={formValues.password}
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
                className="shadow-md border"
                
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );

  return content
};

export default Login;
