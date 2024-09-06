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
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
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
} from '@mui/x-data-grid';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { viVN } from '@mui/x-data-grid/locales';

import style from './Table.module.scss';
import { useDispatch } from 'react-redux';
import { showNotify } from '~/components/Notify/notifySlide';

const cx = classNames.bind(style);

// const renderSelectEditInputCell: GridColDef['renderCell'] = (params) => {
//     return <SelectEditInputCell {...params} />;
// };

const columns: any[] = [
    { headerName: 'STT', field: 'index', align: 'center', width: 10 },
    { headerName: 'Email', field: 'id', width: 280 },
    { headerName: 'Tên hiễn thị', field: 'name', width: 200 },
    { headerName: 'Ngày sinh', field: 'birthDate', width: 180 },
    { headerName: 'Giới tính', field: 'gender', width: 180 },
    {
        headerName: 'Phân quyền',
        field: 'role',
        width: 100,
        type: 'singleSelect',
        valueOptions: ['none', 'editor', 'admin'],
        editable: true,
    },
    {
        headerName: 'Trạng thái',
        field: 'status',
        width: 100,
        type: 'boolean',
        // editable: true,
    },
];

export default function ManageEditorTable({ dataset, title_name }: { dataset: any[]; title_name: string }) {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    const [data, setData] = useState<any>(dataset);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel | any>([]);
    const [promiseArguments, setPromiseArguments] = useState<any>(null);
    const [listUpdate, setListUpdate] = useState<boolean>(false);
    const [editColumn, setEditCollumn] = useState<number>(-1);

    const processRowUpdate = useCallback(
        (newRow: GridRowModel, oldRow: GridRowModel) =>
            new Promise<GridRowModel>((resolve, reject) => {
                console.log(newRow === oldRow);

                if (newRow.status !== oldRow.status || newRow.role !== oldRow.role) {
                    if (newRow.status !== oldRow.status) setEditCollumn(7);
                    else if (newRow.role !== oldRow.role) setEditCollumn(6);
                    // Save the arguments to resolve or reject the promise later
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

        const response = await fetch('/api/v1/admin/banUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emails: [newRow.id], ban: newRow.status }),
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

    const handleCellEditRole = async () => {
        const { newRow, oldRow, reject, resolve } = promiseArguments;

        const response = await fetch('/api/v1/admin/updateRole', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: newRow.id, role: newRow.role }),
        });

        if (response.ok) {
            resolve(newRow);
            showAlert('Thay đổi phần quyền người dùng thành công 😎😎😎', 'success');
        } else {
            if (response.status === 400) {
                showAlert('Thay đổi phần quyền người dùng thất bại 😭😭😭', 'error');
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
                {editColumn === 7 ? (
                    <>
                        <DialogTitle id="alert-dialog-title">
                            Bạn có muốn {newRow.status ? 'GỠ CẤM' : 'CẤM'}:
                        </DialogTitle>
                        <DialogContent>
                            <ul>
                                <li>{newRow.id}</li>
                            </ul>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Huỷ</Button>
                            <Button onClick={() => handleCellEditStatus()} autoFocus>
                                {newRow.status ? 'GỠ CẤM' : 'CẤM'}
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <>
                        <DialogTitle id="alert-dialog-title">Bạn có muốn thay đổi phân quyền:</DialogTitle>
                        <DialogContent>
                            <ul>
                                <li>{newRow.id}</li>
                            </ul>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Huỷ</Button>
                            <Button onClick={() => handleCellEditRole()} autoFocus>
                                Thay đổi
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        );
    };

    const CustomToolbar = () => {
        const [open, setOpen] = useState(false);
        const [dialogType, setDialogType] = useState(true);
        const [type, setType] = useState<string>('0');

        const handleChangeType = (event: SelectChangeEvent) => {
            setType(event.target.value);
        };

        const handleOpen = (status: boolean) => {
            setOpen(true);
            setDialogType(status);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleBan = async (status: boolean) => {
            const response = await fetch('/api/v1/admin/banUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emails: rowSelectionModel, ban: status, type: +type }),
            });

            if (response.ok) {
                setData((prevData: any) => {
                    const updatedData = [...prevData]; // Create a copy of the original data

                    rowSelectionModel.forEach((currEmail: string) => {
                        const index = prevData.findIndex((item: any) => item.id === currEmail);

                        console.log(index);
                        // If the item is found, update its status
                        if (index !== -1) {
                            updatedData[index] = { ...updatedData[index], status: status };
                        }
                    });

                    return updatedData;
                });
                setOpen(false);
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
        };

        return (
            <div>
                <Dialog fullWidth={true} open={open} onClose={handleClose}>
                    <DialogTitle id="alert-dialog-title">Bạn có muốn {dialogType ? 'CẤM' : 'GỠ CẤM'}:</DialogTitle>
                    <DialogContent>
                        <h4>Danh sách người dùng:</h4>
                        <ul>
                            {rowSelectionModel.map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                        <h4>Loại hình phạt:</h4>
                        <Select style={{ width: '100%' }} autoFocus value={type} onChange={handleChangeType}>
                            <MenuItem value={0}>14 ngày</MenuItem>
                            <MenuItem value={1}>30 ngày</MenuItem>
                            <MenuItem value={2}>1 năm</MenuItem>
                            <MenuItem value={3}>Vĩnh viễn</MenuItem>
                        </Select>
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
