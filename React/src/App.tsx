import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Store/Home";
import About from "./Store/About";
import Products from "./Store/Products";
import Cart from "./Store/Cart";
import Login from "./User/Login";
import Signup from "./User/Signup";
import {
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import axios from "axios";
import { refreshAccessToken } from "./functions";
import { Provider } from "react-redux";
import { store } from "./store";
import Order from "./Store/Order";
import Checkout from "./Store/Checkout";
import { ThemeProvider, createTheme } from "@mui/material";

const GlobalContext = createContext<SetStateAction<any | null> | string | null>(
  null
);
export const globalContext = () => useContext(GlobalContext);

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = createTheme({ palette: { mode: mode } });
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [accessToken, setAccessToken] = useState<string | null>();
  const [user, setUser] = useState();
  useLayoutEffect(() => {
    (async () => {
      setAccessToken(sessionStorage.getItem("accessToken"));
      setRefreshToken(localStorage.getItem("refreshToken"));
      if (!accessToken || accessToken == undefined) {
        const token = refreshAccessToken(refreshToken);
        setAccessToken(token);
      } else if (accessToken) {
        await axios
          .get("http://localhost:3000/auth", {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((value) => setUser(value.data.username))
          .catch((error) => error);
      }
    })();
  }, [accessToken]);

  return (
    <Provider store={store}>
      <GlobalContext.Provider
        value={{ accessToken, setAccessToken, user, setMode }}
      >
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
      </GlobalContext.Provider>
    </Provider>
  );
}
