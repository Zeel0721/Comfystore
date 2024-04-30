import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const inputStyle = { width: "275px", height: "35px" };
  const submit = async (e) => {
    axios
      .get("http://localhost:3000/user/login")
      .then((value) => console.table(value));
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
