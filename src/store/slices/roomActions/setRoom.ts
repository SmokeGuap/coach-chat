import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { ICreateRoomFormValues } from 'src/organizms/CreateRoomForm/CreateRoomForm.types';
import { ICreatedRoom, createRoom } from 'src/services/RoomService';

const setRoom = createAsyncThunk<ICreatedRoom, ICreateRoomFormValues, { rejectValue: { non_field_errors: [] } }>(
  'room/createRoom',
  async (options, thunkAPI) => {
    try {
      const response = await createRoom(options);
      return response;
    } catch (error) {
      if (isAxiosError(error)) return thunkAPI.rejectWithValue(error.response?.data);
      else {
        throw error;
      }
    }
  }
);

export default setRoom;
