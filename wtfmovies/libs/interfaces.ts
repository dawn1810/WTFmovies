//import { AlertColor } from '@mui/material';
import { File } from 'buffer';
import { User } from 'next-auth';
import { ReactNode } from 'react';
import { Placement } from 'react-bootstrap/esm/types';

// redux
export interface ExtendedFile extends File {
    preview: string;
}
export interface SearchData {
    query?: string;
    sortName?: string;
    sortTime?: string;
    sortView?: string;
    tab?: string;
    sortReview?: string;
    type?: string;
    typefilm?: string;
    seasion?: string;
    year?: string;
    genres?: string;
    avd?: string;
}
export interface OneFilmTopInterface {
    _id: string;
    likes: number;
    monthLikes: number;
    monthViews: number;
    name: string;
    views: number;
    weekLikes: number;
    weekViews: number;
    weekComments: number;
    monthComments: number;
    comments: number;
    [key: string]: number | string;
}
export interface FilmTopInterface {
    week: {
        views: OneFilmTopInterface[];
        likes: OneFilmTopInterface[];
        comments: OneFilmTopInterface[];
    };
    month: {
        views: OneFilmTopInterface[];
        likes: OneFilmTopInterface[];
        comments: OneFilmTopInterface[];
    };
    all: {
        views: OneFilmTopInterface[];
        likes: OneFilmTopInterface[];
        comments: OneFilmTopInterface[];
    };
    [key: string]: {
        [key: string]: OneFilmTopInterface[];
    };
}
export interface reduxStateInterface {
    player: {
        url: string;
        pip: boolean;
        playing: boolean;
        ready: boolean;
        controls: boolean;
        light: boolean;
        volume: number;
        muted: boolean;
        played: number;
        loaded: number;
        duration: number;
        playbackRate: number;
        loop: boolean;
        seeking: boolean;
        loading: boolean;
        contactShow: boolean;
        centerBtnShow: boolean;
        leftBtnShow: boolean;
        rightBtnShow: boolean;
        currSpeed: string;
        currResol: string;
        resolution: any[];
    };
    header: {
        modalShow: boolean;
        query: string;
        fbDialog: boolean;
        fbDialogType: 'report' | 'feedback';
        rpContent: string;
        wsdata: string;
    };
    register: {
        signupEmailAlert: boolean;
        signupEmailAlertContent: string;
        signupPassAlert: boolean;
        signupPassAlertContent: string;
        signupAgainPassAlert: boolean;
        signupNameAlert: boolean;
        signupBirthDateAlert: boolean;
    };
    editor: {
        alertStatus: { content: any; status: boolean };
        dataFilm: {
            name: string;
            describe: string;
            author: ObjectMongo[];
            genre: ObjectMongo[];
            director: ObjectMongo[];
            actor: ObjectMongo[];
            tag: ObjectMongo[];
            country: ObjectMongo;
            releaseYear: string;
            maxEp: number;
            duration: number;
            status: string;
            videoType: [];
            img: string;
            poster: string;
            notification: [];
            searchName: string;
        };
    };
    watch: {
        episode: { _id: string; index: number; rating: number; link: string };
    };
    profile: {
        avatar: ExtendedFile;
    };
    evaluate: {
        rows: RowInterface[];
    };
    notify: {
        open: boolean;
        content: string;
        type?: any;
    };
    comment: {
        comments: CommentInterface[];
        filmName: string;
        currUser: ExtendedUser | undefined;
    };
}

interface EpisodeType {
    title: string;
    episode: any[];
}

export interface ExtendedUser extends User {
    first?: boolean;
    avatar?: string;
    role?: string;
    status?: boolean;
}

export interface CaptionsItemInterface {
    img?: string;
    film_id: string;
    name: string;
    searchName: string;
    describe: string;
    infoList: { title: string; info: string[] | string | number; type?: string }[];
    love: boolean;
}

export interface FilmsInterFace {
    poster?: string;
    img?: string;
    name: string;
    searchName: string;
    views: number;
    rating: number;
    episodes: number;
}

export interface ObjectMongo {
    $oid: string;
}

export interface DateMongo {
    $date: string;
}

export interface MongoUpdate {
    matchedCount: number;
    modifiedCount: number;
    upsertedId: string;
}

export interface FilmInfo {
    _id?: ObjectMongo;
    film_id?: string;
    name?: string;
    describe?: string;
    status?: string;
    author?: ObjectMongo[];
    director?: string[];
    duration?: number;
    videoType?:
        | {
              title?: string;
              episode?: number[];
          }[]
        | any;
    tag?: string[];
    releaseYear?: Date;
    country?: string;
    updateTime?: Date;
    actor?: string[];
    views?: number;
    likes?: number;
    img?: string;
    poster?: string;
    genre?: ObjectMongo[];
    rating?: number;
    notification?: { schedule: string; notification: string };
}

export interface EpisodeInterFace {
    _id: ObjectMongo;
    film_id: string;
    index: number;
    name: string;
    uploader_email: string;
    upload_date: Date;
    rating: number;
    views: number;
    link: string;
}

export interface FilmProposeListInterface {
    films: FilmInfoInterface[];
    className?: string;
}

