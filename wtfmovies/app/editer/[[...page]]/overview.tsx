import classNames from 'classnames/bind';
import style from './Editer.module.scss';
import DatabaseLayout from '~/layouts/DatabaseLayout';
import DataGridCom from '~/components/DataGridCom';
import { data } from './mockdata'
import { faFilm, faHouse } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);
export default function FilmPage() {
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
    const colum = [
        { title: "Film ID", field: "id", width: 280 },
        { title: "Name", field: "name", width: 150 },
        { title: "Description", field: "describe", width: 100 },
        { title: "Status", field: "status", width: 100 },
        { title: "Author", field: "author", width: 100 },
        { title: "Genre", field: "gerne", width: 100 },
        { title: "Director", field: "director", width: 100 },
        { title: "Duration", field: "duration", width: 100 },
        { title: "Video Types", field: "videoType", width: 100 },
        { title: "Release Year", field: "releaseYear", width: 100 },
        { title: "Country", field: "country", width: 100 },
        { title: "Rating", field: "rating", width: 100 }
    ];
    return (
        <DatabaseLayout menuitem={menuItems}>
            <DataGridCom title_name='Tổng quan' colum={colum}>{data}</DataGridCom>
        </DatabaseLayout>
    );
}