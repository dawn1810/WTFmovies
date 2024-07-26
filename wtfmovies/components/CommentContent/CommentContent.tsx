'use client';
import classNames from 'classnames/bind';

import style from './CommentContent.module.scss';
import CommentInputForm from './CommentInputForm';
import Comment from './Comment';
import { CommentInterface, UserInfoInterface } from '~/libs/interfaces';
import { useEffect, useState } from 'react';

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

    // useEffect(() => {
    //     const handleNewMessage = (event: any) => {
    //         const newMessage = event.detail;
    //         console.log(newMessage);

    //         // Update the UI with the new message
    //     };

    //     document.addEventListener('newMessage', handleNewMessage);

    //     return () => {
    //         document.removeEventListener('newMessage', handleNewMessage);
    //     };
    // }, []);

    const addComment = (comment: CommentInterface) => {
        const today = new Date();
        const newComment = { ...comment, time: String(today) };
        setCommentList((prev) => [newComment, ...prev]);
        return commentList.length + 1;
    };

    const removeComment = (index: number) => {
        // index is count from final element to current element
        if (index > -1) setCommentList((prev) => prev.splice(prev.length - index, 1));
    };

    return (
        <div className={cx('wrapper')}>
            <CommentInputForm filmName={filmName} currUser={currUser} addComment={addComment} />
            <div className={cx('comment-list')}>
                {commentList.map((comment, index) => (
                    <Comment key={index} comment={comment} avt={currUser?.avatar} name={currUser?.name} />
                ))}
                {!commentList.length && <div className={cx('no-comment')}>Không có bình luận</div>}
            </div>
        </div>
    );
}

export default CommentContent;
