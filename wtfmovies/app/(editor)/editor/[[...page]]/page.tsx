import { getFilm } from '~/libs/getData/editor';
import FilmPage from './film';
// import classNames from 'classnames/bind';
// import style from './Editer.module.scss';
// import DatabaseLayout from '~/layouts/DatabaseLayout';
import OverViewPage from './overview';
// const cx = classNames.bind(style);
function getPage(params?: any, any?: any) {
    switch (params.page[0]) {
        case 'film':
            return <FilmPage data={any} />;
        default:
            return <OverViewPage />;
    }
}

export default async function Editer({ params }: { params?: { page: string[] } }) {
    const data = await getFilm();

    return <>{getPage(params, data)}</>;
}
