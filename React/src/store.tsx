import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/userSlice";
import tokenReducer from "./Features/tokenSlice";
import themeReducer from "./Features/themeSlice";
import { productApi } from "./Features/productApi";
import { userApi } from "./Features/userApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    theme: themeReducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
