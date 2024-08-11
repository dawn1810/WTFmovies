'use client';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useViewport } from '~/hooks';
// mui icon
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
// mui component
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import style from '../Comment.module.scss';
import { CommentInterface } from '~/libs/interfaces';
import { timePassed } from '~/libs/clientFunc';
import ContactLine from '../ContactLine';
import ButtonMenu from '../../ButtonMenu';

const cx = classNames.bind(style);

const LIMIT_LENGTH = 150; // The limit for the short version of the text.
const LIMIT_NEWLINES = 2; // The number of <br/> before showing 'expand more'

const ReplyComment = ({ comment }: { comment: CommentInterface }) => {
    const dispatch = useDispatch();

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleShowMore = () => isExpanded || setIsExpanded(true);
    const handleShowLess = () => isExpanded && setIsExpanded(false);

    const newLines = comment.content ? (comment.content.match(/<br\/>/g) || [])?.length : 0;
    const characters = comment.content ? comment.content.length - newLines * 5 : 0;
    const tooManyNewlines = newLines > LIMIT_NEWLINES;
    const tooManyCharacters = characters > LIMIT_LENGTH;
    const shouldShorten = tooManyNewlines || tooManyCharacters;

    const calculateShortVersion = (): string => {
        const splitContent = comment.content.split('<br/>');
        let shortVersion = '';
        for (let i = 0; i <= LIMIT_NEWLINES; i++) {
            if (splitContent[i] && shortVersion.length + splitContent[i].length < LIMIT_LENGTH) {
                shortVersion += splitContent[i] + '<br/>';
            } else if (splitContent[i]) {
                const temp = shortVersion + splitContent[i].substring(0, LIMIT_LENGTH - shortVersion.length) + '...';
                shortVersion = temp;
                break;
            }
        }
        return shortVersion;
    };

    const shownComment = isExpanded ? comment.content : calculateShortVersion();

    // const handleOpenReport = () => {
    //     dispatch(changeFbDialog(true));
    //     dispatch(changeFbDialogType('report'));
    //     dispatch(changeRpContent('bình luận: ' + comment._id));
    // };

    return (
        <div className={cx('reply-comment')}>
            <div className={cx('user-info')}>
                <Avatar src={comment.avatar} alt={comment.username} />
                {isMobile && (
                    <div className={cx('header')}>
                        <div>
                            <div className={cx('user-name')}>{comment.username}</div>
                            <span className={cx('cmt-time')}>{timePassed(comment.time)}</span>
                        </div>
                        <ButtonMenu
                            commentInfo={{
                                senderEmail: comment.email,
                                commentId: comment._id,
                                parentId: comment.parentId,
                                content: comment.content,
                            }}
                        />
                    </div>
                )}
            </div>
            <div className={cx('content')}>
                {isMobile || (
                    <div className={cx('header')}>
                        <div className={cx('cmt-info')}>
                            <h4 style={{ margin: 0 }}>{comment.username}</h4>
                            <span className={cx('cmt-time')}>{timePassed(comment.time)}</span>
                        </div>
                        <ButtonMenu
                            commentInfo={{
                                senderEmail: comment.email,
                                commentId: comment._id,
                                content: comment.content,
                            }}
                        />
                    </div>
                )}
                <div className={cx('comment-group')}>
                    {comment.tag && <Chip label={comment.tag} icon={<AlternateEmailIcon />} />}
                    <div
                        onClick={isExpanded ? handleShowLess : handleShowMore}
                        dangerouslySetInnerHTML={{ __html: shownComment }}
                    />
                </div>
                {comment.edit && <div className={cx('edit-tag')}>(Bình luận đã được sửa chửa)</div>}
                {shouldShorten && !isExpanded ? (
                    <span onClick={handleShowMore} className={cx('read-more-btn')}>
                        Xem thêm
                    </span>
                ) : (
                    shouldShorten &&
                    isExpanded && (
                        <span onClick={handleShowLess} className={cx('read-more-btn')}>
                            Ẩn bớt
                        </span>
                    )
                )}
                <ContactLine
                    commentInfo={{
                        commentId: comment._id,
                        senderEmail: comment.email,
                        parentId: comment.parentId,
                        beLike: comment.beLike,
                        beUnlike: comment.beUnlike,
                        likeNum: comment.like,
                    }}
                />
            </div>
        </div>
    );
};

export default ReplyComment;
