import { TypedUseSelectorHook, useSelector } from 'react-redux';

import store from 'src/store';

const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = (state) => useSelector(state);

export default useAppSelector;
