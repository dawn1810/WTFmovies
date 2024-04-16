'use client';
import classNames from 'classnames/bind';

import { Form } from 'react-bootstrap';
import style from './CommentInputForm.module.scss';
import ImageCustom from '../../ImageCustom';
import Button from '../../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/image';
import { ExtendedUser, UserInfoInterface } from '~/libs/interfaces';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const cx = classNames.bind(style);
function CommentInputForm({ filmName, currUser }: { filmName: string; currUser?: UserInfoInterface }) {
    const { data: session } = useSession();
    const extendedUser: ExtendedUser | undefined = session?.user;
    const [currentUser, setCurrentUser] = useState({ avatar: currUser?.avatar, name: currUser?.name });
    const [commentInfo, setCommentInfo] = useState({ name: '', content: '' });

    useEffect(() => {
        const getUserInfo = async () => {
            const response = await fetch('/api/comment/getCommentUserInfo', {
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

    const handleSubmit = (event: any) => {
        event.preventDefault();

        async () => {
            const response = await fetch('/api/comment/getCommentUserInfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filmName: filmName,
                    user_id: extendedUser?.user_id,
                    avatar: currentUser.avatar,
                    name: commentInfo.name,
                    content: commentInfo.content.replace(/\n/g, '<br/>'),
                }),
            });

            if (response.ok) {
                // eeee
            }
        };
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
                    <Button primary leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}>
                        Gửi
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default CommentInputForm;
