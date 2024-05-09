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
} from '@mui/x-data-grid';
import { Block, Grading, LockOpen, Reply } from '@mui/icons-material';

import style from './Table.module.scss';

const cx = classNames.bind(style);

const columns: any = [
    { headerName: 'ID', field: 'id', width: 180 },
    { headerName: 'Loại', field: 'type', width: 80 },
    { headerName: 'Email', field: 'from', width: 250 },
    { headerName: 'Nội dung', field: 'content', width: 500 },
    { headerName: 'Thời gian', field: 'time', width: 100 },
];

export default function DataGridCom({ dataset, title_name }: { dataset: any[]; title_name: string }) {
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel | any>([]);

    const CustomToolbar = () => {
        // const apiRef = useGridApiContext();
        const [open, setOpen] = useState(false);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleApprove = async () => {
            const response = await fetch('/api/v1/admin/approveReport', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: rowSelectionModel }),
            });

            if (response.ok) {
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
                    <DialogTitle id="alert-dialog-title">Bạn có muốn DUYỆT:</DialogTitle>
                    <DialogContent>
                        <ul>
                            {rowSelectionModel.map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={handleApprove} autoFocus>
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
                        startIcon={<Grading />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={handleOpen}
                    >
                        Duyệt
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Reply />}
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
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
            />
        </div>
    );
}
