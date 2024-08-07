import classNames from 'classnames/bind';

import FilmInfo from '~/components/FilmInfo/FilmInfo';
import CommentContent from '~/components/CommentContent';
import TabBox from '~/components/TabsBox/TabsBox';
import FilmProposeList from '~/components/FilmProposeList';
import style from './Review.module.scss';
// import DefaultLayout from '~/layouts/DefaultLayout';
import { getAllFilmsComment, getFilmReviewInfo } from '~/libs/getData/review';
import { getCurrentUserInfo, getProposeListFilms, getUserLoveFilm } from '~/libs/getData/home';
import NotFound from '~/app/(root)/not-found';
import { Metadata, ResolvingMetadata } from 'next/types';

const cx = classNames.bind(style);

export async function generateMetadata(
    { params }: { params: { movie: string } },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    //get Param
    const { movie } = params;
    const filmReviewInfo = await getFilmReviewInfo(movie);

    return {
        title: `Thông tin phim ${filmReviewInfo?.name}`,
    };
}
async function Review({ params }: { params: { movie: string } }) {
    const { movie } = params;

    const currentUser = await getCurrentUserInfo();
    const filmReviewInfo = await getFilmReviewInfo(movie);
    const loveFilms = await getUserLoveFilm();
    const proposeListFilms = await getProposeListFilms();
    if (!filmReviewInfo || !proposeListFilms) return NotFound();

    const commentsFilm = await getAllFilmsComment(movie);
    // const likeCommentList = await getAllFilmsComment(movie);
    const commentTabs = [
        {
            title: '#BÌNH LUẬN',
            eventKey: 'comment',
            content: <CommentContent comments={commentsFilm} currUser={currentUser} filmName={movie} />,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('home-top')}>
                <div className={cx('info-content')}>
                    <FilmInfo filmInfo={filmReviewInfo} loveFilms={loveFilms} />
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
    );
}

export default Review;
