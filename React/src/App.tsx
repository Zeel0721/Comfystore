import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Store/Home";
import About from "./Store/About";
import Products from "./Store/Products";
import Cart from "./Store/Cart";
import Login from "./User/Login";
import Signup from "./User/Signup";
import { useLayoutEffect } from "react";
import Order from "./Store/Order";
import Checkout from "./Store/Checkout";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import RefreshToken from "./RefreshToken";

export default function App() {
  const accessToken = useSelector(
    (state: RootState) => state.token.accessToken
  );
  const refreshToken = useSelector(
    (state: RootState) => state.token.refreshToken
  );
  const themeMode = useSelector((state: RootState) => state.theme);

  useLayoutEffect(() => {
    if (!accessToken || !refreshToken) return;
    console.log(accessToken, refreshToken);
    localStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("accessToken", accessToken);
  }, [accessToken, refreshToken]);

  useLayoutEffect(() => {
    localStorage.setItem("theme", themeMode);
    themeMode === "light"
      ? document.body.classList.remove("dark")
      : document.body.classList.add("dark");
  }, [themeMode]);

  console.log(accessToken, refreshToken);
  return (
    <>
      <RefreshToken />
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
    </>
  );
}
