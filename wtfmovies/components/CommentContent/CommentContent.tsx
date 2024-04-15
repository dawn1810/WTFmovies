'use client';
import classNames from 'classnames/bind';

import style from './CommentContent.module.scss';
import CommentInputForm from './CommentInputForm';
import Comment from './Comment';
import { CommentInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);

function CommentContent({ comments }: { comments: CommentInterface[] }) {
    return (
        <div className={cx('wrapper')}>
            <CommentInputForm />
            <div className={cx('comment-list')}>
                {comments.map((comment, index) => (
                    <Comment
                        key={index}
                        avatar={comment.avatar}
                        commentOwner={comment.username}
                        commentContent={comment.content}
                    />
                ))}
                {!comments.length && <div className={cx('no-comment')}>Không có bình luận</div>}
            </div>
        </div>
    );
}

export default CommentContent;
