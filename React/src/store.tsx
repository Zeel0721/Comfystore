import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/user";
import tokenReducer from "./Features/token";
import themeReducer from "./Features/theme";

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
