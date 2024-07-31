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
import { addComments, removeComments } from '../commentSlice';
import { commentContentSelector } from '~/redux/selectors';

const cx = classNames.bind(style);
function CommentInputForm() {
    const state = useSelector(commentContentSelector);
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    const { data: session } = useSession();
    const extendedUser: ExtendedUser | undefined = session?.user;
    const [currentUser, setCurrentUser] = useState({ avatar: state.currUser?.avatar, name: state.currUser?.name });
    const [commentInfo, setCommentInfo] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            const response = await fetch('/api/v1/comment/getCommentUserInfo', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const res = response.json();
                return res;
            }
            if (response.status === 500) {
                return undefined;
            }
        };

        const fetchUserInfo = async () => {
            const info = await getUserInfo();

            setCurrentUser((prev) => ({ ...prev, ...(info || {}) }));
        };

        if (!!session) fetchUserInfo();
    }, [extendedUser]);

    // catch socket event
    useEffect(() => {
        socket.on('newComment', async (message) => {
            const { comment, msgFilmName } = JSON.parse(message);
            if (msgFilmName === state.filmName) addCommentToList(comment);
        });

        return () => {
            socket.off('newComment');
        };
    }, []);

    const addCommentToList = (comment: any) => {
        const today = new Date();
        const newComment = { ...comment, time: String(today) };
        dispatch(addComments(newComment));
        // setCommentList((prev) => [newComment, ...prev]);
        return state.comments.length + 1;
    };

    const removeCommentFromList = (index: number) => {
        // index is count from final element to current element

        if (index > -1) dispatch(removeComments(state.comments.length + 1 - index));

        // setCommentList((prev) => {
        //     const newList = prev.filter((_, idx) => idx !== prev.length - index);
        //     return newList;
        // });
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
        const today = new Date();

        // client check
        if (content.length <= 0) showAlert('Bình luận không hợp lệ', 'error');
        else if (content.length > 500) showAlert('Bình luận vượt quá độ dài cho phép', 'warning');
        else if (!extendedUser || !extendedUser?.email) {
            dispatch(changeModalShow(true));
            showAlert('Xin hãy đăng nhập để bình luận', 'info');
        } else {
            const comment = {
                avatar: currentUser.avatar,
                username: currentUser.name,
                content,
            };
            const newMegIndex = addCommentToList(comment);

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
                setCommentInfo('');
                // send message to another user
                if (socket.connected) {
                    socket.emit('comment', JSON.stringify({ comment, filmName: state.filmName, receiver: [] }));
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
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <ImageCustom className={cx('avatar')} src={currentUser.avatar || images.logo} alt="unknown" />
                <div className={cx('user-name')}>{currentUser.name || 'Người ẩn danh'}</div>
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
                    <Button primary leftIcon={<SendOutlinedIcon />} onClick={handleSubmit}>
                        Gửi
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default CommentInputForm;
