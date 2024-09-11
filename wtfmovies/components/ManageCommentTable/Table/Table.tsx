'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
//import { AlertColor } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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
import BlockIcon from '@mui/icons-material/Block';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import style from './Table.module.scss';
import { useDispatch } from 'react-redux';
import { showNotify } from '~/components/Notify/notifySlide';
import ContentDialog from './ContentDialog';
import { socket } from '~/websocket/websocketService';

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
    const [banLoading, setBanLoading] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogData, setDialogData] = useState<any>({});

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

    const handleOpenDialog = (currId: string) => {
        const currIndex = data.findIndex((element: any) => element._id === currId);
        setDialogData(data[currIndex]);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const CustomToolbar = () => {
        const [open, setOpen] = useState(false);
        const [dialogType, setDialogType] = useState(true);

        const handleOpen = (status: boolean) => {
            setOpen(true);
            setDialogType(status);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleBan = async (status: boolean) => {
            const response = await fetch('/api/v1/admin/banComment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comments: rowSelectionInfo, ban: status }),
            });

            if (response.ok) {
                setData((prevData: any) => {
                    const updatedData = [...prevData]; // Create a copy of the original data

                    rowSelectionModel.forEach((itemId: string) => {
                        const index = prevData.findIndex((item: any) => item._id === itemId);

                        // If the item is found, update its status
                        if (index !== -1) {
                            updatedData[index] = { ...updatedData[index], status: status };
                        }
                    });

                    return updatedData;
                });
                // wss to remove bancomments
                if (socket.connected) {
                    socket.emit(
                        'banComment',
                        JSON.stringify({
                            comments: rowSelectionInfo,
                        }),
                    );
                } else {
                    console.error('WebSocket connection not open.');
                }
                showAlert('Thay đổi trạng thái thành công 😎😎😎', 'success');
            } else if (response.status === 400) {
                showAlert('Thay đổi trạng thái thất bại 😭😭😭', 'error');
            } else if (response.status === 401) {
                showAlert('Xác thực thất bại 😶‍🌫️😶‍🌫️😶‍🌫️', 'error');
            } else if (response.status === 403) {
                showAlert('Api không trong phạm trù quyền của bạn 🤬🤬🤬', 'error');
            } else if (response.status === 500) {
                showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
            setOpen(false);
        };

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Bạn có muốn {dialogType ? 'CẤM' : 'GỠ CẤM'}:</DialogTitle>
                    <DialogContent>
                        <ul>
                            {rowSelectionModel.map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={() => handleBan(!dialogType)} autoFocus>
                            {dialogType ? 'CẤM' : 'GỠ CẤM'}
                        </Button>
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
                        startIcon={<BlockIcon />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={() => handleOpen(true)}
                    >
                        Cấm
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<LockOpenIcon />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={() => handleOpen(false)}
                    >
                        Gỡ cấm
                    </Button>
                    <GridToolbarQuickFilter />
                </GridToolbarContainer>
            </div>
        );
    };

    const columns: any[] = [
        { headerName: 'Id', field: 'id', width: 180 },
        { headerName: 'ParentId', field: 'parentId', width: 180 },
        { headerName: 'Email người gửi', field: 'email', width: 250 },
        { headerName: 'Tên người gửi', field: 'username', width: 180 },
        // { headerName: 'Nội dung', field: 'content', width: 500 },
        { headerName: 'Thời gian', field: 'time', width: 120 },
        {
            headerName: 'Trạng thái',
            field: 'status',
            type: 'boolean',
            // editable: true,
            width: 100,
        },
        {
            field: 'content',
            type: 'actions',
            headerName: 'Chi tiết',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }: { id: string }) => {
                return [
                    <GridActionsCellItem
                        icon={<LibraryBooksIcon />}
                        label="detail"
                        onClick={() => handleOpenDialog(id)}
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
            <ContentDialog open={dialogOpen} dialogData={dialogData} handleClose={handleCloseDialog} />
        </div>
    );
}
