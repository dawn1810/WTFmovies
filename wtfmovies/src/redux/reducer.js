import { combineReducers } from 'redux';

import { headerSlice } from '~/layouts/components/Header/headerSlice';
import { playerSlice } from '~/components/Player/playerSlice';

const rootReducer = combineReducers({
    header: headerSlice,
    player: playerSlice,
});

export default rootReducer;
