import classNames from 'classnames/bind';

import Image from '~/components/Image';
import style from './Comment.module.scss';

const cx = classNames.bind(style);

function Comment({ avatar, commentOwner, commentContent }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <Image className={cx('avatar')} src={avatar} alt={commentOwner} />
            </div>
            <div className={cx('content')}>
                <h3>{commentOwner}</h3>
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
