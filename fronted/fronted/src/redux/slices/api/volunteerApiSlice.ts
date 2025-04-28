import apiSlice from './apiSlice';

const volunteerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginVolunteer: builder.mutation({
      query: (credentials) => ({
        url: "auth/loginV",
        method: "POST",
        body: credentials
      }),
    })
    ,
    getAllVolunteers: builder.query({
      query: () => "/volunteerRoutes/allVolunteers",
      providesTags: ["TogetherForce"]
    }),
    getVolunteerById: builder.query({
      query: (id) =>`auth/loginV/${id}`,
      providesTags: ["TogetherForce"]
    }),
    createVolunteer: builder.mutation({
      query: (newVolunteer) => ({
        url: "auth/registerV",
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
  useRemoveVolunteerMutation,
  useLoginVolunteerMutation 
} = volunteerApiSlice;

export default volunteerApiSlice;


