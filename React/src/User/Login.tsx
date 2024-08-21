import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../Features/tokenSlice";
import { useLoginMutation } from "../Features/userApi";
import { setUser } from "../Features/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [form] = Form.useForm();
  const inputStyle = { width: "275px", height: "35px" };
  const submit = async (user: { username: string; password: string }) => {
    await login(user)
      .then((value) => {
        dispatch(setRefreshToken(value.data.refreshToken));
        dispatch(setAccessToken(value.data.accessToken));
        dispatch(setUser(value.data.user));
        navigate("/");
      })
      .catch((error) => console.error(error.response.data.message));
    form.resetFields();
  };

  return (
    <div className="user-form">
      <Form
        name="login"
        id="login-form"
        form={form}
        onFinish={submit}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item className="my-4">
          <h1 className="text-3xl">Login</h1>
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
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
        <Button id="guest-btn" onClick={() => navigate("/")}>
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
