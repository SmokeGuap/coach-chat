import { useDispatch } from 'react-redux';

import store from 'src/store';

const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default useAppDispatch;
