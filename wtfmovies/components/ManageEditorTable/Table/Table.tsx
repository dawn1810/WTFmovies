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
    GridCellModesModel,
    GridCellParams,
    GridCellModes,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HistoryIcon from '@mui/icons-material/History';

import { viVN } from '@mui/x-data-grid/locales';

import style from './Table.module.scss';
import { useDispatch } from 'react-redux';
import { showNotify } from '~/components/Notify/notifySlide';
import { socket } from '~/websocket/websocketService';

const cx = classNames.bind(style);

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
    const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});
    const [editLoading, setEditLoading] = useState<boolean>(false);

    // for history dialog
    const [history, setHistory] = useState<any[]>([]);
    const [historyOpen, setHistoryOpen] = useState<boolean>(false);
    const [historyLoading, setHistoryLoading] = useState<boolean>(false);

    // collum structure
    const columns: any[] = [
        { headerName: 'STT', field: 'index', align: 'center', width: 10 },
        { headerName: 'Email', field: 'id', width: 280 },
        { headerName: 'Tên hiễn thị', field: 'name', width: 200 },
        { headerName: 'Ngày sinh', field: 'birthDate', width: 180 },
        { headerName: 'Giới tính', field: 'gender', width: 100 },
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
        {
            field: 'history',
            type: 'actions',
            headerName: 'Lịch sử',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }: { id: string }) => {
                return [
                    <GridActionsCellItem
                        icon={<HistoryIcon />}
                        label="detail"
                        onClick={() => handleOpenHDialog(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const processRowUpdate = useCallback(
        (newRow: GridRowModel, oldRow: GridRowModel) =>
            new Promise<GridRowModel>((resolve, reject) => {
                if (newRow.role !== oldRow.role) {
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

    // close and open History Dialog
    const handleOpenHDialog = async (id: string) => {
        setHistoryOpen(true);
        const response = await fetch('/api/v1/admin/getUserHistory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: id }),
        });

        if (response.status === 200) {
            const jsonData: { content: string; data: any } = await response.json();
            setHistory(jsonData.data.history);
        } else if (response.status === 401) {
            showAlert('Xác thực thất bại 😶‍🌫️😶‍🌫️😶‍🌫️', 'error');
        } else if (response.status === 403) {
            showAlert('Api không trong phạm trù quyền của bạn 🤬🤬🤬', 'error');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
    };

    const handleCellClick = useCallback((params: GridCellParams, event: React.MouseEvent) => {
        if (!params.isEditable) {
            return;
        }

        // Ignore portal
        if ((event.target as any).nodeType === 1 && !event.currentTarget.contains(event.target as Element)) {
            return;
        }

        setCellModesModel((prevModel) => {
            return {
                // Revert the mode of the other cells from other rows
                ...Object.keys(prevModel).reduce(
                    (acc, id) => ({
                        ...acc,
                        [id]: Object.keys(prevModel[id]).reduce(
                            (acc2, field) => ({
                                ...acc2,
                                [field]: { mode: GridCellModes.View },
                            }),
                            {},
                        ),
                    }),
                    {},
                ),
                [params.id]: {
                    // Revert the mode of other cells in the same row
                    ...Object.keys(prevModel[params.id] || {}).reduce(
                        (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
                        {},
                    ),
                    [params.field]: { mode: GridCellModes.Edit },
                },
            };
        });
    }, []);

    const handleCellModesModelChange = useCallback((newModel: GridCellModesModel) => {
        setCellModesModel(newModel);
    }, []);

    const handleCellEditRole = async () => {
        const { newRow, oldRow, reject, resolve } = promiseArguments;
        setEditLoading(true);

        const response = await fetch('/api/v1/admin/updateRole', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: newRow.id, role: newRow.role }),
        });

        if (response.ok) {
            resolve(newRow);

            // wss for change user role
            if (socket.connected) {
                socket.emit(
                    'changeRole',
                    JSON.stringify({
                        receiver: newRow.id,
                        role: newRow.role,
                    }),
                );
            } else {
                console.error('WebSocket connection not open.');
            }

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
        setEditLoading(false);
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
                <DialogTitle id="alert-dialog-title">Bạn có muốn thay đổi phân quyền:</DialogTitle>
                <DialogContent>
                    <ul>
                        <li>{newRow.id}</li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Huỷ</Button>
                    <LoadingButton loading={editLoading} onClick={() => handleCellEditRole()} autoFocus>
                        Thay đổi
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        );
    };

    const renderHistoryDialog = () => {
        return (
            <Dialog open={historyOpen} onClose={() => setHistoryOpen(false)} fullWidth>
                <DialogTitle>Lịch sử thay đổi:</DialogTitle>
                <DialogContent>
                    {history
                        ? history.map((item: any, index: any) => (
                              <Accordion key={index}>
                                  <AccordionSummary expandIcon={<ArrowDropDownIcon />} id="panel2-header">
                                      <Typography>{item.action}</Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                      <Typography>Người thực hiện: {item.doer}</Typography>
                                      <Typography>Thời gian thực hiện: {item.time}</Typography>
                                  </AccordionDetails>
                              </Accordion>
                          ))
                        : 'Chưa có thay đổi'}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setHistoryOpen(false)}>Xong</Button>
                </DialogActions>
            </Dialog>
        );
    };

    const CustomToolbar = () => {
        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);
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
            setLoading(true);
            let today = new Date();
            switch (+type) {
                case 0:
                    today.setDate(today.getDate() + 14);
                    break;
                case 1:
                    today.setDate(today.getDate() + 30);
                    break;
                case 2:
                    today.setDate(today.getDate() + 365);
                    break;
                case 3:
                    today.setDate(today.getDate() - 1); // ban vĩnh viễn
                    break;
            }

            const response = await fetch('/api/v1/admin/banUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emails: rowSelectionModel, ban: status, unbanDate: today }),
            });

            if (response.ok) {
                setData((prevData: any) => {
                    const updatedData = [...prevData]; // Create a copy of the original data

                    rowSelectionModel.forEach((currEmail: string) => {
                        const index = prevData.findIndex((item: any) => item.id === currEmail);

                        // If the item is found, update its status
                        if (index !== -1) {
                            updatedData[index] = { ...updatedData[index], status: status };
                        }
                    });

                    return updatedData;
                });

                // wss to banned user
                if (status) {
                    if (socket.connected) {
                        socket.emit(
                            'banUser',
                            JSON.stringify({
                                receiver: rowSelectionModel,
                                unbanDate: today.toLocaleString().split(',')[0],
                            }),
                        );
                    } else {
                        console.error('WebSocket connection not open.');
                    }
                }

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
            setLoading(false);
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
                        {dialogType && (
                            <>
                                <h4>Loại hình phạt:</h4>
                                <Select style={{ width: '100%' }} autoFocus value={type} onChange={handleChangeType}>
                                    <MenuItem value={0}>14 ngày</MenuItem>
                                    <MenuItem value={1}>30 ngày</MenuItem>
                                    <MenuItem value={2}>1 năm</MenuItem>
                                    <MenuItem value={3}>Vĩnh viễn</MenuItem>
                                </Select>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <LoadingButton loading={loading} onClick={() => handleBan(!dialogType)} autoFocus>
                            {dialogType ? 'CẤM' : 'GỠ CẤM'}
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
                cellModesModel={cellModesModel}
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
                onCellModesModelChange={handleCellModesModelChange}
                onCellClick={handleCellClick}
            />
            {renderConfirmDialog()}
            {renderHistoryDialog()}
        </div>
    );
}
