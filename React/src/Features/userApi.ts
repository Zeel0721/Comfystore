import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "user/signup",
        method: "post",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "auth/login",
        method: "post",
        body: user,
      }),
    }),
    refreshToken: builder.mutation<any, void>({
      query: () => ({
        url: "auth/refresh",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useRefreshTokenMutation } =
  userApi;
