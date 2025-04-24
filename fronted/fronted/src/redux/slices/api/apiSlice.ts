import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8800/api/" }),
  tagTypes: ["TogetherForce"],
  endpoints: () => ({})
});

export default apiSlice;
