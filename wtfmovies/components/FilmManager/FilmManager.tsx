'use client';
import style from './FilmManager.module.scss';
import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
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
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { AlertColor } from '@mui/material';
import { faAdd, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { viVN } from '@mui/x-data-grid/locales';
import AlertDialog from '~/components/EditorDialog';

import { MovieForm } from '~/components/EditorDialog';
import { useDispatch } from 'react-redux';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

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
    const [valueFilm, setValueFilm] = useState<any>({});
    const [dataGrid, setDataGrid] = useState<any>(children);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const dispatch = useDispatch();

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };
    async function handleEdit(event: any) {
        const selectedIDs = new Set(rowSelectionModel);
        const rowData = dataGrid.filter((row: any) =>
            selectedIDs.has(row.id),
        );

        const authorsList = new Set(rowData[0].author);
        const genresList = new Set(rowData[0].genre);
        const directorList = new Set(rowData[0].director);
        const actorsList = new Set(rowData[0].actor);
        const countrysList = new Set(rowData[0].country);


        const data = {
            ...rowData[0],
            author: [...sideFormInfo.author.filter((item: any) => authorsList.has(item.title))],
            genre: [...sideFormInfo.genres.filter((item: any) => genresList.has(item.title))],
            director: [...sideFormInfo.directors.filter((item: any) => directorList.has(item.title))],
            actor: [...sideFormInfo.actors.filter((item: any) => actorsList.has(item.title))],
            country: [...sideFormInfo.countrys.filter((item: any) => countrysList.has(item.label))],
        };

        setValueFilm(data)
        setOpenForm(true);
    }

    function handleDelete() {
        setOpen(true);
    }


    function handleAdd() {
        setOpenForm(true);
    }
    function handleCloseForm() {
        setOpenForm(false);
        setValueFilm({});
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

    async function handleDeleteComf(status: any) {
        setLoadingDelete(true);
        function removeItemsById(arr: any, ids: any) {
            return arr.filter((item: any) => !ids.includes(item.id));
        }
        if (status.status) {
            const res = await fetch('/api/v1/editor/deleteMovies', {
                method: "POST",
                body: JSON.stringify({ ids: status.content })
            })
            const decodeData: { statusCode: number, content: string } = await res.json();
            if (decodeData.statusCode === 200) {
                setDataGrid(removeItemsById(dataGrid, status.content));
                showAlert("Xoá thành công!", "success");
            }

            else showAlert("Có lỗi xảy ra, vui lòng tải lại trang và thử lại!", "error");
        }

        setOpen(false);
        setLoadingDelete(false);


    }
    function CustomToolbar() {
        return (


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

        );
    }

    return (
        <div className={cx('dataGrid')}>
            <AlertDialog
                loading={loadingDelete}
                listId={rowSelectionModel}
                handleClose={handleDeleteComf}
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

            {useMemo(() => (
                <MovieForm key={valueFilm.film_id} defaultValue={valueFilm} countrys={sideFormInfo.countrys} authors={sideFormInfo.author} genres={sideFormInfo.genres} directors={sideFormInfo.directors} actors={sideFormInfo.actors} tags={sideFormInfo.tags} isOpen={openForm} handleClose={handleCloseForm}></MovieForm>
            ), [valueFilm, sideFormInfo.countrys, sideFormInfo.author, sideFormInfo.genres, sideFormInfo.directors, sideFormInfo.actors, sideFormInfo.tags, openForm])}

            <h1 className={cx('title_name')}>{title_name}</h1>
            <DataGrid
                sx={{
                    '@media print': {
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                    },
                }}
                columns={colum}
                rows={dataGrid}
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
