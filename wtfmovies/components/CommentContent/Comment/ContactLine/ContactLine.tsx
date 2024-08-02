'use client';
import classNames from 'classnames/bind';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useViewport } from '~/hooks';

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

const ContactLine = ({ commentId, senderEmail }: { commentId: string; senderEmail: string }) => {
    const { data: session } = useSession();
    const extendedUser: ExtendedUser | undefined = session?.user;

    const state = useSelector(commentContentSelector);
    const dispatch = useDispatch();

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const [likeCount, setLikeCount] = useState<number>(0);
    const [like, setLike] = useState<boolean>(false);
    const [unlike, setUnlike] = useState<boolean>(false);
    const [reply, setReply] = useState<boolean>(false);
    const [replyValue, setReplyValue] = useState<string>('');

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    const addCommentToList = (comment: any) => {
        const today = new Date();
        const newComment = { ...comment, time: String(today) };
        dispatch(addReply({ commentId, newComment }));
        return state.comments.length + 1;
    };

    const removeCommentFromList = (index: number) => {
        // index is count from final element to current element
        if (index > -1) dispatch(removeReply({ commentId, index: state.comments.length + 1 - index }));
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

    const handleChange = (event: any) => {
        setReplyValue(event.target.value);
    };

    const handleReplyShow = () => {
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
            const newMegIndex = addCommentToList(comment);

            // update to mongodb
            const response = await fetch('/api/v1/comment/replyComment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    commentId,
                    ...comment,
                }),
            });

            // check for
            if (response.ok) {
                const res: any = await response.json();

                setReplyValue('');
                // send message to another user
                if (socket.connected) {
                    socket.emit(
                        'replyComment',
                        JSON.stringify({
                            comment: { ...comment, _id: res.commentId },
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
                        <IconButton onClick={handleLike} size="small">
                            {like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                        </IconButton>
                        {likeCount > 0 && <span className="lke-count">{formatNumber(likeCount)}</span>}
                    </div>
                    <IconButton onClick={handleUnlikeLike} size="small">
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
