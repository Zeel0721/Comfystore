import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Token {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

const initialState: Token = {
  accessToken: sessionStorage.getItem("accessToken") || undefined,
  refreshToken: localStorage.getItem("refreshToken") || undefined,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    clearToken: (state) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
  },
});
export const { setAccessToken, setRefreshToken, clearToken } =
  tokenSlice.actions;
export default tokenSlice.reducer;
