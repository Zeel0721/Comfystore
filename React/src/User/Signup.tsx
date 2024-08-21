import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "../styles/user.css";
import { useSignupMutation } from "../Features/userApi";

export default function Signup() {
  const [form] = Form.useForm();
  const [signup] = useSignupMutation();
  const submit = async (user: {
    username: string;
    email: string;
    password: string;
  }) => {
    await signup(user);
    form.resetFields();
  };
  const inputStyle = { width: "275px", height: "35px" };

  return (
    <div className="user-form">
      <Form
        name="signup"
        id="signup-form"
        form={form}
        layout="vertical"
        onFinish={submit}
        autoComplete="off"
      >
        <Form.Item className="my-4">
          <h1 className="text-3xl">Register</h1>
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
