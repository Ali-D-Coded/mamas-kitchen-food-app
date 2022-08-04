import React, { useState, useEffect, useRef } from "react";
import "./reg.css";
import { VscLocation } from "react-icons/vsc";
// import { useTheme } from "@mui/material/styles";
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
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { alpha, styled } from "@mui/material/styles";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import APIClient from "../utils/axios";
import { useNavigate } from "react-router-dom";
import CustomTextField from "./CustomTextField";
import { useDispatch } from "react-redux";
import jsCookie from "js-cookie";
import { useRegisterMutation } from "../redux/slices/auth/signUpAuthApiSlice";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";


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

const PHONE_REGEX = /^((\+)?(\d{2}[-]))?(\d{10}){1}?$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@H$%]).{6,24}$/;

const initialValues = {
  id: "",
  fullName: "",
  mobNo: "",
  password: "",
  confPass: "",
  address: "",
  addessType: "",
  showPassword: true,
};

const Register = () => {
  const userRef = useRef();
  const formRef = useRef()
  const errRef = useRef();
 const [form] = Form.useForm();
  // const theme = useTheme();
  const navigate = useNavigate();

 

  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const [register, { isLoading,isSuccess,isError }] = useRegisterMutation();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initialValues);
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };


  useEffect(() => {
    const result = PHONE_REGEX.test(formValues.mobNo);
    setValidPhone(result);
  }, [formValues.mobNo]);

  useEffect(() => {
    const result = PWD_REGEX.test(formValues.password);
    setValidPwd(result);
    // console.log(result);
    // console.log(formValues.password);
    const match = formValues.password == formValues.confPass;
    // console.log(match);
    setValidMatch(match);
  }, [formValues.password, formValues.confPass]);

  useEffect(() => {
    setErrMsg("");
  }, [formValues.fullName, formValues.password, formValues.confPass]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onFinish = async (values) => {
    const v2 = PWD_REGEX.test(formValues.password);
    const v3 = PHONE_REGEX.test(formValues.mobNo);
    console.log(formValues);
    console.log(v2,v3);

    if ( !v2 || !v3) {
      setErrMsg("Inavlid Entry");
      return;
    }

    try {
      const userData = await register({
        name: formValues.fullName,
        mob_no: formValues.mobNo,
        password: formValues.password,
        address_type: values.addressType,
        address: formValues.address,
      }).unwrap();
      console.log(userData);
formRef.current.resetFields();
      window.location.reload()
    } catch (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
      if (!err) {
        setErrMsg("No server Response");
      } else if (err?.status === 409) {
        setErrMsg("Mobile Number already in use");
      } else {
        setErrMsg("Registeration failed");
      }
      errRef.current.focus();
    }
  };
  if(isSuccess) message.success("Success")

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const names = ["HOME", "WORK", "OTHER"];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <>
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
          Register
        </h1>
        <div className="mt-5 grid place-items-center">
          <Form
           ref={formRef}
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
              // label="Full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please Enter Name!",
                },
              ]}
            >
              <Input
                required
                ref={userRef}
                placeholder="Full Name"
                name={formValues.fullName}
                value={formValues.fullName}
                onChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }));
                }}
                className="shadow-md border"
              />
            </Form.Item>
            <Form.Item
              // label="Mobile"
              name="mobile"
              rules={[
                {
                  required: true,
                  min: 10,
                  message: !validPhone
                    ? "Phone number not valid"
                    : "enter phone no",
                },
              ]}
              // hasFeedback={formValues.mobNo ? true : false}
              // validateStatus={validPhone ? "success" : "error"}
            >
              <Input type="tel"
                required
                ref={userRef}
                placeholder="Mobile"
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
              // label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  min: 6,
                },
              ]}
            >
              <Input.Password
                required
                placeholder="Password"
                size="small"
                name={formValues.password}
                value={formValues.password}
                onChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                className="shadow-md border h-15"
              />
            </Form.Item>

            <Form.Item
              // label="Confirm Password"
              name="Confpassword"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  min: 6,
                },
              ]}
            >
              <Input.Password
                required
                placeholder="Confirm Password"
                size="small"
                name={formValues.confPass}
                value={formValues.confPass}
                onChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    confPass: e.target.value,
                  }));
                }}
                className="shadow-md border"
              />
            </Form.Item>
            <Form.Item name="address">
              <Input.TextArea
                name={formValues.address}
                value={formValues.address}
                onChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }));
                }}
                rows={2}
                placeholder="address"
              />
            </Form.Item>
            <Form.Item name="addressType">
              <Select placeholder="addressType">
                {names.map((item) => (
                  <Select.Option key={item} value={item}></Select.Option>
                ))}
              </Select>
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
    </>
  );
};

export default Register;
