import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Trip {
  id: string;
  startTime: string;
  endTime: string | null;
}

interface TripState {
  activeTrip: Trip | null;
}

const initialState: TripState = {
  activeTrip: null,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    startTrip(state, action: PayloadAction<{ id: string; startTime: string }>) {
      state.activeTrip = {
        id: action.payload.id,
        startTime: action.payload.startTime,
        endTime: null,
      };
    },
    stopTrip(state) {
      if (state.activeTrip) {
        state.activeTrip.endTime = new Date().toISOString();
      }
    },
    resetTrip(state) {
      state.activeTrip = null;
    },
  },
});

export const { startTrip, stopTrip, resetTrip } = tripSlice.actions;
export default tripSlice.reducer;
