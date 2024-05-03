import axios from "axios";

export function refreshAccessToken(refreshToken: string | null) {
  if(!refreshToken) return
  axios
    .get("http://localhost:3000/auth/refresh", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
    .then((value) => {
      sessionStorage.setItem("accessToken", value.data);
    })
    .catch((error) => console.error(error));
  return sessionStorage.getItem("accessToken");
}
