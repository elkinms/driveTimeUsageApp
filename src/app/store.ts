import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tripReducer from '../features/trips/tripSlice';
import { authApi } from '../features/auth/authApi.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trip: tripReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
