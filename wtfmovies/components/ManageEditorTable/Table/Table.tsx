'use client';
import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
    GridColDef,
} from '@mui/x-data-grid';
import { Block, LockOpen } from '@mui/icons-material';

import style from './Table.module.scss';

const cx = classNames.bind(style);

// const renderSelectEditInputCell: GridColDef['renderCell'] = (params) => {
//     return <SelectEditInputCell {...params} />;
// };

const columns: any[] = [
    { headerName: 'STT', field: 'index', align: 'center', width: 10 },
    { headerName: 'Email', field: 'id', width: 180 },
    { headerName: 'Tên hiễn thị', field: 'name', width: 180 },
    { headerName: 'Ngày sinh', field: 'birthDate', width: 180 },
    { headerName: 'Giới tính', field: 'gender', width: 180 },
    {
        headerName: 'Phân quyền',
        field: 'role',
        width: 180,
        type: 'singleSelect',
        valueOptions: ['none', 'editor', 'admin'],
        editable: true,
    },
    {
        headerName: 'Trạng thái',
        field: 'status',
        type: 'boolean',
        editable: true,
    },
];

export default function DataGridCom({ dataset, title_name }: { dataset: any[]; title_name: string }) {
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
            alert('Thay đổi trạng thái thành công 😎😎😎');
        } else {
            if (response.status === 400) {
                alert('Thay đổi trạng thái thất bại 😭😭😭');
            } else if (response.status === 401) {
                alert('Xác thực thất bại 😶‍🌫️😶‍🌫️😶‍🌫️');
            } else if (response.status === 403) {
                alert('Api không trong phạm trù quyền của bạn 🤬🤬🤬');
            } else if (response.status === 500) {
                alert('Lỗi trong quá trình thay đổi trạng thái 😥😥😥');
            }
            reject(oldRow);
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
            alert('Thay đổi phần quyền người dùng thành công 😎😎😎');
        } else {
            if (response.status === 400) {
                alert('Thay đổi phần quyền người dùng thất bại 😭😭😭');
            } else if (response.status === 401) {
                alert('Xác thực thất bại 😶‍🌫️😶‍🌫️😶‍🌫️');
            } else if (response.status === 403) {
                alert('Api không trong phạm trù quyền của bạn 🤬🤬🤬');
            } else if (response.status === 500) {
                alert('Lỗi trong quá trình thay đổi phần quyền người dùng 😥😥😥');
            }
            reject(oldRow);
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
                            Bạn có muốn {newRow.status ? 'BỎ CẤM' : 'CẤM'}:
                        </DialogTitle>
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
            const response = await fetch('/api/v1/admin/banUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emails: rowSelectionModel, ban: status }),
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
                setOpen(false);
                alert('Thay đổi trạng thái thành công 😎😎😎');
            } else if (response.status === 400) {
                alert('Thay đổi trạng thái thất bại 😭😭😭');
            } else if (response.status === 401) {
                alert('Xác thực thất bại 😶‍🌫️😶‍🌫️😶‍🌫️');
            } else if (response.status === 403) {
                alert('Api không trong phạm trù quyền của bạn 🤬🤬🤬');
            } else if (response.status === 500) {
                alert('Lỗi trong quá trình thay đổi trạng thái 😥😥😥');
            }
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
                        startIcon={<Block />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={() => handleOpen(true)}
                    >
                        Cấm
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<LockOpen />}
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