export interface FilmClassifyInterface extends FilmProposeListInterface {
    tabs: FilmInfoInterface[][];
    tags: {
        mainDir: string;
        extraDir: string;
        mainTitle: string;
        extraTitle: string;
        mainIcon: any;
        extraIcon: any;
    };
}

export interface FilmCardInterface {
    large?: boolean;
    noOverlay?: boolean;
    largeNoOverlay?: boolean;
    imgSrc?: string;
    filmName: string;
    searchName: string;
    views: number;
    maxEp?: number;
    rating: number;
    releaseYear?: Date;
    genre?: string[];
    tag?: string[];
    author?: string[];
    episodes: number;
    className?: string | [] | undefined;
}

export interface TabInterface {
    title: string;
    eventKey: string;
    content: FilmInfoInterface[] | string;
}

export interface FilmInfoInterface {
    film_id: string;
    name: string;
    searchName: string;
    describe: string;
    status?: string;
    author: string[];
    genre: string[];
    maxEp: number | null;
    director?: string[];
    duration?: number;
    videoType: EpisodeType[];
    tag?: string[];
    releaseYear?: Date;
    country?: string;
    actor?: string[];
    views: number;
    likes: number;
    rating: number;
    poster?: string;
    img?: string;
}

export interface FilmReviewInfoInterface {
    image?: string;
    title: string;
    searchName: string;
    rating: number;
    episodes: number | string;
    describe: string;
    info: { title: string; info?: string[] | string | number[] | number; type?: string; category?: string }[];
}

export interface CommentInterface {
    _id: string;
    parentId?: string;
    avatar?: string;
    email: string;
    content: string;
    time: string;
    status: boolean;
    username: string;
    replyList?: CommentInterface[];
    replyLength?: number;
}

export interface OptionInterface {
    value: string;
    label: string;
}

export interface UserInfoInterface {
    name: string;
    avatar?: string;
    birthDate?: string;
    actor?: string;
    director?: string;
    genres?: OptionInterface[];
    languages?: OptionInterface[];
    status?: boolean;
    email?: string;
    loveFilms?: string[];
}

export interface SuveyOptionsInterface {
    _id: string;
    name: string;
}

export interface HeaderMenuItemsInterface {
    icon: JSX.Element | null;
    title: string;
    to?: string;
    type?: string;
    separate?: boolean;
}

export interface HeaderMenuInterface {
    playerMenu?: boolean;
    children: React.ReactElement;
    items: HeaderMenuItemsInterface[];
    title?: string;
    hideOnClick?: boolean;
    placement: Placement;
    delay: number | [number | null, number | null] | undefined;
    className?: string;
    onChange?: (item: any) => void;
}

//tiktok
interface ResponseTiktokData {
    image_info: {
        hash: string;
        name: string;
        src_h: number;
        format: string;
        web_uri_v2: string;
        height: number;
        width: number;
        mode: number;
        src_uri: string;
        src_w: number;
        size: number;
        web_uri: string;
        d: number;
    };
    url: string;
    uri: string;
}

export interface ResponseTiktokOK {
    msg: string;
    code: number;
    data: ResponseTiktokData | any;
    extra: object;
}

// admin page interface //////////////////////////////////////////////////////////////////////////////////
export interface LineChartDataInterface {
    [index: string]: string | number;
    time: string;
    data: number;
}

export interface NumStatisticalInterface {
    time: string;
    views: number;
    users: number;
    films: number;
}

export interface NumStatisticalInterfaceE {
    time: string;
    views: number;
    likes: number;
    eps: number;
}

export interface FilmHotInterface {
    name: string;
    views: number;
    likes?: number;
    rating: number;
}

export interface UserAdminInfoInfterface {
    id: string;
    name: string;
    birthDate?: string;
    status: boolean[];
    role: string[];
    gender?: number;
}

export interface TopSixUserInfoInfterface {
    name: string;
    email: string;
}

export interface AdminReportInfterface {
    _id?: string;
    from: string;
    type: string;
    time: string;
    content?: string;
}

export interface AdminDatasetInterface {
    view: LineChartDataInterface[];
    user: LineChartDataInterface[];
    film: LineChartDataInterface[];
}

export interface EditorDatasetInterface {
    view: LineChartDataInterface[];
    likes: LineChartDataInterface[];
    eps: LineChartDataInterface[];
}

export interface GenresDatasetInterface {
    content: string;
    time: number;
}

export interface GenresUserDatasetInterface {
    id: number;
    value: number;
    label: string;
}
// Evaluate Table
export interface CriteriaInterface {
    name: string;
    maxScore: number;
}

export interface RowInterface {
    name: string;
    maxScore: number;
    criteria: CriteriaInterface[];
}

export interface EvalTableInterface {
    _id: string;
    table: RowInterface[];
    time: string;
    version: string;
}

export interface ScoreInterface {
    _id: string;
    name?: string;
    userScore: any[];
    adminScore?: any[];
    time: string;
    version: string;
}

// love Film
export interface LoveFilmsInterface {
    film_id: string;
    name: string;
    img: string;
    views: number;
    likes: number;
    status: boolean;
    updateTime: string;
}
