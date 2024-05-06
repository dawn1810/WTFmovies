'use client';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { viVN } from '@mui/x-data-grid/locales';
import { useSelector } from 'react-redux';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridRowSelectionModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridColDef,
    useGridApiContext,
} from '@mui/x-data-grid';
import { Add, Block, LockOpen } from '@mui/icons-material';

import style from './Table.module.scss';
import { alertStatusSelector } from '~/redux/selectors';
import { MovieForm } from '~/components/Dialog';

const cx = classNames.bind(style);
export default function DataGridCom({
    column,
    dataset,
    title_name,
}: {
    column: any[];
    dataset: any;
    title_name: string;
}) {
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel | any>([]);

    const status = useSelector(alertStatusSelector);

    const CustomToolbar = () => {
        const apiRef = useGridApiContext();

        const [open, setOpen] = useState(false);
        const [dialogType, setDialogType] = useState(true);

        const handleOpenBan = () => {
            setOpen(true);
            setDialogType(true);
        };

        const handleOpenUnban = () => {
            setOpen(true);
            setDialogType(false);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleBan = () => {
            apiRef.current.setEditCellValue({
                id: 'binhminh0181@mail.com',
                field: 'role',
                value: false,
                debounceMs: 200,
            });
            // rowSelectionModel.forEach(async (id: string) => {});
            setOpen(false);
        };

        const handleUnban = () => {
            rowSelectionModel.forEach((id: string) => {
                console.log(id);
            });
        };

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Bạn có muốn {dialogType ? 'cấm' : 'bỏ cấm'}:</DialogTitle>
                    <DialogContent>
                        <ul>
                            {rowSelectionModel.map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Huỷ</Button>
                        <Button onClick={dialogType ? handleBan : handleUnban} autoFocus>
                            {dialogType ? 'Cấm' : 'Bỏ cấm'}
                        </Button>
                    </DialogActions>
                </Dialog>

                <GridToolbarContainer>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                    <Box sx={{ flexGrow: 1 }} />

                    {/* <Button variant="outlined" startIcon={<Add />} className={cx('btncustom')} onClick={handleAdd}>
                        Thêm
                    </Button> */}
                    <Button
                        variant="outlined"
                        startIcon={<Block />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={handleOpenBan}
                    >
                        Cấm
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<LockOpen />}
                        disabled={rowSelectionModel.length === 0}
                        className={cx('btncustom')}
                        onClick={handleOpenUnban}
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
                columns={column}
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
