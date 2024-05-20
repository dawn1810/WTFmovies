import { AddCircleOutline, KeyboardArrowDown, KeyboardArrowUp, Update } from '@mui/icons-material';
import { Button, IconButton, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { CriteriaInterface, RowInterface } from '~/libs/interfaces';

export default function Row({
    row,
    index,
    handleCloseDialog,
    handleOpenDialog,
    handleUpdateStandard,
}: {
    row: RowInterface;
    index: number;
    handleCloseDialog: any;
    handleOpenDialog: any;
    handleUpdateStandard: any;
}) {
    const [open, setOpen] = useState(false);

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
                <TableCell align="center">{row.maxScore}</TableCell>
                <TableCell align="center">
                    <IconButton>
                        <Update onClick={() => handleUpdateStandard(index)} />
                    </IconButton>
                </TableCell>
            </TableRow>
            {open && (
                <>
                    {row.criteria &&
                        row.criteria.map((criteria: CriteriaInterface) => (
                            <TableRow key={criteria.name} hover>
                                <TableCell />
                                <TableCell />
                                <TableCell>{criteria.name}</TableCell>
                                <TableCell align="center">{criteria.maxScore}</TableCell>
                                <TableCell />
                            </TableRow>
                        ))}
                    <TableRow key={index + 'new'} hover onClick={() => handleOpenDialog('Thêm tiêu chí mới')}>
                        <TableCell />
                        <TableCell />
                        <TableCell>
                            <Button
                                startIcon={<AddCircleOutline />}
                                onClick={() => handleOpenDialog('Thêm tiêu chí mới')}
                            >
                                Thêm tiêu chí mới
                            </Button>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </>
            )}
        </>
    );
}
