import { combineReducers } from 'redux';

import { playerSlice } from '~/components/Player/playerSlice';
import { headerSlice } from '~/layouts/components/Header/headerSlice';
import { signupSlice } from '~/app/signup/signupSlice';
import { dataGridComSlice } from '~/components/DataGridCom/dataGridComSlice';

const rootReducer = combineReducers({
    player: playerSlice,
    header: headerSlice,
    signup: signupSlice,
    dataGridCom: dataGridComSlice
});

export default rootReducer;
