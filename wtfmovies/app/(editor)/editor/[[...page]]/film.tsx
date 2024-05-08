'use client';
import FilmManager from '~/components/FilmManager';
import { data } from './mockdata';

const colum = [
    { title: 'Film ID', field: 'id', width: 280 },
    { title: 'Name', field: 'name', width: 150 },
    { title: 'Description', field: 'describe', width: 100 },
    { title: 'Status', field: 'status', width: 100 },
    { title: 'Author', field: 'author', width: 100 },
    { title: 'Genre', field: 'gerne', width: 100 },
    { title: 'Director', field: 'director', width: 100 },
    { title: 'Duration', field: 'duration', width: 100 },
    { title: 'Video Types', field: 'videoType', width: 100 },
    { title: 'Release Year', field: 'releaseYear', width: 100 },
    { title: 'Country', field: 'country', width: 100 },
    { title: 'Rating', field: 'rating', width: 100 },
];
export default function FilmPage() {
    return (
        <FilmManager title_name="Tổng quan" colum={colum}>
            {data}
        </FilmManager>
    );
}
