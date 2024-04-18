import classNames from 'classnames/bind';
import { getFilmsEpisode, getFilmsInfo } from '~/libs/getData/watch';
import FilmInfo from '~/components/FilmInfo/FilmInfo';
import CommentContent from '~/components/CommentContent';
import style from './Watch.module.scss';
import TabsBox from '~/components/TabsBox';
import DefaultLayout from '~/layouts/DefaultLayout';
import { getAllFilmsComment, getFilmReviewInfo } from '~/libs/getData/review';
import { getCurrentUserInfo, getProposeListFilms } from '~/libs/getData/home';
import { WatchWithEp } from './WatchWithEp';

import type { Metadata, ResolvingMetadata } from 'next';
import NotFound from '~/app/not-found';
const cache = new Map();

async function getFilmInfoWithCache(movieName: string, epId: string) {
    if (cache.has(movieName + epId)) {
        return cache.get(movieName + epId);
    }

    const filmData = await getFilmsInfo(movieName);
    cache.set(movieName + epId, filmData);

    return filmData;
}

const cx = classNames.bind(style);

type Props = {
    params: { movieName: string; numEp: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    //get Param
    const { movieName, numEp } = params;
    const regex = /tap(\d+)/;

    const match = numEp.match(regex);
    let numberEp: string = '0';
    if (match) {
        numberEp = match[1];
    }

    const filmData = await getFilmInfoWithCache(movieName, numEp);

    return {
        title: `${filmData?.name} tập ${numberEp}`,
    };
}

export default async function Watch({ params }: Props) {
    //get Param
    const { movieName, numEp } = params;

    //for film comment
    const currentUser = await getCurrentUserInfo();
    const commentsFilm = await getAllFilmsComment(movieName);

    //get info for component
    const filmData = await getFilmInfoWithCache(movieName, numEp);
    const filmEpisode = await getFilmsEpisode(filmData?.film_id);

    const filmReviewInfo = await getFilmReviewInfo(movieName);

    const proposeListFilms = await getProposeListFilms();

    //get info from params
    const regex = /^tap\d+$/;
    const matchNumEp = numEp.match(regex);

    //re check info film
    if (!matchNumEp || filmEpisode.length <= 0 || !filmData || !filmData.videoType || !filmData.notification)
        return NotFound();

    //spit to get "{number}"
    const regexGetEp = /(\d+)/;
    const matchEp = numEp.match(regexGetEp);
    if (!matchEp) return NotFound();
    let numberEp: string = matchEp[1];

    if (
        numberEp > filmData.videoType[0].episode[filmData.videoType[0].episode.length - 1] ||
        numberEp < filmData.videoType[0].episode[0]
    )
        return NotFound();
    const commentTabs = [
        {
            title: '#BÌNH LUẬN',
            eventKey: 'comment',
            content: <CommentContent comments={commentsFilm} filmName={movieName} currUser={currentUser} />,
        },
        {
            title: '#THÔNG TIN PHIM',
            eventKey: 'film-info',
            content: <FilmInfo filmInfo={filmReviewInfo} />,
        },
    ];

    const episodesTabs = filmData.videoType.map(({ title, episode }: { title: string; episode: string }) => {
        return {
            title: '#VIETSUB',
            eventKey: title || '',
            content: episode || '',
        };
    });

    const notyfyTabs = [
        {
            title: 'LỊCH CHIẾU',
            eventKey: 'celender',
            content: filmData.notification?.schedule,
        },
        {
            title: 'THÔNG BÁO',
            eventKey: 'notify',
            content: filmData.notification?.notification,
        },
    ];

    const proposeFilmsTabs = [
        {
            title: '#CÓ THỂ BẠN SẼ THÍCH',
            eventKey: 'like',
            content: proposeListFilms,
        },
        {
            title: '#PHIM HÀN QUỐC',
            eventKey: 'korean',
            content: proposeListFilms,
        },
        {
            title: '#PHIM MỚI',
            eventKey: 'new',
            content: proposeListFilms,
        },
    ];

    return (
        <DefaultLayout>
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>{`${filmData?.name} tập ${numberEp}`}</h1>
                <TabsBox tabs={notyfyTabs} textContent defaultActiveKey="celender" className={cx('tab-box')} />
                <WatchWithEp numEp={Number(numberEp)} filmEpisode={filmEpisode}></WatchWithEp>

                <TabsBox
                    tabs={episodesTabs}
                    active_episode={Number(numberEp)}
                    flexContent
                    textContent
                    listIdEp={filmEpisode}
                    defaultActiveKey={filmData.videoType[0].title}
                    className={cx('tab-box')}
                />
                <TabsBox
                    tabs={proposeFilmsTabs}
                    listContent
                    // textContent
                    defaultActiveKey="like"
                    className={cx('tab-box')}
                />
                <TabsBox
                    tabs={commentTabs}
                    commentContent
                    textContent
                    defaultActiveKey="comment"
                    className={cx('cmt-tab-box')}
                />
            </div>
        </DefaultLayout>
    );
}
