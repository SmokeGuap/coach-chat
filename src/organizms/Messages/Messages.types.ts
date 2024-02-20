export type TMessage = {
  created_at: string;
  id: number;
  is_locked: boolean;
  is_selected: boolean;
  role: 'trainer' | 'student';
  text: string;
  username: string;
};
