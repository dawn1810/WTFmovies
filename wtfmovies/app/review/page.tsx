import classNames from 'classnames/bind';

import FilmInfo from '~/components/FilmInfo/FilmInfo';
import CommentContent from '~/components/CommentContent';
import TabBox from '~/components/TabsBox/TabsBox';
import FilmProposeList from '~/components/FilmProposeList';
import style from './Review.module.scss';
import DefaultLayout from '~/layouts/DefaultLayout';

const cx = classNames.bind(style);

const films = [
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
        filmName: 'Jujutsu Kaisen',
        views: '999.999',
        rating: '4.9',
        episodes: '1029',
    },
    {
        imgSrc: '/zdwfbkt301n51.jpg',
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
        <DefaultLayout>
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
        </DefaultLayout>
    );
}

export default Review;
