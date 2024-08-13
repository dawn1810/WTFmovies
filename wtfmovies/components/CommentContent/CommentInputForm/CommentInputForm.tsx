'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import { Form } from 'react-bootstrap';
import style from './CommentInputForm.module.scss';
import ImageCustom from '../../ImageCustom';
import Button from '../../Button';
import images from '~/assets/image';
import { ExtendedUser, UserInfoInterface } from '~/libs/interfaces';
import { changeModalShow } from '~/layouts/components/Header/headerSlice';
import { showNotify } from '~/components/Notify/notifySlide';
import { socket } from '~/websocket/websocketService';
import {
    addComments,
    addReply,
    removeComments,
    removeCommentsById,
    removeReplyById,
    setCurrentUser,
    updateComment,
    updateReply,
} from '../commentSlice';
import { commentContentSelector } from '~/redux/selectors';
import { Avatar } from '@mui/material';
import { generateUUIDv4 } from '~/libs/clientFunc';

const cx = classNames.bind(style);
function CommentInputForm() {
    const state = useSelector(commentContentSelector);
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    const { data: session } = useSession();
    const extendedUser: ExtendedUser | undefined = session?.user;
    const [commentInfo, setCommentInfo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // const getUserInfo = async () => {
        //     const response = await fetch('/api/v1/comment/getCommentUserInfo', {
        //         method: 'GET',
        //         headers: { 'Content-Type': 'application/json' },
        //     });

        //     if (response.ok) {
        //         const res = response.json();
        //         return res;
        //     }
        //     if (response.status === 500) {
        //         return undefined;
        //     }
        // };

        // const fetchUserInfo = async () => {
        //     const info = await getUserInfo();

        //     setCurrentUser((prev) => ({ ...prev, ...(info || {}) }));
        // };

        if (!!session) dispatch<any>(setCurrentUser());
    }, [extendedUser]);

    // catch socket event
    useEffect(() => {
        socket.on('newComment', async (message) => {
            const { comment, msgFilmName } = JSON.parse(message);
            if (msgFilmName === state.filmName) addCommentToList(comment);
        });

        socket.on('newReplyComment', async (message) => {
            const { comment, msgFilmName } = JSON.parse(message);
            if (msgFilmName === state.filmName) addCommentToReply(comment);
        });

        socket.on('newEditComment', async (message) => {
            const { parentId, commentId, newContent } = JSON.parse(message);
            if (parentId) dispatch(updateReply({ parentId, commentId, newContent }));
            else dispatch(updateComment({ commentId, newContent }));
        });

        socket.on('newRecallComment', async (message) => {
            const { parentId, commentId } = JSON.parse(message);
            if (parentId) dispatch(removeReplyById({ parentId, commentId }));
            else dispatch(removeCommentsById(commentId));
        });

        return () => {
            socket.off('newComment');
            socket.off('newReplyComment');
            socket.off('newEditComment');
            socket.off('newRecallComment');
        };
    }, [state.filmName]);

    const addCommentToList = (comment: any) => {
        const today = new Date();
        const newComment = { ...comment, time: String(today) };
        dispatch(addComments(newComment));
        return state.comments.length + 1;
    };

    const removeCommentFromList = (index: number) => {
        if (index > -1) dispatch(removeComments(state.comments.length + 1 - index));
    };

    const addCommentToReply = (comment: any) => {
        const today = new Date();
        const newComment = { ...comment, time: String(today) };
        dispatch(addReply({ commentId: comment.parentId, newComment }));
        return state.comments.length + 1;
    };

    const handleInput = (event: any) => {
        if (event.target.name === 'content' && event.target.value > 500) {
            showAlert('Bình luận vượt quá độ dài cho phép', 'warning');
        } else {
            setCommentInfo(event.target.value);
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const content = commentInfo.replace(/\n/g, '<br/>');

        // client check
        if (content.length <= 0) showAlert('Bình luận không hợp lệ', 'error');
        else if (content.length > 500) showAlert('Bình luận vượt quá độ dài cho phép', 'warning');
        else if (!extendedUser || !extendedUser.email) {
            dispatch(changeModalShow(true));
            showAlert('Xin hãy đăng nhập để bình luận', 'info');
        } else {
            setLoading(true);
            let newMegIndex = -1;

            const comment = {
                username: state.currUser?.name,
                content,
            };

            // update to mongodb
            const response = await fetch('/api/v1/comment/sendComment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    searchName: state.filmName,
                    ...comment,
                }),
            });

            // check for
            if (response.ok) {
                const res: any = await response.json();

                const newComment = {
                    ...comment,
                    _id: res.commentId,
                    avatar: state.currUser?.avatar,
                    email: extendedUser.email,
                };

                newMegIndex = addCommentToList(newComment);

                setCommentInfo('');
                // send message to another user
                if (socket.connected) {
                    socket.emit(
                        'comment',
                        JSON.stringify({
                            comment: newComment,
                            filmName: state.filmName,
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
            setLoading(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <Avatar
                    className={cx('avatar')}
                    alt={state.currUser?.name || 'Người ẩn danh'}
                    src={state.currUser?.avatar}
                />
                {/* <ImageCustom className={cx('avatar')} src={currentUser.avatar || images.logo} alt="unknown" /> */}
                <div className={cx('user-name')}>{state.currUser?.name || 'Người ẩn danh'}</div>
            </div>
            <Form className={cx('form')} onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        value={commentInfo}
                        as="textarea"
                        rows={5}
                        placeholder="Viết bình luận của bạn (tối đa 500 ký tự)"
                        name="content"
                        maxLength={500}
                        required
                        spellCheck={false}
                        onChange={(e) => handleInput(e)}
                    />
                </Form.Group>
                <Form.Group className={`mb-3 ${cx('form-bottom')}`} controlId="exampleForm.ControlInput1">
                    <Button primary disabled={loading} leftIcon={<SendOutlinedIcon />} onClick={handleSubmit}>
                        Gửi
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default CommentInputForm;
