import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const inputStyle = { width: "275px", height: "35px" };
  const submit = async (e) => {
    axios
      .post("http://localhost:3000/auth/login", e)
      .then((value) => console.log(value.data))
      .catch((error) => console.error(error.response.data.message));
  };

  return (
    <div className="user-form">
      <Form
        name="login"
        id="login-form"
        onFinish={submit}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item className="login-header">
          <h1>Login</h1>
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please enter Username",
            },
          ]}
        >
          <Input style={inputStyle} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please enter Password",
            },
          ]}
        >
          <Input.Password style={inputStyle} />
        </Form.Item>
        <Button id="login-btn" type="primary" htmlType="submit">
          Login
        </Button>
        <Button id="guest-btn" type="default" onClick={() => navigate("/")}>
          Guest Login
        </Button>
        <Form.Item>
          <span className="member-login">
            Not a member yet?
            <Link to="/signup">Register</Link>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
}
