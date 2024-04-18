import classNames from 'classnames/bind';

import FilmInfo from '~/components/FilmInfo/FilmInfo';
import CommentContent from '~/components/CommentContent';
import TabBox from '~/components/TabsBox/TabsBox';
import FilmProposeList from '~/components/FilmProposeList';
import style from './Review.module.scss';
import DefaultLayout from '~/layouts/DefaultLayout';
import { getAllFilmsComment, getFilmReviewInfo } from '~/libs/getData/review';
import { getCurrentUserInfo, getProposeListFilms } from '~/libs/getData/home';
import NotFound from '~/app/not-found';

const cx = classNames.bind(style);

async function Review({ params }: { params: { movie: string } }) {
    const { movie } = params;

    const currentUser = await getCurrentUserInfo();
    const filmReviewInfo = await getFilmReviewInfo(movie);
    if (!filmReviewInfo) return NotFound();

    const commentsFilm = await getAllFilmsComment(movie);
    const commentTabs = [
        {
            title: '#BÌNH LUẬN',
            eventKey: 'comment',
            content: <CommentContent comments={commentsFilm} currUser={currentUser} filmName={movie} />,
        },
    ];

    const proposeListFilms = await getProposeListFilms();

    return (
        <DefaultLayout>
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
