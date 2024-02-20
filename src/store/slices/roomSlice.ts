import { createSlice } from '@reduxjs/toolkit';

import { setRoom } from './roomActions';

const initialState = {
  room: {
    connection_uuid: '',
    max_students_count: 0,
    max_round_time: 0,
    max_rounds_count: 0,
  },
  error: { non_field_errors: [] },
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    clearRoom: (state) => {
      state.room = initialState.room;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setRoom.fulfilled, (state, action) => {
        state.room = action.payload;
      })
      .addCase(setRoom.rejected, (state, action) => {
        if (action.payload) state.error = action.payload;
      });
  },
});

const { clearRoom } = roomSlice.actions;

export { clearRoom, setRoom };

export default roomSlice.reducer;
