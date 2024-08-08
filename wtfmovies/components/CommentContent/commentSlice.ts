import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentInterface, UserInfoInterface } from '~/libs/interfaces';

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [] as CommentInterface[],
        filmName: '',
        currUser: undefined as UserInfoInterface | undefined,
        loading: true,
        full: false,
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
                    commentToUpdate.replyList = [newComment];
                } else {
                    commentToUpdate.replyList.unshift(newComment);
                }
                if (commentToUpdate.replyLength) commentToUpdate.replyLength += 1;
                else commentToUpdate.replyLength = 1;
            }
        },
        removeReply: (state, action) => {
            const { commentId, index } = action.payload;
            const commentToUpdate = state.comments.find((comment) => comment._id === commentId);
            if (commentToUpdate && commentToUpdate.replyList) {
                commentToUpdate.replyList.splice(index, 1);
                if (commentToUpdate.replyLength) commentToUpdate.replyLength -= 1;
            }
        },
        setCommentContent: (state, action) => {
            const { comments, filmName, currUser, likeList } = action.payload;
            const newComments = comments.map((e: CommentInterface) => {
                if (likeList.likeComments && likeList.likeComments.includes(e._id)) {
                    return { ...e, beLike: true }; // Update the comment with 'beLike' property
                } else if (likeList.unlikeComments && likeList.unlikeComments.includes(e._id)) {
                    return { ...e, beUnlike: true }; // Update the comment with 'beUnlike' property
                }
                return e; // Return the original comment if no update is needed
            });

            state.comments = newComments;
            state.filmName = filmName;
            state.currUser = currUser;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setCurrentUser.fulfilled, (state, action) => {
                state.currUser = action.payload as UserInfoInterface;
            })
            .addCase(getCurrReply.fulfilled, (state, action) => {
                const { commentId, data }: { commentId: string; data: CommentInterface[] } = action.payload;

                const commentToUpdate = state.comments.find((comment) => comment._id === commentId);
                if (commentToUpdate) {
                    if (!commentToUpdate.replyList) {
                        commentToUpdate.replyList = data;
                    } else {
                        commentToUpdate.replyList = commentToUpdate.replyList.concat(data);
                    }
                }
            })
            .addCase(getMoreComments.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getMoreComments.fulfilled, (state, action) => {
                const data = action.payload;
                if (data.length === 0) state.full = true;
                state.comments = state.comments.concat(data);
                state.loading = false;
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

export const getCurrReply = createAsyncThunk('comment/getCurrReply', async (prob: { body: any; likeList: any }) => {
    const { body, likeList } = prob;
    const response = await fetch('/api/v1/comment/getMoreReply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data: any = await response.json();

    // update beLike and beUnlike
    const result = data.data.map((e: CommentInterface) => {
        if (likeList.likeComments && likeList.likeComments.includes(e._id)) {
            return { ...e, beLike: true }; // Update the comment with 'beLike' property
        } else if (likeList.unlikeComments && likeList.unlikeComments.includes(e._id)) {
            return { ...e, beUnlike: true }; // Update the comment with 'beUnlike' property
        }
        return e; // Return the original comment if no update is needed
    });

    return { data: result, commentId: body.commentId };
});

export const getMoreComments = createAsyncThunk(
    'comment/getMoreComments',
    async (prob: { body: any; likeList: any }) => {
        const { body, likeList } = prob;
        const response = await fetch('/api/v1/comment/getMoreComment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data: any = await response.json();

        // update beLike and beUnlike
        const result = data.data.map((e: CommentInterface) => {
            if (likeList.likeComments && likeList.likeComments.includes(e._id)) {
                return { ...e, beLike: true }; // Update the comment with 'beLike' property
            } else if (likeList.unlikeComments && likeList.unlikeComments.includes(e._id)) {
                return { ...e, beUnlike: true }; // Update the comment with 'beUnlike' property
            }
            return e; // Return the original comment if no update is needed
        });
        return result;
    },
);

export const { addComments, removeComments, addReply, removeReply, setCommentContent } = commentSlice.actions;

export default commentSlice.reducer;
