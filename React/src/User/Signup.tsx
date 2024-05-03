import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "../styles/user.css";
import axios from "axios";

export default function Signup() {
  const form: HTMLFormElement|null = document.getElementById("signup-form")as HTMLFormElement
  const submit = async (e: {
    username: string;
    email: string;
    password: string;
  }) => {
    await axios
      .post("http://localhost:3000/user/signup", {
        username: e.username,
        email: e.email,
        password: e.password,
      })
      .catch((error) => console.error(error));
    form?.reset()
  };
  const inputStyle = { width: "275px", height: "35px" };

  return (
    <div className="user-form">
      <Form
        name="signup"
        id="signup-form"
        layout="vertical"
        onFinish={submit}
        autoComplete="off"
      >
        <Form.Item className="signup-header">
          <h1>Register</h1>
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              min: 3,
              message: "Please enter a valid Username",
            },
          ]}
          validateTrigger="onSubmit"
        >
          <Input style={inputStyle} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter a valid Email",
            },
          ]}
          validateTrigger="onSubmit"
        >
          <Input style={inputStyle} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              min: 8,
              message: "Password must be at least 8 characters",
            },
          ]}
          validateTrigger="onSubmit"
        >
          <Input.Password style={inputStyle} />
        </Form.Item>
        <Button id="signup-btn" type="primary" htmlType="submit">
          Sign Up
        </Button>
        <Form.Item>
          <span className="member-login">
            Already a member?
            <Link to="/login">Login</Link>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
}
