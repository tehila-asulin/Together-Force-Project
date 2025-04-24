import apiSlice from './apiSlice';

const volunteerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVolunteers: builder.query({
      query: () => "/volunteerRoutes/allVolunteers",
      providesTags: ["TogetherForce"]
    }),
    getVolunteerById: builder.query({
      query: (id) => `/volunteerRoutes/${id}`,
      providesTags: ["TogetherForce"]
    }),
    createVolunteer: builder.mutation({
      query: (newVolunteer) => ({
        url: "/volunteerRoutes/signUpV",
        method: "POST",
        body: newVolunteer
      }),
      invalidatesTags: ["TogetherForce"]
    }),
    editVolunteer: builder.mutation({
      query: (updatedVolunteer) => ({
        url: `/volunteerRoutes/${updatedVolunteer._id}`,
        method: "PUT",
        body: updatedVolunteer
      }),
      invalidatesTags: ["TogetherForce"]
    }),
    removeVolunteer: builder.mutation({
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
  useRemoveVolunteerMutation 
} = volunteerApiSlice;

export default volunteerApiSlice;
