export interface ICreateRoomBody {
  userCount: number;
  time: number;
  rounds: number;
}

export interface ICreatedRoom {
  connection_uuid: string;
  max_students_count: number;
  max_round_time: number;
  max_rounds_count: number;
}
