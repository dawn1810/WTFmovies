'use client';
import classNames from 'classnames/bind';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useDispatch } from 'react-redux';
import { useViewport } from '~/hooks';
import ImageCustom from '~/components/ImageCustom';

import style from './Comment.module.scss';
import { CommentInterface } from '~/libs/interfaces';
import { formatNumber, timePassed } from '~/libs/clientFunc';
import { changeFbDialog, changeFbDialogType, changeRpContent } from '~/redux/actions';

const cx = classNames.bind(style);

const LIMIT_LENGTH = 150; // The limit for the short version of the text.
const LIMIT_NEWLINES = 2; // The number of <br/> before showing 'expand more'

const Comment = ({ comment }: { comment: CommentInterface }) => {
    const dispatch = useDispatch();

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [like, setLike] = useState<boolean>(false);
    const [unlike, setUnlike] = useState<boolean>(false);

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

    const handleOpenReport = () => {
        dispatch(changeFbDialog(true));
        dispatch(changeFbDialogType('report'));
        dispatch(changeRpContent('bình luận: ' + comment._id));
    };

    const handleLike = () => {
        setLike((prev) => !prev);
        setLikeCount((prev) => (like ? prev - 1 : prev + 1));
        if (unlike) setUnlike(false);
    };

    const handleUnlikeLike = () => {
        setUnlike((prev) => !prev);
        if (like) {
            setLikeCount((prev) => prev - 1);
            setLike(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <ImageCustom className={cx('avatar')} src={comment.avatar} alt={comment.username} />
                {isMobile && (
                    <div className={cx('header')}>
                        <div>
                            <div className={cx('user-name')}>{comment.username}</div>
                            <span className={cx('cmt-time')}>{timePassed(comment.time)}</span>
                        </div>
                        <IconButton onClick={handleOpenReport}>
                            <FlagOutlinedIcon />
                        </IconButton>
                    </div>
                )}
            </div>
            <div className={cx('content')}>
                {isMobile || (
                    <div className={cx('header')}>
                        <div>
                            <h3>{comment.username}</h3>
                            <span className={cx('cmt-time')}>{timePassed(comment.time)}</span>
                        </div>
                        <IconButton onClick={handleOpenReport}>
                            <FlagOutlinedIcon />
                        </IconButton>
                    </div>
                )}
                <div
                    onClick={isExpanded ? handleShowLess : handleShowMore}
                    dangerouslySetInnerHTML={{ __html: shownComment }}
                />
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
                <div className={cx('contact-line')}>
                    <div className={cx('btn-list')}>
                        <div className="like-btn">
                            <IconButton onClick={handleLike}>
                                {like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                            </IconButton>
                            {likeCount > 0 && <span className="lke-count">{formatNumber(likeCount)}</span>}
                        </div>
                        <IconButton onClick={handleUnlikeLike}>
                            {unlike ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                        </IconButton>
                    </div>
                    <div className={cx('cmt-time', 'cmt-reply')}>Phản hồi</div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
