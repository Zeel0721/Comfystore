import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Token {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: Token = {
  accessToken: sessionStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    clearToken: (state) => {
      state = {
        accessToken: null,
        refreshToken: null,
      };
    },
  },
});
export const { setAccessToken, setRefreshToken, clearToken } =
  tokenSlice.actions;
export default tokenSlice.reducer;
