import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FilterOption, Products } from "../types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/product/",
  }),
  endpoints: (builder) => ({
    getFeaturedProduct: builder.query<Products[], void>({
      query: () => ({
        url: "/get",
        method: "get",
      }),
    }),
    getFilter: builder.query<FilterOption, void>({
      query: () => ({
        url: "/getfilter",
        method: "get",
      }),
    }),
    getProduct: builder.mutation<{ products: Products[]; total: number }, any>({
      query: (filter) => ({
        url: "/filter",
        method: "get",
        params: filter,
      }),
    }),
  }),
});

export const {
  useGetFeaturedProductQuery,
  useGetFilterQuery,
  useGetProductMutation,
} = productApi;
