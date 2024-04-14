import { configureStore } from '@reduxjs/toolkit';

import playerSlice from '~/components/Player/playerSlice';
import headerSlice from '~/layouts/components/Header/headerSlice';
import signupSlice from '~/app/register/signupSlice';
import dataGridComSlice from '~/components/DataGridCom/dataGridComSlice';
import watchSlice from '~/app/watch/[movieName]/[numEp]/watchSlice';

const store = configureStore({
    reducer: {
        player: playerSlice,
        header: headerSlice,
        signup: signupSlice,
        dataGridCom: dataGridComSlice,
        watch: watchSlice
    },
});

export default store;
