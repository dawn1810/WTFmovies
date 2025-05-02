import classNames from 'classnames/bind';
import { getFilmsEpisode, getFilmsInfo } from '~/libs/getData/watch';
import FilmInfo from '~/components/FilmInfo/FilmInfo';
import CommentContent from '~/components/CommentContent';
import style from './Watch.module.scss';
import TabsBox from '~/components/TabsBox';
import { getAllFilmsComment, getFilmReviewInfo, getProposeListFilms, getUserLikeComment } from '~/libs/getData/review';
import { getCurrentUserInfo, getUserLoveFilm } from '~/libs/getData/home';
import { WatchWithEp } from './WatchWithEp';

import type { Metadata, ResolvingMetadata } from 'next';
import NotFound from '~/app/(root)/not-found';
import BreadcrumbCom from '~/components/Breadcrumb/Breadcrumb';
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

const getScheduleDescription = (schedule: string | number) => {
    if (typeof schedule === 'number') {
        const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        return `${daysOfWeek[schedule]} hàng tuần`;
    } else if (typeof schedule === 'string' && !isNaN(Date.parse(schedule))) {
        const date = new Date(schedule);
        return `Ngày ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
    }
    return 'Không có dữ liệu';
};

const getTimeUntilSchedule = (schedule: string | number) => {
    const now = new Date();
    let targetDate;

    if (typeof schedule === 'number') {
        targetDate = new Date();
        targetDate.setDate(now.getDate() + ((7 + schedule - now.getDay()) % 7));
        targetDate.setHours(0, 0, 0, 0); // Set to 00:00
    } else if (typeof schedule === 'string' && !isNaN(Date.parse(schedule))) {
        targetDate = new Date(schedule);
    } else {
        return 'Không có dữ liệu';
    }

    const diff = targetDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days <= 0 && hours <= 0 && minutes <= 0) {
        return '1 tuần';
    }

    const daysText = days > 0 ? `${days} ngày` : '';
    const hoursText = hours > 0 ? `${hours} giờ` : '';
    const minutesText = minutes > 0 ? `${minutes} phút` : '';

    return `${daysText} ${hoursText} ${minutesText}`.trim();
};

export default async function Watch({ params }: Props) {
    //get Param
    const { movieName, numEp } = params;

    //for film comment
    const currentUser = await getCurrentUserInfo();
    const commentsFilm = await getAllFilmsComment(movieName);
    const likeCommentList = await getUserLikeComment(movieName);

    //get info for component
    const filmData = await getFilmInfoWithCache(movieName, numEp);
    const filmEpisode = await getFilmsEpisode(filmData?.film_id);

    const filmReviewInfo = await getFilmReviewInfo(movieName);
    const loveFilms = await getUserLoveFilm();

    const proposeListFilms = await getProposeListFilms(movieName);

    //get info from params
    const regex = /^tap\d+$/;
    const matchNumEp = numEp.match(regex);

    //re check info film
    if (!matchNumEp || filmEpisode.length <= 0 || !filmData || !filmData.videoType) return NotFound();

    if (!filmData.notify)
        filmData.notify = 'Không có thông báo'
    if (!filmData.schedule)
        filmData.schedule = 'Không có dữ liệu'


    //spit to get "{number}"
    const regexGetEp = /(\d+)/;
    const matchEp = numEp.match(regexGetEp);
    if (!matchEp) return NotFound();
    let numberEp: string = matchEp[1];

    if (
        !filmData.videoType[0] ||
        numberEp > filmData.videoType[0].episode[filmData.videoType[0].episode.length - 1] ||
        numberEp < filmData.videoType[0].episode[0]
    ) {
        return NotFound();
    }
    const commentTabs = [
        {
            title: '#BÌNH LUẬN',
            eventKey: 'comment',
            content: (
                <CommentContent
                    comments={commentsFilm}
                    filmName={movieName}
                    currUser={currentUser}
                    likeList={likeCommentList}
                />
            ),
        },
        {
            title: '#THÔNG TIN PHIM',
            eventKey: 'film-info',
            content: <FilmInfo watch filmInfo={filmReviewInfo} loveFilms={loveFilms} />,
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
            content: `Phim sẽ được chiếu vào ${getScheduleDescription(filmData.schedule)} (${getTimeUntilSchedule(filmData.schedule)} còn lại)`,
        },
        {
            title: 'THÔNG BÁO',
            eventKey: 'notify',
            content: filmData.notify,
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
        <div className={cx('wrapper')}>
            <BreadcrumbCom
                paths={[
                    {
                        name: 'Trang chủ',
                        href: '/',
                    },
                ]}
                locations={['Xem phim', filmData?.name, 'Tập ' + numberEp]}
            />
            <h1 className={cx('title')}>{`${filmData?.name} tập ${numberEp}`}</h1>
            <TabsBox tabs={notyfyTabs} textContent defaultActiveKey="celender" className={cx('tab-box')} />
            <WatchWithEp
                film_id={filmData?.film_id}
                numEp={Number(numberEp)}
                watchPercentage={filmData?.watchPercentage}
                filmEpisode={filmEpisode}
                searchName={filmReviewInfo.searchName}
            ></WatchWithEp>

            <TabsBox
                tabs={episodesTabs}
                active_episode={Number(numberEp)}
                flexContent
                textContent
                listIdEp={filmEpisode}
                defaultActiveKey={filmData.videoType[0].title}
                className={cx('tab-box')}
                film_id={filmData?.film_id}
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
    );
}
