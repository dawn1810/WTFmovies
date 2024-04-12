import classNames from 'classnames/bind';

import FilmInfo from '~/components/FilmInfo/FilmInfo';
import CommentContent from '~/components/CommentContent';
import TabBox from '~/components/TabsBox/TabsBox';
import FilmProposeList from '~/components/FilmProposeList';
import style from './Review.module.scss';
import DefaultLayout from '~/layouts/DefaultLayout';
import { auth } from '../../api/auth/[...nextauth]/auth';
import { useSearchParams } from 'next/navigation';
import { getFilmReviewInfo } from '~/libs/getData/review';
import { getProposeListFilms } from '~/libs/getData/home';

const cx = classNames.bind(style);

const films = [
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
    {
        img: '/zdwfbkt301n51.jpg',
        name: 'Jujutsu Kaisen',
        views: 999999,
        rating: 4.9,
        episodes: 1029,
    },
];

const commentTabs = [
    {
        title: '#BÌNH LUẬN',
        eventKey: 'comment',
        content: <CommentContent />,
    },
];

async function Review({ params }: { params: { movie: string } }) {
    const session = await auth();
    const { movie } = params;

    const filmReviewInfo = await getFilmReviewInfo(movie.replaceAll('-', ' '));
    const proposeListFilms = await getProposeListFilms();

    return (
        <DefaultLayout currentUser={!!session && !!session?.user}>
            <div className={cx('wrapper')}>
                <div className={cx('home-top')}>
                    <div className={cx('info-content')}>
                        <FilmInfo filmInfo={filmReviewInfo} />
                    </div>
                    <FilmProposeList films={proposeListFilms} />
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
