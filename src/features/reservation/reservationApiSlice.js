import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const reservationsAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = reservationsAdapter.getInitialState();

export const reservationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query({
      query: () => "/reservation",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedReservations = responseData.map((reservation) => {
          reservation.id = reservation._id;
          return reservation;
        });
        return reservationsAdapter.setAll(initialState, loadedReservations);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Reservation", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Reservation", id })),
          ];
        } else return [{ type: "Reservation", id: "LIST" }];
      },
    }),
    addNewReservation: builder.mutation({
      query: (initialReservation) => ({
        url: "/reservation",
        method: "POST",
        body: {
          ...initialReservation,
        },
      }),
      invalidatesTags: [{ type: "Reservation", id: "LIST" }],
    }),
    updateReservation: builder.mutation({
      query: (initialReservation) => ({
        url: "/reservation",
        method: "PATCH",
        body: {
          ...initialReservation,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Reservation", id: arg.id },
      ],
    }),
    deleteReservation: builder.mutation({
      query: ({ id }) => ({
        url: `/reservation`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Reservation", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useAddNewReservationMutation,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
} = reservationsApiSlice;

// returns the query result object
export const selectReservationsResult =
  reservationsApiSlice.endpoints.getReservations.select();

// creates memoized selector
const selectReservationsData = createSelector(
  selectReservationsResult,
  (reservationsResult) => reservationsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllReservations,
  selectById: selectReservationById,
  selectIds: selectReservationIds,
  // Pass in a selector that returns the notes slice of state
} = reservationsAdapter.getSelectors(
  (state) => selectReservationsData(state) ?? initialState
);
