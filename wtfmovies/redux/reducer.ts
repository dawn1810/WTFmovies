import { combineReducers } from 'redux';

import { playerSlice } from '~/components/Player/playerSlice';
import { headerSlice } from '~/layouts/components/Header/headerSlice';
import { dataGridComSlice } from '~/components/DataGridCom/dataGridComSlice';
import { registerSlice } from '~/components/RegisterForm/registerSlice';
import { watchSlice } from '~/app/(root)/watch/[movieName]/[numEp]/watchSlice';
import { profileSlice } from '~/components/ProfileForm/profileSlice';

const rootReducer = combineReducers({
    player: playerSlice,
    header: headerSlice,
    register: registerSlice,
    dataGridCom: dataGridComSlice,
    watch: watchSlice,
    profile: profileSlice,
});

export default rootReducer;
