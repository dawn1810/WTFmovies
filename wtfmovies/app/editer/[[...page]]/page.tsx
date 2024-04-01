import FilmPage from "./film";
import classNames from 'classnames/bind';
import style from './Editer.module.scss';
import DatabaseLayout from '~/layouts/DatabaseLayout';
import { faFilm, faHouse } from '@fortawesome/free-solid-svg-icons';
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
    }
];
function getPage(params: any) {
    switch (params.page[0]) {
        case 'film':
            return <FilmPage></FilmPage>
        default:
            break;
    }
}
export default function Editer({ params }: { params: { page: string } }) {

    return (
        <DatabaseLayout menuitem={menuItems}>
            {getPage(params)}
        </DatabaseLayout>
    );
}

