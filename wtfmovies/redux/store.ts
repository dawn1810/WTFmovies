import { configureStore } from '@reduxjs/toolkit';

import playerSlice from '~/components/Player/playerSlice';
import headerSlice from '~/layouts/components/Header/headerSlice';
import signupSlice from '~/app/signup/signupSlice';

const store = configureStore({
    reducer: {
        player: playerSlice,
        header: headerSlice,
        signup: signupSlice,
    },
});

export default store;
