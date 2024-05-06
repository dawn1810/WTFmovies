'use client';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Box, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { viVN } from '@mui/x-data-grid/locales';
import AlertDialog from '~/components/Dialog';
import { useSelector } from 'react-redux';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridRowSelectionModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridColDef,
} from '@mui/x-data-grid';
import { Add, Block } from '@mui/icons-material';

import style from './Table.module.scss';
import { alertStatusSelector } from '~/redux/selectors';
import { MovieForm } from '~/components/Dialog';

const cx = classNames.bind(style);
export default function DataGridCom({
    column,
    dataset,
    title_name,
}: {
    column: readonly GridColDef<{ any: any }>[];
    dataset: any;
    title_name: string;
}) {
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel | any>([]);
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    function handleEdit() {
        setOpenForm(true);
    }
    const status = useSelector(alertStatusSelector);

    function handleDelete() {
        setOpen(true);
    }

    function handleAdd() {
        setOpenForm(true);
    }
    function handleCloseForm() {
        setOpenForm(false);
    }

    function CustomToolbar() {
        return (
            <div>
                <MovieForm isOpen={openForm} handleClose={handleCloseForm}></MovieForm>
                <AlertDialog
                    listId={rowSelectionModel}
                    handleClose={() => {
                        setOpen(false);
                    }}
                    title={'Thông báo'}
                    open={open}
                >
                    Bạn có chắc chắc muốn xoá:
                    <ul>
                        {rowSelectionModel.map((item: string) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    không?
                </AlertDialog>

                <GridToolbarContainer>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <Box sx={{ flexGrow: 1 }} />

                    <GridToolbarExport
                        slotProps={{
                            button: { variant: 'outlined' },
                        }}
                        className={cx('btncustom')}
                    />
                    <Button variant="outlined" startIcon={<Add />} className={cx('btncustom')} onClick={handleAdd}>
                        Thêm
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Block />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={handleDelete}
                    >
                        Cấm
                    </Button>
                    <GridToolbarQuickFilter />
                </GridToolbarContainer>
            </div>
        );
    }

    return (
        <div className={cx('dataGrid')}>
            <h1 className={cx('title_name')}>{title_name}</h1>
            <DataGrid
                columns={column}
                rows={dataset}
                localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                checkboxSelection
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
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
            />
        </div>
    );
}
