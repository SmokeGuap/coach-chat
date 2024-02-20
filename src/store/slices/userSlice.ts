import { createSlice } from '@reduxjs/toolkit';

import { getUserInfo } from './userActions';

const initialState = {
  user: { username: '', role: '', room_id: 0, room_uuid: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = initialState.user;
    },
    clearUserRoomUUID: (state) => {
      state.user.room_uuid = initialState.user.room_uuid;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

const { clearUser, clearUserRoomUUID } = userSlice.actions;

export { clearUser, getUserInfo, clearUserRoomUUID };

export default userSlice.reducer;
