'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';

import { useViewport } from '~/hooks';
import ImageCustom from '~/components/ImageCustom';
import style from './Comment.module.scss';
import images from '~/assets/image';
import { CommentInterface } from '~/libs/interfaces';
import { timePassed } from '~/libs/clientFunc';

const cx = classNames.bind(style);

const LIMIT_LENGTH = 150; // The limit for the short version of the text.
const LIMIT_NEWLINES = 2; // The number of <br/> before showing 'expand more'

const Comment = ({ comment }: { comment: CommentInterface }) => {
    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleShowMore = () => setIsExpanded(true);

    const newLines = comment.content ? (comment.content.match(/<br\/>/g) || [])?.length : 0;
    const characters = comment.content ? comment.content.length - newLines * 5 : 0;
    const tooManyNewlines = newLines > LIMIT_NEWLINES;
    const tooManyCharacters = characters > LIMIT_LENGTH;
    const shouldShorten = tooManyNewlines || tooManyCharacters;

    const calculateShortVersion = (): string => {
        const splitContent = comment.content.split('<br/>');
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

    const shownComment = isExpanded ? comment.content : calculateShortVersion();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-info')}>
                <ImageCustom className={cx('avatar')} src={comment.avatar} alt={comment.username} />
                {isMobile && (
                    <div>
                        <div className={cx('user-name')}>{comment.username}</div>
                        <span className={cx('cmt-time')}>{timePassed(comment.time)}</span>
                    </div>
                )}
            </div>
            <div className={cx('content')}>
                {isMobile || (
                    <div>
                        <h3>{comment.username}</h3>
                        <span className={cx('cmt-time')}>{timePassed(comment.time)}</span>
                    </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: shownComment }} />
                {shouldShorten && !isExpanded && (
                    <span onClick={handleShowMore} className={cx('read-more-btn')}>
                        Xem thêm
                    </span>
                )}
            </div>
        </div>
    );
};

export default Comment;
