import { useEffect } from "react";
import { useRefreshTokenMutation } from "./Features/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "./Features/userSlice";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "./Features/tokenSlice";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function RefreshToken() {
  const [refresh] = useRefreshTokenMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = useSelector(
    (state: RootState) => state.token.refreshToken
  );
  const refreshFunction = async () => {
    await refresh()
      .then((value) => {
        dispatch(setRefreshToken(value.data.refreshToken));
        dispatch(setAccessToken(value.data.accessToken));
        dispatch(setUser(value.data.user));
      })
      .catch(() => {
        navigate("/");
      });
  };
  useEffect(() => {
    if (!refreshToken) return;
    (async () => {
      await refreshFunction();
      const timeoutFunction = setInterval(refreshFunction, 1000 * 30);
      return () => clearInterval(timeoutFunction);
    })();
  }, []);
  return null;
}
