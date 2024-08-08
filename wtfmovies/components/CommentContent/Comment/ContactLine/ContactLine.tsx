'use client';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useDebounce, useViewport } from '~/hooks';

import style from '../Comment.module.scss';
import { formatNumber } from '~/libs/clientFunc';
import { useDispatch, useSelector } from 'react-redux';
import { commentContentSelector } from '~/redux/selectors';
import { showNotify } from '~/components/Notify/notifySlide';
import { ExtendedUser } from '~/libs/interfaces';
import { useSession } from 'next-auth/react';
import { changeModalShow } from '~/layouts/components/Header/headerSlice';
import { socket } from '~/websocket/websocketService';
import { addReply, removeReply } from '../../commentSlice';

const cx = classNames.bind(style);

const ContactLine = ({
    commentInfo,
}: {
    commentInfo: {
        commentId: string;
        senderEmail: string;
        parentId?: string;
        beLike?: boolean;
        beUnlike?: boolean;
        likeNum?: number;
    };
}) => {
    const { data: session } = useSession();
    const extendedUser: ExtendedUser | undefined = session?.user;
    const { commentId, senderEmail, parentId, beLike, beUnlike, likeNum } = commentInfo;

    const state = useSelector(commentContentSelector);
    const dispatch = useDispatch();

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const isFirstRender = useRef(true);
    // const usetoLike = state.likeList.likeComments ? state.likeList.likeComments.include(extendedUser?.email) : false;

    const [likeCount, setLikeCount] = useState<number>(likeNum || 0);
    const [like, setLike] = useState<boolean>(beLike || false);
    const [unlike, setUnlike] = useState<boolean>(beUnlike || false);
    const [reply, setReply] = useState<boolean>(false);
    const [replyValue, setReplyValue] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const likeDebounce = useDebounce(like, 500);
    const unlikeDebounce = useDebounce(unlike, 500);

    useEffect(() => {
        if (isFirstRender.current) return;

        const fetchApi = async () => {
            setLoading(true);
            const response = await fetch('/api/v1/comment/likeComment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ commentId, like: likeDebounce, filmName: state.filmName }),
            });

            if (response.ok) {
                setLoading(false);
            } else if (response.status === 400) {
                showAlert('Yêu thích bình luận thất bại!', 'error');
            } else if (response.status === 403) {
                dispatch(changeModalShow(true));
                showAlert('Xác thực thất bại, đăng nhập để yêu thích bình luận này', 'info');
            } else if (response.status === 500) {
                showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
        };

        fetchApi();
    }, [likeDebounce]);

    useEffect(() => {
        if (isFirstRender.current) return;

        const fetchApi = async () => {
            setLoading(true);
            const response = await fetch('/api/v1/comment/unlikeComment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ commentId, unlike: unlikeDebounce, filmName: state.filmName }),
            });

            if (response.ok) {
                setLoading(false);
            } else if (response.status === 400) {
                showAlert('Yêu thích bình luận thất bại!', 'error');
            } else if (response.status === 403) {
                dispatch(changeModalShow(true));
                showAlert('Xác thực thất bại, đăng nhập để yêu thích bình luận này', 'info');
            } else if (response.status === 500) {
                showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
        };

        fetchApi();
    }, [unlikeDebounce]);

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    const addCommentToList = (comment: any) => {
        const today = new Date();
        const newComment = { ...comment, time: String(today) };
        dispatch(addReply({ commentId: comment.parentId, newComment }));
        return state.comments.length + 1;
    };

    const removeCommentFromList = (index: number) => {
        // index is count from final element to current element
        if (index > -1) dispatch(removeReply({ commentId, index: state.comments.length + 1 - index }));
    };

    const handleLike = async () => {
        isFirstRender.current = false;
        setLike((prev) => !prev);
        setLikeCount((prev) => (like ? prev - 1 : prev + 1));
        if (unlike) setUnlike(false);
    };

    const handleUnlikeLike = () => {
        isFirstRender.current = false;
        setUnlike((prev) => !prev);
        if (like) {
            setLikeCount((prev) => prev - 1);
            setLike(false);
        }
    };

    const handleChange = (event: any) => {
        setReplyValue(event.target.value);
    };

    const handleReplyShow = () => {
        setReplyValue(parentId ? '@' + senderEmail + ' ' : '');
        setReply((prev) => !prev);
    };

    const handleReply = async (event: any) => {
        event.preventDefault();
        const content = replyValue.replace(/\n/g, '<br/>');

        // client check
        if (content.length <= 0) showAlert('Bình luận không hợp lệ', 'error');
        else if (content.length > 500) showAlert('Bình luận vượt quá độ dài cho phép', 'warning');
        else if (!extendedUser || !extendedUser?.email) {
            dispatch(changeModalShow(true));
            showAlert('Xin hãy đăng nhập để bình luận', 'info');
        } else {
            const comment = {
                avatar: state.currUser?.avatar,
                username: state.currUser?.name,
                content,
            };

            let newMegIndex = -1;

            // update to mongodb
            const response = await fetch('/api/v1/comment/replyComment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    commentId: parentId || commentId,
                    ...comment,
                }),
            });

            // check for
            if (response.ok) {
                const res: any = await response.json();
                const newReply = {
                    ...comment,
                    _id: res.commentId,
                    parentId: parentId || commentId,
                };

                setReplyValue('');

                newMegIndex = addCommentToList(newReply);

                // send message to another user
                if (socket.connected) {
                    socket.emit(
                        'replyComment',
                        JSON.stringify({
                            comment: newReply,
                            filmName: state.filmName,
                            receiver: senderEmail,
                        }),
                    );
                } else {
                    console.error('WebSocket connection not open.');
                }
            } else {
                if (response.status === 400) {
                    showAlert('Bình luận không hợp lệ', 'error');
                } else if (response.status === 401) {
                    showAlert('Bình luận vượt quá độ dài cho phép', 'warning');
                } else if (response.status === 403) {
                    dispatch(changeModalShow(true));
                    showAlert('Xin hãy đăng nhập để bình luận', 'info');
                } else if (response.status === 500) {
                    showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
                }
                removeCommentFromList(newMegIndex);
            }
        }
    };

    return (
        <>
            <div className={cx('contact-line')}>
                <div className={cx('btn-list')}>
                    <div className="like-btn">
                        <IconButton onClick={handleLike} size="small" disabled={loading}>
                            {like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                        </IconButton>
                        {likeCount > 0 && <span className="lke-count">{formatNumber(likeCount)}</span>}
                    </div>
                    <IconButton onClick={handleUnlikeLike} size="small" disabled={loading}>
                        {unlike ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                    </IconButton>
                </div>
                <div className={cx('cmt-time', 'cmt-reply', 'noselect')} onClick={handleReplyShow}>
                    Phản hồi
                </div>
            </div>
            {reply && (
                <div className={cx('reply-container')}>
                    <div className={cx('input-container')}>
                        <Avatar alt={state.currUser?.name || 'unknown'} src={state.currUser?.avatar} />
                        <TextField
                            variant="standard"
                            placeholder="Phản hồi"
                            value={replyValue}
                            multiline
                            fullWidth
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('btn-list')}>
                        <Button variant="text" onClick={() => setReply(false)}>
                            Huỷ
                        </Button>
                        <Button disabled={replyValue.length === 0} variant="contained" onClick={handleReply}>
                            Phản hồi
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactLine;
