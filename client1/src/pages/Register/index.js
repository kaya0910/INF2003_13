import React, { useContext } from "react";
import { Form, Input, Button, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import "./Register.css";
import { userContext } from "../../Context/userContext";

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { setUsername, setUserID } = useContext(userContext);

  axios.defaults.withCredentials = true;

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(BASE_URL + "/signup", values);
      console.log("Data updated successfully:", res.data);

      setUsername(res.data.username);
      setUserID(res.data.userID);

      navigate("/user/dashboard");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Custom validation to check if the passwords match
  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match."));
    },
  });

  return (
    <div className="register-container">
      <Title level={2}>Sign Up</Title>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Please enter your country" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            validateConfirmPassword,
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <p>
        Already have an account? <a href="/signin">Log In</a>
      </p>
      <p>
        <a href="/dashboard">Take Survey as Anonymous</a>
      </p>
    </div>
  );
};

export default Register;
