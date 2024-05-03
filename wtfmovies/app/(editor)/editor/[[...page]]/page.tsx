import FilmPage from './film';
// import classNames from 'classnames/bind';
// import style from './Editer.module.scss';
// import DatabaseLayout from '~/layouts/DatabaseLayout';
import OverViewPage from './overview';
// const cx = classNames.bind(style);
function getPage(params?: any) {
    switch (params.page[0]) {
        case 'film':
            return <FilmPage />;
        default:
            return <OverViewPage />;
    }
}

export default function Editer({ params }: { params?: { page: string[] } }) {
    return <>{getPage(params)}</>;
}
