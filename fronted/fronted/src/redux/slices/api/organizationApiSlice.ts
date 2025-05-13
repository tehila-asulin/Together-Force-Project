// // import apiSlice from './apiSlice';
// // import { Organization } from '../../../interface/Organization'; 

// // interface OrganizationCredentials {
// //   email: string;
// //   password: string;
// // }

// // const organizationApiSlice = apiSlice.injectEndpoints({
// //   endpoints: (builder) => ({
// //     loginOrganization: builder.mutation<{ accessToken: string }, OrganizationCredentials>({
// //       query: (credentials) => ({
// //         url: "auth/login",
// //         method: "POST",
// //         body: credentials
// //       }),
// //     }),

// //     getAllOrganizations: builder.query<Organization[], void>({
// //       query: () => ({
// //         url: "/organizationRoutes/allOrganizations",
// //         method: "GET"
// //       }),
// //       providesTags: ["TogetherForce"]
// //     }),

// //     getOrganizationById: builder.query<Organization, string>({
// //       query: (id) => `/organizationRoutes/${id}`,
// //       providesTags: ["TogetherForce"]
// //     }),

// //     createOrganization: builder.mutation<Organization, Organization>({
// //       query: (newOrganization) => ({
// //         url: "auth/register",
// //         method: "POST",
// //         body: newOrganization
// //       }),
// //       invalidatesTags: ["TogetherForce"]
// //     }),

// //     editOrganization: builder.mutation<Organization, Organization>({
// //       query: (updatedOrganization) => ({
// //         url: `/organizationRoutes/${updatedOrganization._id}`,
// //         method: "PUT",
// //         body: updatedOrganization
// //       }),
// //       invalidatesTags: ["TogetherForce"]
// //     }),

// //     removeOrganization: builder.mutation<{ message: string }, string>({
// //       query: (id) => ({
// //         url: `/organizationRoutes/${id}`,
// //         method: "DELETE"
// //       }),
// //       invalidatesTags: ["TogetherForce"]
// //     }),
// //   }),
// //   overrideExisting: false,
// // });

// // export const { 
// //   useGetAllOrganizationsQuery, 
// //   useGetOrganizationByIdQuery, 
// //   useCreateOrganizationMutation, 
// //   useEditOrganizationMutation, 
// //   useRemoveOrganizationMutation,
// //   useLoginOrganizationMutation
// // } = organizationApiSlice;

// // export default organizationApiSlice;
// import apiSlice from './apiSlice';
// import { Organization } from '../../../interface/Organization';

// interface OrganizationCredentials {
//   email: string;
//   password: string;
// }

// const organizationApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     loginOrganization: builder.mutation<{
//       organization: any; accessToken: string }, OrganizationCredentials>({
//       query: (credentials) => ({
//         url: "auth/login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),

//     getAllOrganizations: builder.query<Organization[], void>({
//       query: () => ({
//         url: "/organizationRoutes/allOrganizations",
//         method: "GET",
//       }),
//       providesTags: ["TogetherForce"],
//     }),

//     getOrganizationById: builder.query<Organization, string>({
//       query: (id) => ({
//         url: `/organizationRoutes/${id}`,
//         method: "GET",
//       }),
//       providesTags: ["TogetherForce"],
//     }),

//     // createOrganization: builder.mutation<Organization, Organization>({
//     //   query: (newOrganization) => ({
//     //     url: "auth/register",
//     //     method: "POST",
//     //     body: newOrganization,
//     //   }),
//     //   invalidatesTags: ["TogetherForce"],
//     // }),
//     createOrganization: builder.mutation<any, FormData>({
//   query: (formData) => ({
//     url: "auth/register",
//     method: "POST",
//     body: formData,
//   }),
//   invalidatesTags: ["TogetherForce"],
// }),


//     editOrganization: builder.mutation<Organization, Organization>({
//       query: (updatedOrganization) => ({
//         url: `/organizationRoutes/${updatedOrganization._id}`,
//         method: "PUT",
//         body: updatedOrganization,
//       }),
//       invalidatesTags: ["TogetherForce"],
//     }),

//     removeOrganization: builder.mutation<{ message: string }, string>({
//       query: (id) => ({
//         url: `/organizationRoutes/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["TogetherForce"],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useGetAllOrganizationsQuery,
//   useGetOrganizationByIdQuery,
//   useCreateOrganizationMutation,
//   useEditOrganizationMutation,
//   useRemoveOrganizationMutation,
//   useLoginOrganizationMutation,
// } = organizationApiSlice;

// export default organizationApiSlice;
import apiSlice from './apiSlice';
import { Organization } from '../../../interface/Organization';

interface OrganizationCredentials {
  email: string;
  password: string;
}

const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginOrganization: builder.mutation<{ organization: any; accessToken: string }, OrganizationCredentials>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getAllOrganizations: builder.query<Organization[], void>({
      query: () => ({
        url: "/organizationRoutes/allOrganizations",
        method: "GET",
      }),
      providesTags: ["TogetherForce"],
    }),

    getOrganizationById: builder.query<Organization, string>({
      query: (id) => ({
        url: `/organizationRoutes/${id}`,
        method: "GET",
      }),
      providesTags: ["TogetherForce"],
    }),

createOrganization: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: 'auth/register',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['TogetherForce'],
    }),


    editOrganization: builder.mutation<Organization, Organization>({
      query: (updatedOrganization) => ({
        url: `/organizationRoutes/${updatedOrganization._id}`,
        method: "PUT",
        body: updatedOrganization,
      }),
      invalidatesTags: ["TogetherForce"],
    }),

    removeOrganization: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/organizationRoutes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TogetherForce"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useCreateOrganizationMutation,
  useEditOrganizationMutation,
  useRemoveOrganizationMutation,
  useLoginOrganizationMutation,
} = organizationApiSlice;

export default organizationApiSlice;
