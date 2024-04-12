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

const notyfyTabs = [
    {
        title: 'LỊCH CHIẾU',
        eventKey: 'celender',
        content: 'LỊCH CHIẾU: Thứ 2 hàng tuần trên WTF movie.',
    },
    {
        title: 'THÔNG BÁO',
        eventKey: 'notify',
        content:
            'THÔNG BÁO: Tuần này do một vài lý do chúng mình sẽ ra bản Thuyết minh chậm hơn một chút mong mọi người thông cảm',
    },
];



const proposeFilmsTabs = [
    {
        title: '#CÓ THỂ BẠN SẼ THÍCH',
        eventKey: 'like',
        content: films,
    },
    {
        title: '#PHIM HÀN QUỐC',
        eventKey: 'korean',
        content: films,
    },
    {
        title: '#PHIM MỚI',
        eventKey: 'new',
        content: films,
    },
];

const commentTabs = [
    {
        title: '#BÌNH LUẬN',
        eventKey: 'comment',
        content: <CommentContent />,
    },
    {
        title: '#THÔNG TIN PHIM',
        eventKey: 'film-info',
        content: <FilmInfo />,
    },
];

async function Watch({ params }: { params: { movieName: string, numEp: string } }) {

    const filmData = await getFilmsInfo(params.movieName);
    const filmEpisode = await getFilmsEpisode(filmData?.film_id);

    if (!filmEpisode || !filmData || !filmData.videoType) return 'haha'

    const episodesTabs =
        filmData.videoType.map(({ title, episode }) => {
            if (!title || !episode) return {
                title: 'title',
                eventKey: 'title',
                content: 'episode',
            }
            return {
                title: title,
                eventKey: title,
                content: episode,
            }
        })

    const session = await auth();
    return (
        <DefaultLayout currentUser={!!session && !!session?.user}>
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>{filmData.name}</h1>
                <TabsBox tabs={notyfyTabs} textContent defaultActiveKey="celender" className={cx('tab-box')} />
                <Player url={`${filmEpisode[0].link}?.m3u8`} />
                <FilmInteract rating={filmData.rating} />
                <TabsBox
                    tabs={episodesTabs}
                    active_index={1}
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
