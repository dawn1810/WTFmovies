"use client"
import classNames from 'classnames/bind';
import style from './Editer.module.scss';
import DatabaseLayout from '~/layouts/DatabaseLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useSelector } from 'react-redux';
import { searchQuerySelector } from '~/redux/selectors';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },

});
const cx = classNames.bind(style);

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function Editer() {
    //redux
    const searchQuery = useSelector(searchQuerySelector);

    const { data } = useDemoData({
        dataSet: 'Employee',
        visibleFields: VISIBLE_FIELDS,
        rowLength: 100,
    });

    return (
        <DatabaseLayout>
            <ThemeProvider theme={darkTheme} >
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid {...data} slots={{ toolbar: GridToolbar }} key={searchQuery} initialState={{
                        filter: {
                            filterModel: {
                                items: [],
                                quickFilterValues: [searchQuery],
                            },
                        },

                    }}
                    />
                </div>
            </ThemeProvider>
        </DatabaseLayout>
    );
}