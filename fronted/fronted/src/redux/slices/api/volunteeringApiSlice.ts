import apiSlice from './apiSlice';
import { Volunteering } from '../../../interface/Volunteering'

const volunteeringApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFilteredVolunteering: builder.query<Volunteering[], any>({
   query: (params) => ({
    url: '/volunteeringRoutes/filter',
    method: 'POST',
    body: params,
  }),
  providesTags: ['TogetherForce'],
}),

    getAllVolunteering: builder.query<Volunteering[], void>({
      query: () => "/volunteeringRoutes/allVolunteering",
      providesTags: ["TogetherForce"]
    }),

    getVolunteeringById: builder.query<Volunteering, string>({
      query: (id) => `volunteeringRoutes/${id}`,
      providesTags: ["TogetherForce"]
    }),

    createVolunteering: builder.mutation<Volunteering, Partial<Volunteering>>({
      query: (newVolunteer) => ({
        url: "/volunteeringRoutes/addVolunteering",
        method: "POST",
        body: newVolunteer
      }),
      invalidatesTags: ["TogetherForce"]
    }),

    editVolunteering: builder.mutation<Volunteering, Volunteering>({
      query: (updatedVolunteer) => ({
        url: `/volunteeringRoutes/${updatedVolunteer._id}`,
        method: "PUT",
        body: updatedVolunteer
      }),
      invalidatesTags: ["TogetherForce"]
    }),

    removeVolunteering: builder.mutation<{ message: string }, string>({
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
  useRemoveVolunteeringMutation,
  useGetFilteredVolunteeringQuery 
} = volunteeringApiSlice;

export default volunteeringApiSlice;
