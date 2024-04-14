import { combineReducers } from 'redux';

import { playerSlice } from '~/components/Player/playerSlice';
import { headerSlice } from '~/layouts/components/Header/headerSlice';
import { dataGridComSlice } from '~/components/DataGridCom/dataGridComSlice';
import { signupSlice } from '~/app/register/signupSlice';
import { watchSlice } from '~/app/watch/[movieName]/[numEp]/watchSlice';

const rootReducer = combineReducers({
    player: playerSlice,
    header: headerSlice,
    signup: signupSlice,
    dataGridCom: dataGridComSlice,
    watch: watchSlice
});

export default rootReducer;
