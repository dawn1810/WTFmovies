import { combineReducers } from 'redux';

import { playerSlice } from '~/components/Player/playerSlice';
import { headerSlice } from '~/layouts/components/Header/headerSlice';
import { filmManagerSlice } from '~/components/FilmManager/filmManagerSlice';
import { registerSlice } from '~/components/RegisterForm/registerSlice';
import { watchSlice } from '~/app/(root)/watch/[movieName]/[numEp]/watchSlice';
import { profileSlice } from '~/components/ProfileForm/profileSlice';
import { notifySlice } from '~/components/Notify/notifySlide';

const rootReducer = combineReducers({
    player: playerSlice,
    header: headerSlice,
    register: registerSlice,
    editor: filmManagerSlice,
    watch: watchSlice,
    profile: profileSlice,
    notify: notifySlice,
});

export default rootReducer;
