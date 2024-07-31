import { createSlice } from '@reduxjs/toolkit';
import { CommentInterface, ExtendedUser, UserInfoInterface } from '~/libs/interfaces';

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [] as CommentInterface[],
        filmName: '',
        currUser: undefined as UserInfoInterface | undefined,
    },
    reducers: {
        addComments: (state, action) => {
            state.comments.unshift(action.payload);
        },
        removeComments: (state, action) => {
            console.log(action.payload);
            state.comments.splice(action.payload, 1);
        },
        setCurrUser: (state, action) => {
            state.currUser = action.payload;
        },
        setCommentContent: (state, action) => {
            state.comments = action.payload.comments;
            state.filmName = action.payload.filmName;
            state.currUser = action.payload.currUser;
        },
    },
});

export const { addComments, removeComments, setCurrUser, setCommentContent } = commentSlice.actions;

export default commentSlice.reducer;
