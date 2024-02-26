import { combineReducers } from 'redux';

import { headerSlice } from '~/layouts/components/Header/headerSlice';

const rootReducer = combineReducers({
    header: headerSlice,
});

export default rootReducer;
