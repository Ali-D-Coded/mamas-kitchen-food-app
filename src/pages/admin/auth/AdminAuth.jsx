import {
  Alert,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Spin,
  Typography,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import jsCookie from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../../../redux/slices/auth/adminAuthApiSlice";
import { setCredentials } from "../../../redux/slices/auth/authSlice";
import { useDispatch } from "react-redux";

const { Title } = Typography;

const AdminAuth = () => {
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  const [errMsg, setErrMsg] = useState("");

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const userData = await loginAdmin({
        email: values.email,
        password: values.password,
      }).unwrap();
      console.log(userData);
      dispatch(
        setCredentials({
          user: userData.user,
          accessToken: userData.token,
          role: userData.user.role,
        })
      );

      // jsCookie.set("token", userData.token);
      navigate("/admin/dashboard");
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
    <div className="grid place-items-center h-screen">
      <Spin size="large" />
    </div>
  ) : (
    <div className="grid place-items-center h-screen">
      <Card className="shadow-md">
        <Title className="text-center">Login</Title>
        <div className="my-5" ref={errRef}>
          {errMsg && (
            <Alert
              message="Error"
              description={errMsg}
              type="error"
              showIcon
                className="my-5"
                closable
            />
          )}
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full"
            >
              Log in
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
  return content;
};

export default AdminAuth;
