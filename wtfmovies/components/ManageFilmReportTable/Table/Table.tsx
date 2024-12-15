'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Badge from '@mui/material/Badge';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { viVN } from '@mui/x-data-grid/locales';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridRowSelectionModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridActionsCellItem,
    GridCallbackDetails,
} from '@mui/x-data-grid';
import LoadingButton from '@mui/lab/LoadingButton';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import style from './Table.module.scss';
import { useDispatch } from 'react-redux';
import { showNotify } from '~/components/Notify/notifySlide';
import ContentDialog from './ContentDialog';
import { socket } from '~/websocket/websocketService';
import ReportDialog from './ReportDialog';

const cx = classNames.bind(style);

// const renderSelectEditInputCell: GridColDef['renderCell'] = (params) => {
//     return <SelectEditInputCell {...params} />;
// };

export default function DataGridCom({ dataset, title_name }: { dataset: any; title_name: string }) {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    const [data, setData] = useState<any>(dataset);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel | any>([]);
    const [rowSelectionInfo, setRowSelectionInfo] = useState<any>([]);

    // report dialog
    const [reportOpen, setReportOpen] = useState<boolean>(false);
    const [reports, setReports] = useState<any>([]);
    const [currReport, setCurrReport] = useState<number>(0);

    const handleSelectChange = (newRowSelectionModel: GridRowSelectionModel, detail: GridCallbackDetails<any>) => {
        if (newRowSelectionModel.length > rowSelectionModel.length) {
            // Add new element if the new selection is longer
            const currId = newRowSelectionModel[newRowSelectionModel.length - 1];
            if (currId) {
                setRowSelectionInfo((prev: any) => [
                    ...prev,
                    {
                        _id: currId,
                        parentId: detail.api.getCellValue(currId, 'parentId') || undefined,
                    },
                ]);
            }
        } else {
            // Handle both shorter and same-length selections
            setRowSelectionInfo(
                newRowSelectionModel.slice(0, rowSelectionModel.length).map((id, index) => {
                    if (rowSelectionInfo[index] && rowSelectionInfo[index]._id === id) {
                        // Keep existing element if ID matches
                        return rowSelectionInfo[index];
                    } else {
                        // Add new element if ID is new
                        return {
                            _id: id,
                            parentId: detail.api.getCellValue(id, 'parentId') || undefined,
                        };
                    }
                }),
            );
        }
        setRowSelectionModel(newRowSelectionModel);
    };

    const handleOpenReport = (currId: string) => {
        const currIndex = data.findIndex((element: any) => element.id === currId);
        setReports(data[currIndex].reports);
        setCurrReport(currIndex);
        setReportOpen(true);
    };

    const handleCloseReport = () => {
        setReportOpen(false);
    };

    const CustomToolbar = () => {
        const [open, setOpen] = useState(false);
        // const [dialogType, setDialogType] = useState(true);
        const [loading, setLoading] = useState<boolean>(false);

        const handleOpen = (status: boolean) => {
            setOpen(true);
            // setDialogType(status);
        };

        const handleClose = () => {
            setOpen(false);
        };

        async function handleDeleteFilm() {
            setLoading(true);
            const res = await fetch('/api/v1/editor/deleteMovies', {
                method: 'POST',
                body: JSON.stringify({ ids: rowSelectionModel }),
            });
            const decodeData: { statusCode: number; content: string } = await res.json();
            if (decodeData.statusCode === 200) {
                setData((prevData: any) => {
                    const updatedData = [...prevData]; // Create a copy of the original data

                    rowSelectionModel.forEach((itemId: string) => {
                        const index = prevData.findIndex((item: any) => item.id === itemId);

                        // If the item is found, update its status
                        if (index !== -1) {
                            updatedData[index] = { ...updatedData[index], status: 'delete' };
                        }
                    });

                    return updatedData;
                });
                showAlert('Xoá phim thành công!', 'success');
            } else showAlert('Có lỗi xảy ra, vui lòng tải lại trang và thử lại!', 'error');

            setOpen(false);
            setLoading(false)
        }

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Bạn có muốn XOÁ:</DialogTitle>
                    <DialogContent>
                        <ul>
                            {rowSelectionModel.map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <LoadingButton
                            loading={loading}
                            // loadingIndicator="Loading…"
                            onClick={handleDeleteFilm}
                            autoFocus
                        >
                            XOÁ
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
                <GridToolbarContainer>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                    <Box sx={{ flexGrow: 1 }} />

                    <Button
                        variant="outlined"
                        startIcon={<DeleteOutlineIcon />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={() => handleOpen(true)}
                    >
                        Xoá
                    </Button>
                    <GridToolbarQuickFilter />
                </GridToolbarContainer>
            </div>
        );
    };

    const columns: any[] = [
        { headerName: 'FilmId', field: 'id', width: 180 },
        { headerName: 'Tên phim', field: 'name', width: 250 },
        { headerName: 'Email biên tập viên', field: 'email', width: 200 },
        { headerName: 'Thời gian cập nhật', field: 'updateTime', width: 150 },
        { headerName: 'Thời gian đăng tả', field: 'releaseYear', width: 150 },
        {
            headerName: 'Trạng thái',
            field: 'status',
            width: 100,
        },
        {
            field: 'content',
            type: 'actions',
            headerName: 'Chi tiết',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }: { id: string }) => {
                const currIndex = data.findIndex((element: any) => element.id === id);
                return [
                    <GridActionsCellItem
                        icon={
                            <Badge badgeContent={data[currIndex].reports.length} color="error">
                                <FlagOutlinedIcon />
                            </Badge>
                        }
                        label="detail"
                        onClick={() => handleOpenReport(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <div className={cx('dataGrid')}>
            <h1 className={cx('title_name')}>{title_name}</h1>
            <DataGrid
                columns={columns}
                rows={data}
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
                onRowSelectionModelChange={handleSelectChange}
            />
            <ReportDialog
                open={reportOpen}
                reports={reports}
                currReport={currReport}
                setReport={setReports}
                handleClose={handleCloseReport}
                setData={setData}
            />
        </div>
    );
}
