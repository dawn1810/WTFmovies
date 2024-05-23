import { configureStore } from '@reduxjs/toolkit';

import playerSlice from '~/components/Player/playerSlice';
import headerSlice from '~/layouts/components/Header/headerSlice';
import registerSlice from '~/components/RegisterForm/registerSlice';
import filmManagerSlice from '~/components/FilmManager/filmManagerSlice';
import watchSlice from '~/app/(root)/watch/[movieName]/[numEp]/watchSlice';
import profileSlice from '~/components/ProfileForm/profileSlice';
import evaluateSlise from '~/components/EvaluateTable/evaluateSlise';
import notifySlice from '~/components/Notify/notifySlide';

const store = configureStore({
    reducer: {
        player: playerSlice,
        header: headerSlice,
        register: registerSlice,
        dataGridCom: filmManagerSlice,
        watch: watchSlice,
        profile: profileSlice,
        evaluate: evaluateSlise,
        notify: notifySlice,
    },
});

export default store;
