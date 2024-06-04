'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { viVN } from '@mui/x-data-grid/locales';
import classNames from 'classnames/bind';
//import { AlertColor } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GradingIcon from '@mui/icons-material/Grading';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ReplyIcon from '@mui/icons-material/Reply';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridToolbarFilterButton,
    GridRowSelectionModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridActionsCellItem,
    GridToolbarExport,
} from '@mui/x-data-grid';

import style from './Table.module.scss';
import CurrentDialog from './CurrentDialog/CurrentDialog';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

const cx = classNames.bind(style);

export default function DataGridCom({ dataset, title_name }: { dataset: any[]; title_name: string }) {
    const [rows, setRows] = useState(dataset);
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const [open, setOpen] = useState<boolean>(false);
    const [dialogData, setDialogData] = useState({ id: '', type: '', from: '', content: '', time: '' });
    const [dialogType, setDialogType] = useState(true);

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel | any>([]);

    const columns: any = [
        { headerName: 'Id', field: 'id', width: 280 },
        { headerName: 'Loại', field: 'type', width: 180 },
        { headerName: 'Email', field: 'from', width: 300 },
        // { headerName: 'Nội dung', field: 'content', width: 350 },
        { headerName: 'Thời gian', field: 'time', width: 200 },
        {
            field: 'detail',
            type: 'actions',
            headerName: 'Chi tiết',
            width: 150,
            cellClassName: 'actions',
            getActions: ({ id }: { id: string }) => {
                return [
                    <GridActionsCellItem
                        icon={<LibraryBooksIcon />}
                        label="detail"
                        onClick={() => handleOpen(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleOpen = (id: string) => {
        const selected_row = rows.filter((data) => data.id === id);
        setDialogData(selected_row[0]);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDialogType(true);
    };

    const handleReply = (type: boolean) => {
        setDialogType(type);
    };

    const handleDeleteRow = (id: string) => {
        if (rows.length === 0) {
            return;
        }
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleApprove = async (ids: string[]) => {
        const response = await fetch('/api/v1/admin/approveReport', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: ids }),
        });

        if (response.ok) {
            showAlert('Thay đổi trạng thái thành công 😎😎😎', 'success');
            ids.forEach((id) => {
                handleDeleteRow(id);
            });
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

    const CustomToolbar = () => {
        const [open, setOpen] = useState(false);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
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
                    <DialogTitle>Bạn có muốn DUYỆT:</DialogTitle>
                    <DialogContent>
                        <ul>
                            {rowSelectionModel.map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={() => handleApprove(rowSelectionModel)} autoFocus>
                            DUYỆT
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
                        startIcon={<GradingIcon />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={handleOpen}
                    >
                        Duyệt
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ReplyIcon />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={handleOpen}
                    >
                        Phản hồi
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
                rows={rows}
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
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
            />
            <CurrentDialog
                open={open}
                dialogType={dialogType}
                dialogData={dialogData}
                handleClose={handleClose}
                handleReply={handleReply}
                handleApprove={handleApprove}
            />
        </div>
    );
}
