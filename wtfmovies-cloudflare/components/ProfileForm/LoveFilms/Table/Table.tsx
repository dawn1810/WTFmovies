'use client';
import { useState } from 'react';
import classNames from 'classnames/bind';
//import { AlertColor } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { viVN } from '@mui/x-data-grid/locales';
import { DataGrid, GridToolbarQuickFilter, GridRowSelectionModel, GridToolbarContainer } from '@mui/x-data-grid';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';

import style from './Table.module.scss';
import ImageCustom from '~/components/ImageCustom';
import { formatNumber, timePassed } from '~/libs/clientFunc';
import UnlikeButton from './UnlikeButton';
import { useDispatch } from 'react-redux';
import { showNotify } from '~/components/Notify/notifySlide';

const cx = classNames.bind(style);

export default function DataGridCom({ dataset }: { dataset: any[] }) {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel | any>([]);
    const [rows, setRows] = useState<any[]>(dataset);

    const unLikeFilm = (id: string) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const columns: any = [
        { field: 'id' },
        { field: 'notification' },
        { headerName: 'Tên phim', field: 'name', width: 220 },
        {
            headerName: 'Hình ảnh',
            field: 'img',
            headerAlign: 'center',
            align: 'center',
            width: 220,
            renderCell: (params: any) => {
                return <ImageCustom src={params.value} className={cx('img-custom')} />;
            },
        },
        {
            headerName: 'Thời gian cập nhật',
            field: 'updateTime',
            headerAlign: 'center',
            align: 'center',
            width: 180,
            valueFormatter: (value?: string) => {
                if (value == null) {
                    return '';
                }
                return timePassed(value);
            },
        },
        {
            headerName: 'Lượt xem',
            field: 'views',
            headerAlign: 'center',
            align: 'center',
            width: 100,
            valueFormatter: (value?: number) => {
                if (value == null) {
                    return '';
                }
                return formatNumber(value);
            },
        },
        {
            headerName: 'Lượt thích',
            field: 'likes',
            headerAlign: 'center',
            align: 'center',
            width: 100,
            valueFormatter: (value?: number) => {
                if (value == null) {
                    return '';
                }
                return formatNumber(value);
            },
        },
        { headerName: 'Trạng thái', field: 'status', headerAlign: 'center', align: 'center', width: 180 },
        {
            field: 'actions',
            type: 'actions',
            align: 'center',
            width: 100,
            getActions: (params: any) => [
                <UnlikeButton key={params.id} searchName={params.id} unLikeFilm={unLikeFilm} />,
            ],
        },
    ];

    const CustomToolbar = () => {
        const [open, setOpen] = useState(false);

        const handleOpen = (status: boolean) => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleUnlike = async () => {
            const response = await fetch('/api/v1/updateLike', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filmId: rowSelectionModel, love: false }),
            });

            if (response.ok) {
                rowSelectionModel.forEach((element: string) => {
                    unLikeFilm(element);
                });
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
                    <DialogTitle id="alert-dialog-title">Bạn có muốn &#39;BỎ THÍCH&#39;:</DialogTitle>
                    <DialogContent>
                        <ul>
                            {rowSelectionModel.map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={handleUnlike} autoFocus>
                            Bỏ thích
                        </Button>
                    </DialogActions>
                </Dialog>

                <GridToolbarContainer>
                    <Button
                        variant="outlined"
                        startIcon={<HeartBrokenOutlinedIcon />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={() => handleOpen(true)}
                    >
                        Bỏ thích
                    </Button>
                    {/* <Button
                        variant="outlined"
                        startIcon={<NotificationsNone />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={() => handleOpen(false)}
                    >
                        Thông báo
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<NotificationsOffOutlined />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={() => handleOpen(false)}
                    >
                        Tắt thông báo
                    </Button> */}

                    <Box sx={{ flexGrow: 1 }} />

                    <GridToolbarQuickFilter />
                </GridToolbarContainer>
            </div>
        );
    };

    return (
        <>
            <DataGrid
                columns={columns}
                rows={rows}
                localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                checkboxSelection
                rowSelectionModel={rowSelectionModel}
                slots={{ toolbar: CustomToolbar }}
                getRowHeight={({ densityFactor }) => {
                    return densityFactor * 190;
                }}
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
                columnVisibilityModel={{
                    id: false,
                    notification: false,
                }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
            />
        </>
    );
}
