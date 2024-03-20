import { combineReducers } from 'redux';

import { playerSlice } from '~/components/Player/playerSlice';

const rootReducer = combineReducers({
    player: playerSlice,
});

export default rootReducer;
