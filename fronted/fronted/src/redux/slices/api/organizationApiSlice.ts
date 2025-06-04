
import apiSlice from './apiSlice';
import { Organization } from '../../../interface/Organization';

interface OrganizationCredentials {
  email: string;
  password: string;
}

interface OrganizationLoginResponse {
  organization: Organization;
  accessToken: string;
}
const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginOrganization: builder.mutation<OrganizationLoginResponse, OrganizationCredentials>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),

    getAllOrganizations: builder.query<Organization[], void>({
      query: () => ({
        url: "/organizationRoutes/allOrganizations",
        method: "GET",
      }),
      providesTags: ["TogetherForce"],
    }),

    getOrganizationByNumber: builder.query<Organization, string>({
      query: (id) => ({
        url: `/organizationRoutes/${id}`,
        method: "GET",
      }),
      providesTags: ["TogetherForce"],
    }),

    createOrganization: builder.mutation<OrganizationLoginResponse, FormData>({
      query: (formData) => ({
        url: 'auth/register',
        method: 'POST',
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ['TogetherForce'],
    }),

   editOrganization: builder.mutation<OrganizationLoginResponse, FormData>({
   query: (updatedOrganization) => ({
    url: `/organizationRoutes/${updatedOrganization.get('_id')}`, 
    method: "PUT",
    body: updatedOrganization,
    credentials: "include",
  }),
  invalidatesTags: ["TogetherForce"],
}),


    removeOrganization: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/organizationRoutes/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["TogetherForce"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllOrganizationsQuery,
  useGetOrganizationByNumberQuery,
  useCreateOrganizationMutation,
  useEditOrganizationMutation,
  useRemoveOrganizationMutation,
  useLoginOrganizationMutation,
} = organizationApiSlice;

export default organizationApiSlice;
