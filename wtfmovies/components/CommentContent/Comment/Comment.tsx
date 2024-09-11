'use client';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { useViewport } from '~/hooks';

import style from './Comment.module.scss';
import { CommentInterface, LikeCommentListInterface } from '~/libs/interfaces';
import { timePassed } from '~/libs/clientFunc';
import ContactLine from './ContactLine';
import ReplyComment from './ReplyComment';
import { getCurrReply } from '../commentSlice';
import ButtonMenu from '../ButtonMenu';
import { useSession } from 'next-auth/react';

const cx = classNames.bind(style);
const replys: any[] = [
    // {
    //     _id: '1',
    //     username: 'Cánh cụt',
    //     avatar: 'https://external-preview.redd.it/oGZz2_J2HBzIeKkE1EwgoJ9PRWLKHkJwim13rGIVhCo.jpg?auto=webp&s=e35909b1339259ba04a26a31d825fd762c0c69cf',
    //     content: 'Hãm ak coi hay vậy 🐧🐧🐧',
    //     time: '2024-04-21T04:46:40.675+00:00',
    //     status: true,
    // },
    // {
    //     _id: '2',
    //     username: 'Hổ báo cáo chồn',
    //     avatar: 'https://preview.redd.it/e7a52rf78c291.png?auto=webp&s=9b727cca0fb206a0e7baaaab6bba48d94af3ed68',
    //     content: 'Hay vãi ò.',
    //     time: '2024-05-21T01:27:02.968+00:00',
    //     status: true,
    // },
    // {
    //     _id: '3',
    //     username: 'Báo cha mẹ anh chị ba con cô bác',
    //     avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyAizFaM85rYHrbDMCoz472Ym6hnL6ZPJdkw&s',
    //     content: 'Dcmm phim hay chê cc. siuu cr7 is the GOAT siuuuuuuuuuuuuuuuuuu.',
    //     time: '2024-05-21T15:35:06.983+00:00',
    //     status: true,
    // },
];

const LIMIT_LENGTH = 150; // The limit for the short version of the text.
const LIMIT_NEWLINES = 2; // The number of <br/> before showing 'expand more'

const Comment = ({ comment, likeList }: { comment: CommentInterface; likeList?: LikeCommentListInterface }) => {
    const dispatch = useDispatch();

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [replyShow, setReplyShow] = useState<boolean>(false);
    // const [replyList, setReplyList] = useState<any[]>(replys);

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

    const handleReplyShow = () => {
        if (
            comment.replyLength &&
            (!comment.replyList ||
                (comment.replyList && comment.replyList.length < 10 && comment.replyList.length < comment.replyLength))
        ) {
            dispatch<any>(
                getCurrReply({
                    body: {
                        commentId: comment._id,
                        skip: comment.replyList?.length || 0,
                    },
                    likeList,
                }),
            );
        }
        setReplyShow((prev) => !prev);
    };

    const handleMoreReply = () => {
        if (comment.replyList && comment.replyLength && comment.replyList.length < comment.replyLength)
            dispatch<any>(
                getCurrReply({
                    body: {
                        commentId: comment._id,
                        skip: comment.replyList?.length,
                    },
                    likeList,
                }),
            );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <Avatar src={comment.avatar} alt={comment.username} sx={{ width: 48, height: 48 }} />
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
                                parentId: comment.parentId,
                                content: comment.content,
                            }}
                        />
                    </div>
                )}
                <div
                    onClick={isExpanded ? handleShowLess : handleShowMore}
                    dangerouslySetInnerHTML={{ __html: shownComment }}
                />
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
                {comment.replyLength !== undefined && comment.replyLength > 0 && (
                    <Button
                        className={cx('reply-watch-btn')}
                        variant="text"
                        startIcon={replyShow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        onClick={handleReplyShow}
                    >
                        {comment.replyLength + ' phản hồi'}
                    </Button>
                )}
                {replyShow &&
                    (comment.replyList ? (
                        <>
                            <div className={cx('reply-comment-list')}>
                                {comment.replyList.map((reply, index) => (
                                    <ReplyComment key={index} comment={reply} />
                                ))}
                            </div>
                            {comment.replyLength && comment.replyLength > comment.replyList.length && (
                                <Button
                                    className={cx('reply-watch-btn', 'more-cmt-btn')}
                                    variant="text"
                                    startIcon={<SubdirectoryArrowRightIcon />}
                                    onClick={handleMoreReply}
                                >
                                    Hiễn thị thêm phản hồi
                                </Button>
                            )}
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ))}
            </div>
        </div>
    );
};

export default Comment;
