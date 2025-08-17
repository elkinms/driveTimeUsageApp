import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';
import type { TripData } from './types';

export const tripsApi = createApi({
  reducerPath: 'tripsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: builder => ({
    getTrips: builder.query<TripData[], { email: string; limit?: number }>({
      query: ({email, limit=5}) => `/trips?email=${email}&limit=${limit}`,
    }),
  }),
});
export const { useGetTripsQuery } = tripsApi;
