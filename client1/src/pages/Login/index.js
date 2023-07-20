import React from "react";
import { Form, Input, Button, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import "./Login.css";
import { useContext } from "react";
import { userContext } from "../../Context/userContext";
const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { setUsername, setUserID } = useContext(userContext);

  axios.defaults.withCredentials = true;

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(BASE_URL + "/signin", values);
      if (res.data.loggedIn) {
        console.log("Data updated successfully:", res.data);

        setUsername(res.data.username);
        setUserID(res.data.userID);

        navigate("/user/dashboard", { state: res.data });
      } else {
        form.setFields([
          {
            name: "password",
            errors: ["Incorrect username or password"],
          },
        ]);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      form.setFields([
        {
          name: "password",
          errors: ["Incorrect username or password"],
        },
      ]);
    }
  };

  return (
    <div className="login-container">
      <Title level={2}>Sign In</Title>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
      <p>
        <a href="/dashboard">Take Survey as Anonymous</a>
      </p>
    </div>
  );
};

export default Login;
