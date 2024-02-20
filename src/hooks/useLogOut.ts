import { useNavigate } from 'react-router';

import { Paths } from 'src/constants';
import { storage } from 'src/services/StorageService';
import { clearChat } from 'src/store/slices/chatSlice';
import { clearUser } from 'src/store/slices/userSlice';

import useAppDispatch from './useAppDispatch';

const useLogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(clearUser());
    dispatch(clearChat());
    storage.DELETE('access');
    storage.DELETE('refresh');
    navigate(Paths.home);
  };
};

export default useLogOut;
