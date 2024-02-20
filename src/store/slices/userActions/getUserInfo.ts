import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import agent from 'src/agent';

const getUserInfo = createAsyncThunk('auth/getUserInfo', async (options, thunkAPI) => {
  try {
    const response = await agent.GET('auth/user');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data);
    } else {
      throw new Error('Server error');
    }
  }
});

export default getUserInfo;
