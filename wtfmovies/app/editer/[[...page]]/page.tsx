'use client'
import FilmPage from "./film";
import classNames from 'classnames/bind';
import style from './Editer.module.scss';
import DatabaseLayout from '~/layouts/DatabaseLayout';
import { faFilm, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import OverViewPage from "./overview";
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
            return <OverViewPage></OverViewPage>;
    }
}
export default function Editer({ params }: { params: { page: string } }) {
    const router = useRouter();
    if (!params.page) {
        if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;
            const newPath = `${currentPath}/overview`;
            return router.replace(newPath);
        }
        return null;
    }
    return (
        <DatabaseLayout menuitem={menuItems} scene={params.page[0]}>
            {getPage(params)}
        </DatabaseLayout>
    );
}
