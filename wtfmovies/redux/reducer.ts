import { combineReducers } from 'redux';

import { playerSlice } from '~/components/Player/playerSlice';
import { headerSlice } from '~/layouts/components/Header/headerSlice';

const rootReducer = combineReducers({
    player: playerSlice,
    header: headerSlice,
});

export default rootReducer;
