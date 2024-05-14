import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  username?: string;
}

const initialState: User | null = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearUser: (state) => {
      state = {};
    },
  },
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
