"use client"
import classNames from 'classnames/bind';
import style from './Editer.module.scss';
import DatabaseLayout from '~/layouts/DatabaseLayout';
import DataGridCom from '~/components/DataGridCom';

const cx = classNames.bind(style);

export default function Editer() {

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
    const data = [
        {
            id: "d2beb81e-2c8f-489f-885c-1318377c87c4",
            name: "Jujutsu no Kaisen",
            describe: "Phim hay cực hay luôn akakakakkaakakkakakakakakakakakakakak",
            status: "Đang re",
            author: ['haha', 'dd'],
            gerne: ['haha', 'dd'],
            director: ['haha', 'dd'],
            duration: 1800,
            videoType: [
                { title: "Subs", episode: [] },
                { title: "Thuyết minh", episode: [] }
            ].map(videoType => videoType.title),
            releaseYear: "2020-05-18T14:10:30.000Z",
            country: "Nhật Bổn",
            rating: 4.5
        },
        {
            id: "d2beb81e-2c8f-489f-885c-1318377c87c5",
            name: "Jujutsu no Kaisen",
            describe: "Phim hay cực hay luôn akakakakkaakakkakakakakakakakakakakak",
            status: "Tạm dùng",
            author: ['haha', 'dd'],
            gerne: ['haha', 'dd'],
            director: ['haha', 'dd'],
            duration: 1800,
            videoType: [
                { title: "Subs", episode: [] },
                { title: "Thuyết minh", episode: [] }
            ].map(videoType => videoType.title),
            releaseYear: "2020-05-18T14:10:30.000Z",
            country: "Nhật Bổn",
            rating: 4.5
        }
    ]

    return (
        <DatabaseLayout>
            <DataGridCom title_name='Tổng quan' colum={colum}>{data}</DataGridCom>
        </DatabaseLayout>
    );
}