import { combineReducers } from 'redux';

import { playerSlice } from '~/components/Player/playerSlice';
import { headerSlice } from '~/layouts/components/Header/headerSlice';
import { dataGridComSlice } from '~/components/DataGridCom/dataGridComSlice';
import { registerSlice } from '~/components/RegisterForm/registerSlice';
import { watchSlice } from '~/app/watch/[movieName]/[numEp]/watchSlice';

const rootReducer = combineReducers({
    player: playerSlice,
    header: headerSlice,
    register: registerSlice,
    dataGridCom: dataGridComSlice,
    watch: watchSlice,
});

export default rootReducer;
