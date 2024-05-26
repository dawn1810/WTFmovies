import { AddCircleOutline, Delete, KeyboardArrowDown, KeyboardArrowUp, Update } from '@mui/icons-material';
import { Button, IconButton, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { CriteriaInterface, RowInterface } from '~/libs/interfaces';
import RowDialog from './RowDialog';

export default function Row({
    row,
    index,
    handleCloseDialog,
    handleOpenDialog,
    handleUpdateStandard,
    handleDeleteStandard,
}: {
    row: RowInterface;
    index: number;
    handleCloseDialog: any;
    handleOpenDialog: any;
    handleUpdateStandard: any;
    handleDeleteStandard: any;
}) {
    const [open, setOpen] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<{ title: string; type: number }>({ title: '', type: 0 });
    const [currentCriteria, setCurrentCriteria] = useState(0);

    const maxRowScore: number = row.criteria.reduce((sum, currCriteria) => sum + +currCriteria.maxScore, 0);

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleOpen = (title: string, type: number = 0) => {
        setDialogType({ title, type });
        setDialogOpen(true);
    };

    const handleUpdateCriteria = (index: number) => {
        setDialogType({ title: 'Cập nhật tiêu chí', type: 1 });
        setCurrentCriteria(index);
        setDialogOpen(true);
    };

    const handleDeleteCriteria = (index: number) => {
        setDialogType({ title: 'Xoá tiêu chí', type: 2 });
        setCurrentCriteria(index);
        setDialogOpen(true);
    };

    return (
        <>
            <TableRow key={index} hover>
                <TableCell align="center">
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">{maxRowScore}</TableCell>
                <TableCell align="center">
                    <IconButton>
                        <Update onClick={() => handleUpdateStandard(index)} />
                    </IconButton>
                    <IconButton style={{ marginLeft: 18 }}>
                        <Delete onClick={() => handleDeleteStandard(index)} />
                    </IconButton>
                </TableCell>
            </TableRow>
            {open && (
                <>
                    {row.criteria &&
                        row.criteria.map((criteria: CriteriaInterface, index: number) => (
                            <TableRow key={criteria.name} hover>
                                <TableCell />
                                <TableCell />
                                <TableCell>{criteria.name}</TableCell>
                                <TableCell align="center">{criteria.maxScore}</TableCell>
                                <TableCell align="center">
                                    <IconButton>
                                        <Update onClick={() => handleUpdateCriteria(index)} />
                                    </IconButton>
                                    <IconButton style={{ marginLeft: 18 }}>
                                        <Delete onClick={() => handleDeleteCriteria(index)} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    <TableRow key={index + 'new'} hover onClick={() => handleOpen('Thêm tiêu chí mới')}>
                        <TableCell />
                        <TableCell />
                        <TableCell>
                            <Button startIcon={<AddCircleOutline />} onClick={() => handleOpen('Thêm tiêu chí mới')}>
                                Thêm tiêu chí mới
                            </Button>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                    </TableRow>

                    {(row.criteria || dialogType.type === 0) && (
                        <RowDialog
                            dialogOpen={dialogOpen}
                            currentRow={index}
                            currentCriteria={currentCriteria}
                            dialogType={dialogType}
                            handleCloseDialog={handleClose}
                        />
                    )}
                </>
            )}
        </>
    );
}
