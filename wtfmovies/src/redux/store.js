import { configureStore } from '@reduxjs/toolkit';

import headerSlice from '~/layouts/components/Header/headerSlice';
import playerSlice from '~/components/Player/playerSlice';

const store = configureStore({
    reducer: {
        header: headerSlice,
        player: playerSlice,
    },
});

export default store;
