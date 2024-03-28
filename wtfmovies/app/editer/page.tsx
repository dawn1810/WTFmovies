"use client"
import classNames from 'classnames/bind';
import style from './Editer.module.scss';
import DatabaseLayout from '~/layouts/DatabaseLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbarQuickFilter, GridToolbarExport, GridToolbarFilterButton, GridRowSelectionModel, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { viVN } from '@mui/x-data-grid/locales';



const darkTheme = createTheme({

    palette: {
        mode: 'dark',

    },
    typography: {
        fontFamily: 'var(--font-family)',
        fontSize: 20,
    },

});
const cx = classNames.bind(style);

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function Editer() {
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector
                    slotProps={{ tooltip: { title: 'Change density' } }}
                />
                <Box sx={{ flexGrow: 1 }} />

                <GridToolbarExport
                    slotProps={{
                        tooltip: { title: 'Export data' },
                        button: { variant: 'outlined' },
                    }}
                />
                <Button className={cx('btncustom')} disabled={rowSelectionModel.length === 0} variant='outlined' ><FontAwesomeIcon className={cx('iconBtn')} icon={faTrash} />Xoá</Button>
                <Button className={cx('btncustom')} disabled={rowSelectionModel.length !== 1} variant='outlined'><FontAwesomeIcon className={cx('iconBtn')} icon={faPenToSquare} />Chỉnh sửa</Button>
                <GridToolbarQuickFilter />

            </GridToolbarContainer>
        );
    }
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 10,
        maxColumns: 6,
    });



    return (
        <DatabaseLayout>
            <ThemeProvider theme={darkTheme} >
                <div className={cx('dataGrid')}>
                    <h1 className={cx('title_name')}>Chọn phim</h1>
                    <DataGrid {...data}
                        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                        checkboxSelection
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setRowSelectionModel(newRowSelectionModel);
                        }}
                        rowSelectionModel={rowSelectionModel}
                        slots={{ toolbar: CustomToolbar }}
                        initialState={{
                            filter: {
                                filterModel: {
                                    items: [],
                                },
                            },

                        }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                    />
                </div>
            </ThemeProvider>
        </DatabaseLayout>
    );
}