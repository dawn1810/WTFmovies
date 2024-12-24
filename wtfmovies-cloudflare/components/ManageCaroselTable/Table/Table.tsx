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
import BorderColorIcon from '@mui/icons-material/BorderColor';
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
import CurrentDialog from './CurrentDialog';
import { changeContent, changeOpen, changeType } from '~/components/Notify/notifySlide';
import { LoadingButton } from '@mui/lab';
import { cropImage } from '~/libs/clientFunc';

const cx = classNames.bind(style);

export default function DataGridCom({ dataset, title_name }: { dataset: any[]; title_name: string }) {
    const [rows, setRows] = useState(dataset);
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(changeContent(content));
        dispatch(changeType(type));
        dispatch(changeOpen(true));
    };

    const [open, setOpen] = useState<boolean>(false);
    const [dialogData, setDialogData] = useState<any>(null);
    const [approveLoading, setApproveLoading] = useState(false);

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel | any>([]);

    const columns: any = [
        { headerName: 'Id', field: 'id', width: 200 },
        { headerName: 'filmId', field: 'film_id', width: 200 },
        { headerName: 'Hình ảnh hiển thị', field: 'poster', width: 300 },
        { headerName: 'Tên Phim', field: 'film_name', width: 300 },
        {
            field: 'detail',
            type: 'actions',
            headerName: 'Chỉnh sửa',
            width: 150,
            cellClassName: 'actions',
            getActions: ({ id }: { id: string }) => {
                return [
                    <GridActionsCellItem
                        key={id} // Add this line
                        icon={<BorderColorIcon />}
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
    };

    const handleSave = async (data: any, cropResultBanner: any, imgBannerMovie: any) => {
        setApproveLoading(true);
        const formData = new FormData();
        const dropedImageBanner = await cropImage(imgBannerMovie, cropResultBanner);
        if (!!dropedImageBanner) formData.append('specialPoster', dropedImageBanner);

        formData.append('info', JSON.stringify(data));
        const response = await fetch('/api/v1/admin/caroselUpdate', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const decodeData: any = await response.json();
            setRows([decodeData.content, ...rows.filter((row) => row.id !== decodeData.content.id)]);
            setOpen(false);
            showAlert('Thay đổi banner thành công 😎😎😎', 'success');
        } else if (response.status === 400) {
            showAlert('Thay đổi banner thất bại 😭😭😭', 'error');
        } else if (response.status === 401) {
            showAlert('Xác thực thất bại 😶‍🌫️😶‍🌫️😶‍🌫️', 'error');
        } else if (response.status === 403) {
            showAlert('Api không trong phạm trù quyền của bạn 🤬🤬🤬', 'error');
        } else if (response.status === 500) {
            showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
        setApproveLoading(false);
    };

    const CustomToolbar = () => {
        return (
            <div>
                <GridToolbarContainer>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                    <Box sx={{ flexGrow: 1 }} />

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
                getRowId={(row) => row.id} // Add this line
                localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
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
                key={dialogData?.id}
                oldId={dialogData?.id}
                dialogData={dialogData}
                handleClose={handleClose}
                handleSave={handleSave}
                approveLoading={approveLoading}
            />
        </div>
    );
}
