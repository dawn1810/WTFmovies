import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentInterface, UserInfoInterface } from '~/libs/interfaces';

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
            state.comments.splice(action.payload, 1);
        },
        addReply: (state, action) => {
            const { commentId, newComment } = action.payload;
            const commentToUpdate = state.comments.find((comment) => comment._id === commentId);
            if (commentToUpdate) {
                if (!commentToUpdate.replyList) {
                    commentToUpdate.replyList = [];
                }
                commentToUpdate.replyList.unshift(newComment);
            }
        },
        removeReply: (state, action) => {
            const { commentId, index } = action.payload;
            const commentToUpdate = state.comments.find((comment) => comment._id === commentId);
            if (commentToUpdate && commentToUpdate.replyList) {
                commentToUpdate.replyList.splice(index, 1);
            }
        },
        // setReplyList: (state, action) => {
        //     const commentId = action.payload.commentId; // Assuming you have a way to determine the specific comment
        //     const commentToUpdate = state.comments.find((comment) => comment._id === commentId);

        //     if (commentToUpdate) {
        //         commentToUpdate.replyList = action.payload;
        //     } else {
        //         // Handle the case where the comment does not exist
        //     }
        // },
        setCommentContent: (state, action) => {
            state.comments = action.payload.comments;
            state.filmName = action.payload.filmName;
            state.currUser = action.payload.currUser;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setCurrentUser.fulfilled, (state, action) => {
            state.currUser = action.payload as UserInfoInterface;
        });
    },
});

export const setCurrentUser = createAsyncThunk('comment/setCurrentUser', async () => {
    const response = await fetch('/api/v1/comment/getCommentUserInfo', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const res = await response.json();
    return res;
});

export const { addComments, removeComments, addReply, removeReply, setCommentContent } = commentSlice.actions;

export default commentSlice.reducer;
