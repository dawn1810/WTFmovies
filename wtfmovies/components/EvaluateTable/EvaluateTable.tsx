'use client';
import classNames from 'classnames/bind';
import { SyntheticEvent, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
} from '@mui/material';
import { AddCircleOutline, KeyboardArrowDown, KeyboardArrowUp, Update } from '@mui/icons-material';

import style from './EvaluateTable.module.scss';
import { TabContext, TabList, TabPanel } from '@mui/lab';

interface criteriaInterface {
    name: string;
    maxScore: number;
}

interface rowInterface {
    name: string;
    maxScore: number;
    criteria?: criteriaInterface[];
}

const cx = classNames.bind(style);

function createData(name: string, maxScore: number, criteria: criteriaInterface[]) {
    return { name, maxScore, criteria };
}

const rows = [
    createData('Chấp hành nội quy tác phong.', 10, [
        { name: 'Tuần thủ giờ làm việc và nội quy lao động.', maxScore: 5 },
        { name: 'Trang phục gọn gàng sạch sẽ.', maxScore: 3 },
        { name: 'Giữ gin vệ sinh chung và vệ sinh nơi làm việc.', maxScore: 3 },
    ]),
    createData('Quan hệ.', 10, [
        { name: 'Với cấp trên, đồng nghiệp đối tác, khách hàng.', maxScore: 5 },
        { name: 'Giải quyết yêu cầu khách hàng nhanh chóng kịp thời.', maxScore: 3 },
        { name: 'Thái độ chăm sóc khách hàng: cẩn thận, chu đáo, thoả mãn nhu cầu khách hàng.', maxScore: 3 },
    ]),
];

function Row({
    row,
    index,
    handleCloseDialog,
    handleOpenDialog,
    handleUpdateStandard,
}: {
    row: rowInterface;
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
                        row.criteria.map((criteria: criteriaInterface) => (
                            <TableRow key={criteria.name} hover>
                                <TableCell />
                                <TableCell />
                                <TableCell>{criteria.name}</TableCell>
                                <TableCell align="center">{criteria.maxScore}</TableCell>
                                <TableCell />
                                {/* <TableCell align="center">
                                    <IconButton onClick={() => handleOpenDialog(criteria.name, criteria.maxScore)}>
                                        <Update />
                                    </IconButton>
                                </TableCell> */}
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

export default function BasicTable() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<{ title: string; type: number }>({ title: '', type: 0 });
    const [currentRow, setCurrentRow] = useState(0);

    const [tabValue, setTabValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleOpenDialog = (title: string, type: number = 0) => {
        setDialogType({ title, type });
        setDialogOpen(true);
    };
    const handleUpdateStandard = (index: number) => {
        setDialogType({ title: 'Cập nhật tiêu chuẩn', type: 1 });
        setCurrentRow(index);
        setDialogOpen(true);
    };

    const handleAddCriteria = () => {};

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title_name')}>{'Quản lý đánh giá hội viên'}</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow hover>
                            <TableCell width={10} />
                            <TableCell width={10} align="center">
                                STT
                            </TableCell>
                            <TableCell>Tiêu chuẩn</TableCell>
                            <TableCell width={10} align="center">
                                Điểm
                            </TableCell>
                            <TableCell width={100} align="center">
                                Cập nhật
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <Row
                                row={row}
                                index={index}
                                handleCloseDialog={handleCloseDialog}
                                handleOpenDialog={handleOpenDialog}
                                handleUpdateStandard={handleUpdateStandard}
                            />
                        ))}
                        <TableRow key={'new'} hover onClick={() => handleOpenDialog('Thêm tiêu chuẩn mới')}>
                            <TableCell />
                            <TableCell />
                            <TableCell align="center">
                                <Button
                                    startIcon={<AddCircleOutline />}
                                    onClick={() => handleOpenDialog('Thêm tiêu chuẩn mới')}
                                >
                                    Thêm tiêu chuẩn mới
                                </Button>
                            </TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{dialogType.title}</DialogTitle>
                <DialogContent className={cx('dialog')}>
                    {dialogType.type === 0 ? (
                        <>
                            <TextField autoFocus fullWidth multiline maxRows={5} label="Tên" value="" />
                            <TextField fullWidth type="number" label="Điểm tối đa" value={undefined} />
                        </>
                    ) : (
                        <>
                            <TabContext value={tabValue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Json" value="1" />
                                        <Tab label="Input" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <TextField
                                        autoFocus
                                        fullWidth
                                        multiline
                                        maxRows={18}
                                        value={JSON.stringify(rows[currentRow], null, 2)}
                                    />
                                </TabPanel>
                                <TabPanel value="2" className={cx('tab-dialog')}>
                                    <TextField
                                        autoFocus
                                        fullWidth
                                        multiline
                                        maxRows={5}
                                        label="Tên"
                                        value={rows[currentRow].name}
                                    />
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Điểm tối đa"
                                        value={rows[currentRow].maxScore}
                                    />
                                    {rows[currentRow].criteria.map((criteria, index) => (
                                        <>
                                            <h4>{'Tiêu chí ' + (index + 1) + ':'}</h4>
                                            <TextField
                                                fullWidth
                                                multiline
                                                maxRows={5}
                                                label="Tên"
                                                value={criteria.name}
                                            />
                                            <TextField
                                                fullWidth
                                                type="number"
                                                label="Điểm tối đa"
                                                value={criteria.maxScore}
                                            />
                                        </>
                                    ))}
                                </TabPanel>
                            </TabContext>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Huỷ</Button>
                    <Button onClick={handleCloseDialog}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
