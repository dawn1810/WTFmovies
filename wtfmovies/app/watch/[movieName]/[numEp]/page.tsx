import classNames from 'classnames/bind';
import { getFilmsEpisode, getFilmsInfo } from '~/libs/getData/watch';
import FilmInfo from '~/components/FilmInfo/FilmInfo';
import CommentContent from '~/components/CommentContent';
import style from './Watch.module.scss';
import TabsBox from '~/components/TabsBox';
import FilmInteract from '~/components/FilmInteract';
import Player from '~/components/Player';
import DefaultLayout from '~/layouts/DefaultLayout';
import { auth } from '../../../api/auth/[...nextauth]/auth';
import { getFilmReviewInfo } from '~/libs/getData/review';
import { getProposeListFilms } from '~/libs/getData/home';

const cx = classNames.bind(style);

async function Watch({ params }: { params: { movieName: string, numEp: string } }) {
    //get Param
    const { movieName, numEp } = params;

    //get info for component
    const filmData = await getFilmsInfo(movieName.replaceAll('-', ' '));
    const filmEpisode = await getFilmsEpisode(filmData?.film_id);

    const filmReviewInfo = await getFilmReviewInfo(movieName.replaceAll('-', ' '));

    //re check info film
    if (!filmEpisode || !filmData || !filmData.videoType || !filmData.notification) return 404;

    console.log(filmEpisode[0]);

    const commentTabs = [
        {
            title: '#BÌNH LUẬN',
            eventKey: 'comment',
            content: <CommentContent />,
        },
        {
            title: '#THÔNG TIN PHIM',
            eventKey: 'film-info',
            content: <FilmInfo filmInfo={filmReviewInfo} />,
        },
    ];

    const episodesTabs = filmData.videoType.map(({ title, episode }) => {
        return {
            title: '#VIETSUB',
            eventKey: title || "",
            content: episode || "",
        }
    })

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
        }
    ];
    const proposeListFilms = await getProposeListFilms();

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

    const haha = (value: any) => {
        console.log(value);

    }
    const session = await auth();

    return (
        <DefaultLayout currentUser={!!session && !!session?.user}>
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>{filmData.name}</h1>
                <TabsBox tabs={notyfyTabs} textContent defaultActiveKey="celender" className={cx('tab-box')} />
                <Player url={`${filmEpisode[0].link}?.m3u8`} />
                <FilmInteract rating={filmEpisode[0].rating} />
                <TabsBox
                    tabs={episodesTabs}
                    active_index={1}
                    // handleEpClick={haha}
                    flexContent
                    textContent
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

export default Watch;
