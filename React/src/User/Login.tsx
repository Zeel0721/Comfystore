import { Form, Input } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../Features/token";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputStyle = { width: "275px", height: "35px" };
  const submit = async (e: { username: string; password: string }) => {
    axios
      .post("http://localhost:3000/auth/login", e)
      .then((value) => {
        dispatch(setRefreshToken(value.data.refreshToken));
        dispatch(setAccessToken(value.data.accessToken));
        navigate("/");
      })
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
        <Button
          id="login-btn"
          color="secondary"
          variant="contained"
          type="submit"
        >
          Login
        </Button>
        <Button
          id="guest-btn"
          variant="contained"
          onClick={() => navigate("/")}
        >
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
