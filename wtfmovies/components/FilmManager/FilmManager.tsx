'use client';
import style from './FilmManager.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '@mui/material/Button';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridToolbarFilterButton,
    GridRowSelectionModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridColDef,
    GridCsvExportMenuItem,
    useGridApiContext,
    gridVisibleColumnFieldsSelector,
    gridFilteredSortedRowIdsSelector,
    GridApi,
    GridExportMenuItemProps,
    GridToolbarExportContainer,
} from '@mui/x-data-grid';
import { Box, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { viVN } from '@mui/x-data-grid/locales';
import AlertDialog from '~/components/Dialog';
import { useSelector } from 'react-redux';
import { alertStatusSelector } from '~/redux/selectors';

import { MovieForm } from '~/components/Dialog';

const cx = classNames.bind(style);
export default function DataGridCom({
    colum,
    children,
    title_name,
    sideFormInfo,
}: {
    colum: readonly GridColDef<{ any: any }>[];
    children: any;
    title_name: string;
    sideFormInfo: any;
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
    const getJson = (apiRef: React.MutableRefObject<GridApi>) => {
        // Select rows and columns
        const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
        const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

        // Format the data. Here we only keep the value
        const data = filteredSortedRowIds.map((id) => {
            const row: Record<string, any> = {};
            visibleColumnsField.forEach((field) => {
                row[field] = apiRef.current.getCellParams(id, field).value;
            });
            return row;
        });
        return JSON.stringify(data, null, 2);
    };
    const exportBlob = (blob: Blob, filename: string) => {
        // Save the blob in a json file
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        setTimeout(() => {
            URL.revokeObjectURL(url);
        });
    };
    function JsonExportMenuItem(props: GridExportMenuItemProps<{}>) {
        const apiRef = useGridApiContext();

        const { hideMenu } = props;

        return (
            <MenuItem
                onClick={() => {
                    const jsonString = getJson(apiRef);
                    const blob = new Blob([jsonString], {
                        type: 'text/json',
                    });
                    exportBlob(blob, 'Danh sách tập phim.json');

                    // Hide the export menu after the export
                    hideMenu?.();
                }}
            >
                Xuất JSON
            </MenuItem>
        );
    }
    function CustomToolbar() {
        return (
            <div>
                <MovieForm countrys={sideFormInfo.countrys} authors={sideFormInfo.author} genres={sideFormInfo.genres} directors={sideFormInfo.directors} actors={sideFormInfo.actors} tags={sideFormInfo.tags} isOpen={openForm} handleClose={handleCloseForm}></MovieForm>
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
                    <GridToolbarExportContainer>
                        <GridCsvExportMenuItem
                            options={{
                                fileName: 'Danh sách tập phim',
                                delimiter: ';',
                                utf8WithBom: true,
                            }}
                        />
                        <JsonExportMenuItem />
                    </GridToolbarExportContainer>

                    <Button className={cx('btncustom')} onClick={handleAdd} variant="outlined">
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
                sx={{
                    '@media print': {
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                    },
                }}
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
