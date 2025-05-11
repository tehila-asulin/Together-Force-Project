import apiSlice from './apiSlice';
import { Volunteer } from "../../../interface/Volunteer"

interface VolunteerCredentials {
  email: string;
  password: string;
}

const volunteerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginVolunteer: builder.mutation<{ accessToken: string }, VolunteerCredentials>({
      query: (credentials) => ({
        url: "auth/loginV",
        method: "POST",
        body: credentials
      }),
    }),

    getAllVolunteers: builder.query<Volunteer[], void>({
      query: () => ({
        url: "/volunteerRoutes/allVolunteers",
        method: "GET"
      }),
      providesTags: ["TogetherForce"]
    }),

    getVolunteerById: builder.query<Volunteer, string>({
      query: (id) => `auth/loginV/${id}`,
      providesTags: ["TogetherForce"]
    }),

    createVolunteer: builder.mutation<Volunteer, Volunteer>({
      query: (newVolunteer) => ({
        url: "auth/registerV",
        method: "POST",
        body: newVolunteer
      }),
      invalidatesTags: ["TogetherForce"]
    }),

    editVolunteer: builder.mutation<Volunteer, Volunteer>({
      query: (updatedVolunteer) => ({
        url: `/volunteerRoutes/${updatedVolunteer._id}`,
        method: "PUT",
        body: updatedVolunteer
      }),
      invalidatesTags: ["TogetherForce"]
    }),

    removeVolunteer: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/volunteerRoutes/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["TogetherForce"]
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetAllVolunteersQuery, 
  useGetVolunteerByIdQuery, 
  useCreateVolunteerMutation, 
  useEditVolunteerMutation, 
  useRemoveVolunteerMutation,
  useLoginVolunteerMutation 
} = volunteerApiSlice;

export default volunteerApiSlice;
