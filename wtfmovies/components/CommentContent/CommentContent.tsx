'use client';
import classNames from 'classnames/bind';

import style from './CommentContent.module.scss';
import CommentInputForm from './CommentInputForm';
import Comment from './Comment';
import { CommentInterface, LikeCommentListInterface, UserInfoInterface } from '~/libs/interfaces';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentContentSelector } from '~/redux/selectors';
import { getMoreComments, setCommentContent } from './commentSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const cx = classNames.bind(style);

function CommentContent({
    comments,
    filmName,
    currUser,
    likeList,
}: {
    comments: CommentInterface[];
    filmName: string;
    currUser?: UserInfoInterface | undefined;
    likeList?: LikeCommentListInterface;
}) {
    const state = useSelector(commentContentSelector);
    const dispatch = useDispatch();

    // get all data first
    useEffect(() => {
        dispatch(
            setCommentContent({
                comments,
                filmName,
                currUser,
                likeList,
            }),
        );
    }, []);

    const handleScroll = (e: any) => {
        const bottom = Math.abs(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight)) <= 1;
        if (bottom && !state.full && !state.loading) {
            dispatch<any>(
                getMoreComments({
                    body: {
                        filmName,
                        skip: state.comments.length,
                    },
                    likeList,
                }),
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            <CommentInputForm />
            <div className={cx('comment-list')} onScroll={handleScroll}>
                {state.comments.map((comment, index) => (
                    <Comment key={index} comment={comment} likeList={likeList} />
                ))}
                {state.loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                )}
                {!state.loading && !state.comments.length && <div className={cx('no-comment')}>Không có bình luận</div>}
            </div>
        </div>
    );
}

export default CommentContent;
