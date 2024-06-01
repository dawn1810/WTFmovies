'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { AlertColor } from '@mui/material';
import classNames from 'classnames/bind';

import { Form } from 'react-bootstrap';
import style from './CommentInputForm.module.scss';
import ImageCustom from '../../ImageCustom';
import Button from '../../Button';
import images from '~/assets/image';
import { ExtendedUser, UserInfoInterface } from '~/libs/interfaces';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';
import { SendOutlined } from '@mui/icons-material';

const cx = classNames.bind(style);
function CommentInputForm({
    filmName,
    currUser,
    addComment,
}: {
    filmName: string;
    currUser?: UserInfoInterface;
    addComment: any;
}) {
    const dispatch = useDispatch();

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const { data: session } = useSession();
    const extendedUser: ExtendedUser | undefined = session?.user;
    const [currentUser, setCurrentUser] = useState({ avatar: currUser?.avatar, name: currUser?.name });
    const [commentInfo, setCommentInfo] = useState({ name: currUser?.name || '', content: '' });

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

    const handleInput = (event: any) => {
        setCommentInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const comment = {
            avatar: currentUser.avatar,
            username: commentInfo.name,
            content: commentInfo.content.replace(/\n/g, '<br/>'),
        };

        const response = await fetch('/api/v1/comment/sendComment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                searchName: filmName,
                ...comment,
            }),
        });

        if (response.ok) {
            addComment(comment);
            setCommentInfo((prev) => ({ ...prev, content: '' }));
        } else if (response.status === 400) {
            showAlert('Bình luận không hợp lệ', 'error');
        } else if (response.status === 403) {
            showAlert('Xác thực thất bại', 'error');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
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
                        value={commentInfo.content}
                        as="textarea"
                        rows={5}
                        placeholder="Viết bình luận của bạn"
                        name="content"
                        required
                        spellCheck={false}
                        onChange={(e) => handleInput(e)}
                    />
                </Form.Group>
                <Form.Group className={`mb-3 ${cx('form-bottom')}`} controlId="exampleForm.ControlInput1">
                    <Form.Control
                        value={commentInfo.name}
                        type="text"
                        placeholder="Nhập tên của bạn (bắt buộc)"
                        required
                        name="name"
                        onChange={(e) => handleInput(e)}
                    />
                    <Button primary leftIcon={<SendOutlined />} onClick={handleSubmit}>
                        Gửi
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default CommentInputForm;
