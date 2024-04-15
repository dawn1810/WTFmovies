import { User } from 'next-auth';

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
    };
    signup: {
        signupEmailAlert: boolean;
        signupEmailAlertContent: string;
        signupPassAlert: boolean;
        signupPassAlertContent: string;
        signupAgainPassAlert: boolean;
        signupNameAlert: boolean;
        signupBirthDateAlert: boolean;
    };
    dataGridCom: {
        alertStatus: { content: any; status: boolean };
    };
    watch: {
        episode: { _id: string; index: number; rating: number; link: string };
    };
}

interface EpisodeType {
    title: string;
    episode: any[];
}

export interface ExtendedUser extends User {
    user_id: string; // Use the appropriate type for user_id.
    first: boolean;
    avatar: string;
}

export interface CaptionsItemInterface {
    img?: string;
    name: string;
    searchName: string;
    describe: string;
    infoList: { title: string; info: string[] | string | number; type?: string }[];
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
    videoType?: {
        title?: string;
        episode?: number[];
    }[];
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
    uploader_id: string;
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
    rating: number;
    episodes: number;
    className?: string | [] | undefined;
}

export interface TabInterface {
    title: string;
    eventKey: string;
    content: FilmInfoInterface[] | string;
}

export interface FilmInfoInterface {
    name: string;
    searchName: string;
    describe: string;
    status?: string;
    author: string[];
    genre: string[];
    director?: string[];
    duration?: number;
    videoType: EpisodeType[];
    tag?: string[];
    releaseYear?: Date;
    country?: string;
    actor?: string[];
    views: number;
    rating: number;
    poster?: string;
    img?: string;
}

export interface FilmReviewInfoInterface {
    image?: string;
    title: string;
    searchName: string;
    rating: number;
    episodes: number;
    describe: string;
    info: { title: string; info?: string[] | string | number[] | number; type?: string }[];
}

export interface CommentInterface {
    user_id: string;
    avatar?: string;
    content: string;
    time: string;
    status: boolean;
    username: string;
}
