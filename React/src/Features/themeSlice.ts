import { createSlice } from "@reduxjs/toolkit";

export type Theme = "dark" | "light";

const initialState =
  (localStorage.getItem("theme") as "light" | "dark") || "light";

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state) => (state = state === "light" ? "dark" : "light"),
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
