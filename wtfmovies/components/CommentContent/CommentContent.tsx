'use client';
import classNames from 'classnames/bind';

import style from './CommentContent.module.scss';
import CommentInputForm from './CommentInputForm';
import Comment from './Comment';
import { CommentInterface, UserInfoInterface } from '~/libs/interfaces';
import { useState } from 'react';

const cx = classNames.bind(style);

function CommentContent({
    comments,
    filmName,
    currUser,
}: {
    comments: CommentInterface[];
    filmName: string;
    currUser?: UserInfoInterface;
}) {
    const [commentList, setCommentList] = useState(comments);

    const addComment = (comment: CommentInterface) => {
        setCommentList((prev) => [comment, ...prev]);
    };

    return (
        <div className={cx('wrapper')}>
            <CommentInputForm filmName={filmName} currUser={currUser} addComment={addComment} />
            <div className={cx('comment-list')}>
                {commentList.map((comment, index) => (
                    <Comment
                        key={index}
                        avatar={comment.avatar}
                        commentOwner={comment.username}
                        commentContent={comment.content}
                    />
                ))}
                {!commentList.length && <div className={cx('no-comment')}>Không có bình luận</div>}
            </div>
        </div>
    );
}

export default CommentContent;
