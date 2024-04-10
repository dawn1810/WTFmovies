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
}

export interface ExtendedUser extends User {
    user_id: string; // Use the appropriate type for user_id.
    first: boolean;
    avatar: string;
}

export interface CaptionsItemInterface {
    img: string;
    name: string;
    describe: string;
    infoList: { title: string; info: string[] | string | number; type?: string }[];
}

export interface FilmsInterFace {
    img: string;
    name: string;
    views: number;
    rating: number;
    episodes: number;
}

export interface FilmProposeListInterface {
    films: FilmsInterFace[];
    className?: string;
}

export interface FilmClassifyInterface extends FilmProposeListInterface {
    tabs: TabInterface[];
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
    imgSrc: string;
    filmName: string;
    views: number;
    rating: number;
    episodes: number;
    className?: string | [] | undefined;
}

export interface TabInterface {
    title: string;
    eventKey: string;
    content: FilmsInterFace[] | string;
}
