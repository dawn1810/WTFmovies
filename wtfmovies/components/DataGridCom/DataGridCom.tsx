'use client';
import style from './DataGridCom.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '@mui/material/Button';
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
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { viVN } from '@mui/x-data-grid/locales';
import AlertDialog from '~/components/Dialog';
import { useSelector } from 'react-redux';
import { alertStatusSelector } from '~/redux/selectors';

const cx = classNames.bind(style);
export default function DataGridCom({
    colum,
    children,
    title_name,
}: {
    colum: readonly GridColDef<{ any: any }>[];
    children: any;
    title_name: string;
}) {
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel | any>([]);
    const [open, setOpen] = useState(false);

    function handleEdit() {
        console.log(rowSelectionModel);
    }
    const status = useSelector(alertStatusSelector);

    function handleDelete() {
        setOpen(true);
    }

    function handleAdd() {
        setOpen(true);
    }
    function CustomToolbar() {
        return (
            <div>
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
                    />
                    <Button
                        className={cx('btncustom')}
                        onClick={handleAdd}
                        variant="outlined"
                    >
                        <FontAwesomeIcon className={cx('iconBtn')} icon={faAdd} />
                        Thêm
                    </Button>
                    <Button
                        className={cx('btncustom')}
                        onClick={handleDelete}
                        disabled={rowSelectionModel.length === 0}
                        variant="outlined"
                    >
                        <FontAwesomeIcon className={cx('iconBtn')} icon={faTrash} />
                        Xoá
                    </Button>
                    <Button
                        className={cx('btncustom')}
                        onClick={handleEdit}
                        disabled={rowSelectionModel.length !== 1}
                        variant="outlined"
                    >
                        <FontAwesomeIcon className={cx('iconBtn')} icon={faPenToSquare} />
                        Chỉnh sửa
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
                columns={colum}
                rows={children}
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
    );
}
