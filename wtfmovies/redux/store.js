import { configureStore } from '@reduxjs/toolkit';

import playerSlice from '~/components/Player/playerSlice';

const store = configureStore({
    reducer: {
        player: playerSlice,
    },
});

export default store;
