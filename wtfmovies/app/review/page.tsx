'use client';
import classNames from 'classnames/bind';

import FilmInfo from '~/components/FilmInfo/FilmInfo';
import CommentContent from '~/components/CommentContent';
import TabBox from '~/components/TabsBox/TabsBox';
import FilmProposeList from '~/components/FilmProposeList';
import style from './Review.module.scss';

const cx = classNames.bind(style);

const films = [
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: 'https://i.redd.it/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
];

const commentTabs = [
    {
        title: '#BÌNH LUẬN',
        eventKey: 'comment',
        content: <CommentContent />,
    },
];

function Review() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('home-top')}>
                <div className={cx('info-content')}>
                    <FilmInfo />
                </div>
                <FilmProposeList films={films} />
            </div>
            <TabBox
                tabs={commentTabs}
                commentContent
                textContent
                defaultActiveKey="comment"
                className={cx('tab-box')}
            />
        </div>
    );
}

export default Review;
