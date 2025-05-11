import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8800/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).togetherForce.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["TogetherForce"],
  endpoints: () => ({}),
});

export default apiSlice;
