import { configureStore } from '@reduxjs/toolkit';

import { userReducer, roomReducer, chatReducer } from './slices';

const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    chat: chatReducer,
  },
  devTools: true,
});

export default store;
