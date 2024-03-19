'use client';
import classNames from 'classnames/bind';

import { useViewport } from '~/hooks';
import ImageCustom from '~/components/ImageCustom';
import style from './Comment.module.scss';

const cx = classNames.bind(style);

function Comment({ avatar, commentOwner, commentContent }) {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <ImageCustom className={cx('avatar')} src={avatar} alt={commentOwner} />
                {isMobile && <div className={cx('user-name')}>{commentOwner}</div>}
            </div>
            <div className={cx('content')}>
                {isMobile || <h3>{commentOwner}</h3>}
                <div
                    dangerouslySetInnerHTML={{
                        __html: commentContent,
                    }}
                />
            </div>
        </div>
    );
}

export default Comment;
