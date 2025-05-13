// src/redux/feedbackApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/' }),
  tagTypes: ['Feedback'],
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: () => 'feedbacks?_sort=date&_order=desc',
      providesTags: ['Feedback'],
    }),
    addFeedback: builder.mutation({
      query: (newFeedback) => ({
        url: 'feedbacks',
        method: 'POST',
        body: newFeedback,
      }),
      invalidatesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `feedbacks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedback'],
    }),
  }),
});

export const { 
  useGetFeedbacksQuery, 
  useAddFeedbackMutation, 
  useDeleteFeedbackMutation 
} = feedbackApi;