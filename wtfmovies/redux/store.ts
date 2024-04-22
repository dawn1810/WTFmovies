import { configureStore } from '@reduxjs/toolkit';

import playerSlice from '~/components/Player/playerSlice';
import headerSlice from '~/layouts/components/Header/headerSlice';
import registerSlice from '~/components/RegisterForm/registerSlice';
import dataGridComSlice from '~/components/DataGridCom/dataGridComSlice';
import watchSlice from '~/app/watch/[movieName]/[numEp]/watchSlice';
import profileSlice from '~/components/ProfileForm/profileSlice';

const store = configureStore({
    reducer: {
        player: playerSlice,
        header: headerSlice,
        register: registerSlice,
        dataGridCom: dataGridComSlice,
        watch: watchSlice,
        profile: profileSlice,
    },
});

export default store;
