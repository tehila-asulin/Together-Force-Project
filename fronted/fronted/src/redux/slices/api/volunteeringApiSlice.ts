import apiSlice from './apiSlice';

const volunteeringApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getAllVolunteering: builder.query({
      query: () => "/volunteeringRoutes/allVolunteering",
      providesTags: ["TogetherForce"]
    }),
    getVolunteeringById: builder.query({
      query: (id) =>`volunteeringRoutes/${id}`,
      providesTags: ["TogetherForce"]
    }),
    createVolunteering: builder.mutation({
      query: (newVolunteer) => ({
        url: "volunteeringRoutes/addVolunteering",
        method: "POST",
        body: newVolunteer
      }),
      invalidatesTags: ["TogetherForce"]
    }),
    editVolunteering: builder.mutation({
      query: (updatedVolunteer) => ({
        url: `/volunteeringRoutes/${updatedVolunteer._id}`,
        method: "PUT",
        body: updatedVolunteer
      }),
      invalidatesTags: ["TogetherForce"]
    }),
    removeVolunteering: builder.mutation({
      query: (id) => ({
        url: `/volunteeringRoutes/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["TogetherForce"]
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetAllVolunteeringQuery, 
  useGetVolunteeringByIdQuery, 
  useCreateVolunteeringMutation, 
  useEditVolunteeringMutation, 
  useRemoveVolunteeringMutation 
} = volunteeringApiSlice;

export default volunteeringApiSlice;


