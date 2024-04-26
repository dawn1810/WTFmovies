import { faFilm, faHouse } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import style from './Editor.module.scss';
import DatabaseLayout from '~/layouts/DatabaseLayout';
import FilmPage from './film';
import OverViewPage from './overview';
const cx = classNames.bind(style);
const menuItems = [
    {
        title: 'Tổng quan',
        icon: faHouse,
        scene: 'overview',
    },
    {
        title: 'Quản lý phim',
        icon: faFilm,
        scene: 'film',
    },
];
function getPage(page: string) {
    switch (page[0]) {
        case 'film':
            return <FilmPage></FilmPage>;
        default:
            return <OverViewPage></OverViewPage>;
    }
}
export default function Editor({ params }: { params: { page: string } }) {
    const { page } = params;

    return (
        <DatabaseLayout menuitem={menuItems} scene={page[0]}>
            {getPage(page)}
        </DatabaseLayout>
    );
}
