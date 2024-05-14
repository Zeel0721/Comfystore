import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Store/Home";
import About from "./Store/About";
import Products from "./Store/Products";
import Cart from "./Store/Cart";
import Login from "./User/Login";
import Signup from "./User/Signup";
import { useLayoutEffect } from "react";
import axios from "axios";
import { refreshAccessToken } from "./functions";
import Order from "./Store/Order";
import Checkout from "./Store/Checkout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setUser } from "./Features/user";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { setAccessToken } from "./Features/token";

export default function App() {
  const accessToken = useSelector(
    (state: RootState) => state.token.accessToken
  );
  const refreshToken = useSelector(
    (state: RootState) => state.token.refreshToken
  );
  const themeMode = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const theme = createTheme({ palette: { mode: themeMode } });

  useLayoutEffect(() => {
    if (!accessToken || !refreshToken) return;
    localStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("accessToken", accessToken);
  }, [accessToken, refreshToken]);

  useLayoutEffect(() => {
    (async () => {
      if (!accessToken || accessToken == undefined) {
        if (!refreshToken) return;
        const token = refreshAccessToken(refreshToken);
        dispatch(setAccessToken(token));
      } else if (accessToken) {
        await axios
          .get("http://localhost:3000/auth", {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((value) => dispatch(setUser(value.data.username)))
          .catch(() => {
            if (!refreshToken) return;
            const token = refreshAccessToken(refreshToken);
            dispatch(setAccessToken(token));
          });
      }
    })();
  }, [accessToken]);

  useLayoutEffect(() => {
    localStorage.setItem("theme", themeMode);
    themeMode === "light"
      ? document.body.classList.remove("dark")
      : document.body.classList.add("dark");
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Products" element={<Products />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order" element={<Order />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ThemeProvider>
  );
}
