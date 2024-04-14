'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';

import { useViewport } from '~/hooks';
import ImageCustom from '~/components/ImageCustom';
import style from './Comment.module.scss';
import images from '~/assets/image';

const cx = classNames.bind(style);

const LIMIT_LENGTH = 150; // The limit for the short version of the text.
const LIMIT_NEWLINES = 2; // The number of <br/> before showing 'expand more'

const Comment = ({
    avatar,
    commentOwner,
    commentContent,
}: {
    avatar?: string;
    commentOwner: string;
    commentContent: string;
}) => {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleShowMore = () => setIsExpanded(true);

    const newLines = commentContent ? (commentContent.match(/<br\/>/g) || [])?.length : 0;
    const characters = commentContent ? commentContent.length - newLines * 5 : 0;
    const tooManyNewlines = newLines > LIMIT_NEWLINES;
    const tooManyCharacters = characters > LIMIT_LENGTH;
    const shouldShorten = tooManyNewlines || tooManyCharacters;

    const calculateShortVersion = (): string => {
        const splitContent = commentContent.split('<br/>');
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

    const shownComment = isExpanded ? commentContent : calculateShortVersion();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <ImageCustom className={cx('avatar')} src={avatar} alt={commentOwner} />
                {isMobile && <div className={cx('user-name')}>{commentOwner}</div>}
            </div>
            <div className={cx('content')}>
                {isMobile || <h3>{commentOwner}</h3>}
                <div dangerouslySetInnerHTML={{ __html: shownComment }} />
                {shouldShorten && !isExpanded && (
                    <span onClick={handleShowMore} className={cx('read-more-btn')}>
                        ...Xem thêm
                    </span>
                )}
            </div>
        </div>
    );
};

export default Comment;
