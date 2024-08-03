'use client';
import classNames from 'classnames/bind';

import style from './CommentContent.module.scss';
import CommentInputForm from './CommentInputForm';
import Comment from './Comment';
import { CommentInterface, UserInfoInterface } from '~/libs/interfaces';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentContentSelector } from '~/redux/selectors';
import { setCommentContent } from './commentSlice';

const cx = classNames.bind(style);

function CommentContent({
    comments,
    filmName,
    currUser,
}: {
    comments: CommentInterface[];
    filmName: string;
    currUser?: UserInfoInterface | undefined;
}) {
    const state = useSelector(commentContentSelector);
    const dispatch = useDispatch();

    // get all data first
    useEffect(() => {
        dispatch(
            setCommentContent({
                comments: comments,
                filmName: filmName,
                currUser: currUser,
            }),
        );
    }, []);

    return (
        <div className={cx('wrapper')}>
            <CommentInputForm />
            <div className={cx('comment-list')}>
                {state.comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                ))}
                {!state.comments.length && <div className={cx('no-comment')}>Không có bình luận</div>}
            </div>
        </div>
    );
}

export default CommentContent;
