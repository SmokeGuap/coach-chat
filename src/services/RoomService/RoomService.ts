import { isAxiosError } from 'axios';

import agent from 'src/agent';

import { ICreateRoomBody, ICreatedRoom } from './RoomService.types';

export const createRoom = async (createRoomBody: ICreateRoomBody): Promise<ICreatedRoom> => {
  try {
    const response = await agent.POST('rooms/create', {
      max_students_count: createRoomBody.userCount,
      max_rounds_count: createRoomBody.rounds,
      max_round_time: createRoomBody.time,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    } else {
      throw new Error('Server error');
    }
  }
};
