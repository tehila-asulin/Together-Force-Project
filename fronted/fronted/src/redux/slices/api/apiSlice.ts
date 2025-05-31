// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const apiSlice = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8800/api/",  // כתובת הבסיס של ה-API שלך
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as any).togetherForce.token;  // שליפה של הטוקן מה-state
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;  // החזרת הכותרות עם הטוקן אם קיים
//     },
//   }),
//   tagTypes: ["TogetherForce"],  
//   endpoints: () => ({}),
// });

// export default apiSlice;
// // import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // import store from '../../store';

// // const apiSlice = createApi({
// //   baseQuery: fetchBaseQuery({
// //     baseUrl: "http://localhost:8800/api/",
// //     prepareHeaders: (headers, { getState }) => {
// //       const token = (getState() as ReturnType<typeof store.getState>).togetherForce.token;
// //       console.log("Token in prepareHeaders:", token);
// //       if (token) {
// //         headers.set("Authorization", `Bearer ${token}`);
// //       }
// //       return headers;
// //     },
// //   }),
// //   tagTypes: ["TogetherForce"],
// //   endpoints: (builder) => ({
// //     // כאן אתה יכול להוסיף אנדפוינטים כלליים אם יש צורך
// //   }),
// // });

// // export default apiSlice;
// In apiSlice.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Cookies } from "react-cookie";

// const cookies = new Cookies();

// const apiSlice = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:9100/api/",
//     credentials: "include",
//     prepareHeaders: (headers) => {
//       const token = cookies.get("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["TogetherForce"],
//   endpoints: () => ({}),
// });

// export default apiSlice;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Cookies } from "react-cookie";

// const cookies = new Cookies();

// const apiSlice = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:9100/api/",
//     credentials: "include",  // חשוב מאוד לשלוח קוקיז עם הבקשה
//     prepareHeaders: (headers) => {
//       const token = cookies.get("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["TogetherForce"],
//   endpoints: () => ({}),
// });

// export default apiSlice;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9100/api/",
    credentials: "include",  // חשוב מאוד לשלוח קוקיז עם הבקשה
    prepareHeaders: (headers) => {
      const token = cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["TogetherForce"], 
  endpoints: () => ({}),
});

export default apiSlice;

