import apiSlice from './apiSlice';

const organizationApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    getAllOrganizations: builder.query({
      query: () => "/organizationRoutes/AllOrganizations",
      providesTags: ["TogetherForce"]
    }),
    getOrganizationById: builder.query({
      query: (id) => `/organizationRoutes/${id}`,
      providesTags: ["TogetherForce"]
    }),
    createOrganization: builder.mutation({
      query: (newOrganization) => ({
        // url: "/organizationRoutes/signUpO",
        url: "auth/register",
        method: "POST",
        body: newOrganization
      }),
      invalidatesTags: ["TogetherForce"]
      
    }),
    editOrganization: builder.mutation({
      query: (updatedOrganization) => ({
        url: `/organizationRoutes/${updatedOrganization._id}`,
        method: "PUT",
        body: updatedOrganization
      }),
      invalidatesTags: ["TogetherForce"]
    }),
    removeOrganization: builder.mutation({
      query: (id) => ({
        url: `/organizationRoutes/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["TogetherForce"]
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetAllOrganizationsQuery, 
  useGetOrganizationByIdQuery, 
  useCreateOrganizationMutation, 
  useEditOrganizationMutation, 
  useRemoveOrganizationMutation 
} = organizationApiSlice;

export default organizationApiSlice;
