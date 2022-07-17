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
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@H$%]).{8,24}$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

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
  const errRef = useRef();
  const theme = useTheme();
  const navigate = useNavigate()

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

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

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();


  const [formValues, setFormValues] = useState(initialValues);
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  useEffect(() => {
    const result = USER_REGEX.test(formValues.fullName);
    // console.log(result);
    // console.log(formValues.fullName);
    setValidName(result);
  }, [formValues.fullName]);

  useEffect(() => {
    const result = PHONE_REGEX.test(formValues.mobNo);
    // console.log(result);
    // console.log(formValues.mobNo);
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

  const onFinish = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(formValues.fullName);
    const v2 = PWD_REGEX.test(formValues.password);
    const v3 = PHONE_REGEX.test(formValues.mobNo);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Inavlid Entry");
      return;
    }

    try {
      console.log(formValues);

       const userData = await register({
         name: formValues.fullName,
         mob_no: formValues.mobNo,
         password: formValues.password,
         address_type: formValues.addessType,
         address: formValues.address,
       }).unwrap();
       console.log(userData);
      navigate('/auth')
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Mobile Number already in use");
      } else {
        setErrMsg("Registeration failed")
      }
      errRef.current.focus();
    }
  };

  const names = ["HOME", "WORK", "OFFICE"];

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
            <form onSubmit={onFinish} className="grid place-items-center">
              <div className="min-w-[180px] sm:w-[350px] md:w-[400px] max-w-[500px]">
                <FormControl
                  fullWidth
                  sy={{ m: 1 }}
                  className="mt-2"
                  margin="normal"
                >
                  <CustomTextField
                    label="Full Name"
                    ref={userRef}
                    autoComplete="off"
                    name={formValues.fullName}
                    value={formValues.fullName}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }));
                    }}
                    id="custom-css-outlined-input"
                    className="bg-white rounded-xl"
                    type="text"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    required
                  />
                  {/* <p
                className={
                  userFocus && user && !validName
                    ? "bg-yellow-300 rounded-md px-3 py-2 text-center"
                    : "bg-yellow-300/30 rounded-md px-3 py-2 text-center text-green-600 text-sm"
                }
              >
                4 to 25 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed
              </p> */}
                </FormControl>
                <FormControl fullWidth sy={{ m: 1 }} margin="normal">
                  <CustomTextField
                    required
                    label="Mobile Number"
                    id="custom-css-outlined-input"
                    className="bg-white rounded-xl"
                    type="tel"
                    name={formValues.mobNo}
                    value={formValues.mobNo}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        mobNo: e.target.value,
                      }));
                    }}
                  />
                  <p
                    className={
                      !validPhone && formValues.mobNo
                        ? "bg-red-300/50 px-3 py-2 text-center rounded mt-2"
                        : "hidden"
                    }
                  >
                    invalid phone number
                  </p>
                </FormControl>
                <FormControl fullWidth sy={{ m: 1 }} margin="normal">
                  <CustomTextField
                    required
                    id="standard-password-input"
                    label="Password"
                    type="password" 
                    autoComplete="current-password"
                    className="bg-white rounded-xl"
                    name={formValues.password}
                    value={formValues.password}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                  />
                </FormControl>
                <FormControl fullWidth sy={{ m: 1 }} margin="normal">
                  <CustomTextField
                    required
                    id="standard-password-input"
                    label="Confirm Password"
                    type="password"
                    name={formValues.confPass}
                    value={formValues.confPass}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        confPass: e.target.value,
                      }));
                    }}
                    autoComplete="current-password"
                    variant="outlined"
                    className="bg-white rounded-xl"
                  />
                  <p
                    className={
                      !validMatch && formValues.confPass
                        ? "bg-red-300/50 px-3 py-2 text-center rounded mt-2"
                        : "hidden"
                    }
                  >
                    passwordd oesnt match
                  </p>
                </FormControl>

                <FormControl fullWidth sy={{ m: 1 }} margin="normal">
                  <CustomTextField
                    required
                    label="Delivery Address"
                    id="custom-css-outlined-input"
                    className="bg-white rounded-xl"
                    multiline
                    name={formValues.address}
                    value={formValues.address}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }));
                    }}
                  />
                </FormControl>

                <FormControl fullWidth sy={{ m: 1 }} margin="normal">
                  <InputLabel id="addressType">Address Type</InputLabel>
                  <Select
                    required
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    // multiple
                    value={formValues.addessType}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        addessType: e.target.value,
                      }));
                    }}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, formValues.addessType, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <FormControl margin="normal">
                <button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  disabled={
                    !validName || !validPhone || !validMatch || !validPwd
                      ? true
                      : false
                  }
                  className={
                    !validName || !validPhone || !validMatch || !validPwd
                      ? "rounded-3xl self-center bg-red-600/25 text-white w-32 h-10"
                      : "rounded-3xl self-center bg-red-600 text-white w-32 h-10"
                  }
                >
                  Sign Up
                </button>
              </FormControl>
            </form>
          </div>
        </section>
   
    </>
  );
};

export default Register;
