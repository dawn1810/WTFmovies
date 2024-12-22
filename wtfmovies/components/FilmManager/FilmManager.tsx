'use client';
import style from './FilmManager.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { createSearchName } from '~/libs/clientFunc';
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
import AddIcon from '@mui/icons-material/Add';
import EyesIcon from '@mui/icons-material/Visibility';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { viVN } from '@mui/x-data-grid/locales';
import AlertDialog from '~/components/FilmManager/EditorDialog/AlertDialog';
import { useRouter } from 'next/navigation';
import { MovieForm } from '~/components/FilmManager/EditorDialog/MovieForm';
import { useDispatch, useSelector } from 'react-redux';
import { showNotify } from '~/components/Notify/notifySlide';
import { generateUUIDv4 } from '~/libs/clientFunc';
import { setFilms, setSelectedFilm, setFormOpen } from './filmManagerSlice';

const cx = classNames.bind(style);

export default function FilmManager({
    colum,
    children,
    sideFormInfo,
    title_name,
}: {
    colum: readonly GridColDef<{ any: any }>[];
    children: any;
    sideFormInfo: any;
    title_name: string;
}) {
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel | any>([]);
    const [open, setOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const films = useSelector((state: any) => state.editor.films);
    const selectedFilm = useSelector((state: any) => state.editor.selectedFilm);
    const formOpen = useSelector((state: any) => state.editor.formOpen);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(setFilms(children));
    }, [children, dispatch]);

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    async function handleEdit() {
        const selectedIDs = new Set(rowSelectionModel);
        const rowData = films.filter((row: any) => selectedIDs.has(row.id));
        const data = {
            ...rowData[0],
            author: [...sideFormInfo.author.filter((item: any) => rowData[0].author.includes(item.title))],
            genre: [...sideFormInfo.genres.filter((item: any) => rowData[0].genre.includes(item.title))],
            director: [...sideFormInfo.directors.filter((item: any) => rowData[0].director.includes(item.title))],
            actor: [...sideFormInfo.actors.filter((item: any) => rowData[0].actor.includes(item.title))],
            country: [...sideFormInfo.countrys.filter((item: any) => rowData[0].country.includes(item.label))],
        };
        dispatch(setSelectedFilm(data));
        dispatch(setFormOpen(true));
    }

    function handleDelete() {
        setOpen(true);
    }

    function handleView() {
        const selectedIDs = new Set(rowSelectionModel);
        const rowData = films.filter((row: any) => selectedIDs.has(row.id));
        window.open(`/review/${rowData[0].searchName}`, '_blank');
    }

    function handleAdd() {
        dispatch(setSelectedFilm({ film_id: generateUUIDv4() }));
        dispatch(setFormOpen(true));
    }

    function handleCloseForm() {
        dispatch(setFormOpen(false));
        dispatch(setSelectedFilm(null));
    }

    const getJson = (apiRef: React.MutableRefObject<GridApi>) => {
        const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
        const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
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
                    const blob = new Blob([jsonString], { type: 'text/json' });
                    exportBlob(blob, 'Danh sách tập phim.json');
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
                method: 'POST',
                body: JSON.stringify({ ids: status.content }),
            });
            const decodeData: { statusCode: number; content: string } = await res.json();
            if (decodeData.statusCode === 200) {
                dispatch(setFilms(removeItemsById(films, status.content)));
                showAlert('Xoá thành công!', 'success');
            } else showAlert('Có lỗi xảy ra, vui lòng tải lại trang và thử lại!', 'error');
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
                <Button className={cx('btncustom')} onClick={handleView} disabled={rowSelectionModel.length !== 1} variant="outlined">
                    <EyesIcon />
                    Xem
                </Button>
                <Button className={cx('btncustom')} onClick={handleAdd} variant="outlined">
                    <AddIcon />
                    Thêm
                </Button>
                <Button
                    className={cx('btncustom')}
                    onClick={handleDelete}
                    disabled={rowSelectionModel.length === 0}
                    variant="outlined"
                >
                    <DeleteOutlineIcon />
                    Xoá
                </Button>
                <Button
                    className={cx('btncustom')}
                    onClick={handleEdit}
                    disabled={rowSelectionModel.length !== 1}
                    variant="outlined"
                >
                    <BorderColorOutlinedIcon />
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

            {formOpen && (
                <MovieForm
                    dataGrid={films}
                    setDataGrid={(data: any) => dispatch(setFilms(data))}
                    key={selectedFilm?.film_id}
                    defaultValue={selectedFilm}
                    film_id={selectedFilm?.film_id}
                    isOpen={formOpen}
                    handleClose={handleCloseForm}
                    tags={sideFormInfo.tags}
                    countrys={sideFormInfo.countrys}
                />
            )}

            <h1 className={cx('title_name')}>{title_name}</h1>
            <DataGrid
                sx={{
                    '@media print': {
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                    },
                }}
                columns={colum}
                rows={films}
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
