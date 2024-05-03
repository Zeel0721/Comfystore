import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Store/Home";
import About from "./Store/About";
import Products from "./Store/Products";
import Cart from "./Store/Cart";
import Login from "./User/Login";
import Signup from "./User/Signup";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();
export const globalContext = () => useContext(GlobalContext);

export default function App() {
  const [refreshToken, setRefreshToken] = useState();
  const [accessToken, setAccessToken] = useState();
  const [user, setUser] = useState();
  useLayoutEffect(() => {
    (() => {
      setAccessToken(sessionStorage.getItem("accessToken"));
      setRefreshToken(localStorage.getItem("refreshToken"));
      if (!accessToken) return;
      axios
        .get("http://localhost:3000/auth", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((value) => setUser(value.data.username))
        .catch(() =>
          axios
            .get("http://localhost:3000/auth/refresh", {
              headers: { Authorization: `Bearer ${refreshToken}` },
            })
            .then((value) => {
              sessionStorage.setItem("accessToken", value.data);
              setAccessToken(value.data);
            })
            .catch((error) => console.error(error))
        );
    })();
  }, [][accessToken]);

  return (
    <GlobalContext.Provider value={{ accessToken, setAccessToken, user }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Products" element={<Products />} />
          <Route path="Cart" element={<Cart />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </GlobalContext.Provider>
  );
}
