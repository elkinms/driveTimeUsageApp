import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UserRequest } from './types';
import {API_BASE_URL} from '../../utils/constants.ts';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL}),
  endpoints: (builder) => ({
    login: builder.mutation<User, UserRequest>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<User, UserRequest>({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
