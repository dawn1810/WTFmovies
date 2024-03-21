import { configureStore } from '@reduxjs/toolkit';

import playerSlice from '~/components/Player/playerSlice';
import headerSlice from '~/layouts/components/Header/headerSlice';

const store = configureStore({
    reducer: {
        player: playerSlice,
        header: headerSlice,
    },
});

export default store;
