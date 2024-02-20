import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chat: {
    current_round: 0,
    is_allowed_to_send_message: null,
    max_round_time: 0,
    max_rounds_count: 0,
    max_students_count: 0,
    messages: [],
    training_start_status: '',
    type: '',
    users: [],
  },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChat: (state) => {
      state.chat = initialState.chat;
    },
    updateChat: (state, action) => {
      state.chat = action.payload;
    },
    addUsers: (state, action) => {
      state.chat.users = action.payload;
    },
  },
});

const { clearChat, updateChat, addUsers } = chatSlice.actions;

export { clearChat, updateChat, addUsers };

export default chatSlice.reducer;
