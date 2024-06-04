'use client';
import { useCallback, useState } from 'react';
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
    useGridApiContext,
    GridRowModel,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import BlockIcon from '@mui/icons-material/Block';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import style from './Table.module.scss';
import { useDispatch } from 'react-redux';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

const cx = classNames.bind(style);

// const renderSelectEditInputCell: GridColDef['renderCell'] = (params) => {
//     return <SelectEditInputCell {...params} />;
// };

export default function DataGridCom({ dataset, title_name }: { dataset: any; title_name: string }) {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel | any>([]);
    const [promiseArguments, setPromiseArguments] = useState<any>(null);
    const [listUpdate, setListUpdate] = useState<boolean>(false);

    const processRowUpdate = useCallback(
        (newRow: GridRowModel, oldRow: GridRowModel) =>
            new Promise<GridRowModel>((resolve, reject) => {
                if (newRow.status !== oldRow.status) {
                    setPromiseArguments({ resolve, reject, newRow, oldRow });
                } else {
                    resolve(oldRow);
                }
            }),
        [],
    );

    const handleCloseDialog = () => {
        const { oldRow, resolve } = promiseArguments;
        resolve(oldRow);
        setPromiseArguments(null);
    };

    const handleCellEditStatus = async () => {
        const { newRow, oldRow, reject, resolve } = promiseArguments;

        const response = await fetch('/api/v1/admin/banComment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commentIds: [newRow.id], ban: newRow.status }),
        });

        if (response.ok) {
            resolve(newRow);
            showAlert('Thay đổi trạng thái thành công 😎😎😎', 'success');
        } else {
            if (response.status === 400) {
                showAlert('Thay đổi trạng thái thất bại 😭😭😭', 'error');
            } else if (response.status === 401) {
                showAlert('Xác thực thất bại 😶‍🌫️😶‍🌫️😶‍🌫️', 'error');
            } else if (response.status === 403) {
                showAlert('Api không trong phạm trù quyền của bạn 🤬🤬🤬', 'error');
            } else if (response.status === 500) {
                showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
            resolve(oldRow);
        }
        setPromiseArguments(null);
    };

    const renderConfirmDialog = () => {
        if (!promiseArguments) {
            return null;
        }

        const { newRow, resolve } = promiseArguments;

        if (listUpdate) {
            resolve(newRow);
            setPromiseArguments(null);
            setListUpdate(false);
        }

        return (
            <Dialog
                open={!!promiseArguments}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Bạn có muốn {newRow.status ? 'BỎ CẤM' : 'CẤM'}:</DialogTitle>
                <DialogContent>
                    <ul>
                        <li>{newRow.id}</li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Huỷ</Button>
                    <Button onClick={() => handleCellEditStatus()} autoFocus>
                        {newRow.status ? 'BỎ CẤM' : 'CẤM'}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const CustomToolbar = () => {
        const apiRef = useGridApiContext();
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
                body: JSON.stringify({ commentIds: rowSelectionModel, ban: status }),
            });

            if (response.ok) {
                rowSelectionModel.forEach(async (id: string) => {
                    apiRef.current.startCellEditMode({ id, field: 'status' });
                    const isValid = await apiRef.current.setEditCellValue({
                        id,
                        field: 'status',
                        value: status,
                        debounceMs: 200,
                    });

                    if (isValid) {
                        apiRef.current.stopCellEditMode({ id, field: 'status' });
                    }
                });
                setListUpdate(true);
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
                    <DialogTitle id="alert-dialog-title">Bạn có muốn {dialogType ? 'CẤM' : 'BỎ CẤM'}:</DialogTitle>
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
                            {dialogType ? 'CẤM' : 'BỎ CẤM'}
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
                        Bỏ cấm
                    </Button>
                    <GridToolbarQuickFilter />
                </GridToolbarContainer>
            </div>
        );
    };

    const columns: any[] = [
        { headerName: 'Id', field: 'id', width: 250 },
        { headerName: 'Email người gửi', field: 'email', width: 300 },
        { headerName: 'Tên người gửi', field: 'username', width: 230 },
        // { headerName: 'Nội dung', field: 'content', width: 180 },
        { headerName: 'Thời gian', field: 'time', width: 150 },
        {
            headerName: 'Trạng thái',
            field: 'status',
            type: 'boolean',
            editable: true,
            width: 100,
        },
        {
            field: 'detail',
            type: 'actions',
            headerName: 'Chi tiết',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }: { id: string }) => {
                return [
                    <GridActionsCellItem
                        icon={<LibraryBooksIcon />}
                        label="detail"
                        // onClick={() => handleOpen(id)}
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
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => console.log(error)}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
            />
            {renderConfirmDialog()}
        </div>
    );
}
