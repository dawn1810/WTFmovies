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
import { useSelector } from 'react-redux';
import { commentContentSelector } from '~/redux/selectors';

const cx = classNames.bind(style);

const ContactLine = () => {
    const state = useSelector(commentContentSelector);

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const [likeCount, setLikeCount] = useState<number>(0);
    const [like, setLike] = useState<boolean>(false);
    const [unlike, setUnlike] = useState<boolean>(false);
    const [reply, setReply] = useState<boolean>(false);
    const [replyValue, setReplyValue] = useState<string>('');

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

    const handleReply = (event: any) => {
        event.preventDefault();

        const replyContent = replyValue.replace(/\n/g, '<br/>');
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
                        <Button disabled={replyValue.length === 0} variant="contained" startIcon onClick={handleReply}>
                            Phản hồi
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactLine;
