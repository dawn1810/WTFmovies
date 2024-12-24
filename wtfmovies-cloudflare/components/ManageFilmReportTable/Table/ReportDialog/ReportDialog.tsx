import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDebounce } from '~/hooks';
import { useDispatch } from 'react-redux';
//import { AlertColor } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import style from '../Table.module.scss';
import { changeContent, changeOpen, changeType } from '~/components/Notify/notifySlide';

const cx = classNames.bind(style);

function ReportDialog({
    open,
    reports,
    currReport,
    setReport,
    handleClose,
    setData,
}: {
    open: boolean;
    reports?: { _id: string; id: string; ep?: number }[];
    currReport: number;
    setReport: any;
    handleClose: (event: any) => void;
    setData: any;
}) {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(changeContent(content));
        dispatch(changeType(type));
        dispatch(changeOpen(true));
    };

    const [loading, setLoading] = useState(false);

    const handleToolApprove = async (ids: string[]) => {
        setLoading(true);
        const response = await fetch('/api/v1/admin/approveReport', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: ids }),
        });

        if (response.ok) {
            if (ids.length === reports?.length) {
                // remove report for later click
                setData((prev: any) => {
                    const updatedData = [...prev];

                    // If the item is found, update its status
                    if (currReport !== -1) {
                        updatedData[currReport].reports = [];
                        setReport([]);
                    }
                    return updatedData;
                });
                handleClose(event);
            } else {
                // for instanse click
                setData((prev: any) => {
                    const updatedData = [...prev];

                    // If the item is found, update its status
                    if (currReport !== -1) {
                        updatedData[currReport].reports = updatedData[currReport].reports.filter(
                            (report: any) => !ids.includes(report._id),
                        );
                        setReport(updatedData[currReport].reports);
                    }
                    return updatedData;
                });
            }
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
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle sx={{ m: 0, p: 2 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{'Danh sách báo cáo:'}</span>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {reports && reports.length ? (
                    <>
                        {reports.map((report: any, index: any) => (
                            <Accordion key={index}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />} id="panel2-header">
                                    <Typography>{report.from}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography dangerouslySetInnerHTML={{ __html: report.content }} />
                                    <Typography>Tập phim báo cáo: {report.ep}</Typography>
                                    <Typography>Thời gian thực hiện: {report.time.substring(0, 10)}</Typography>
                                </AccordionDetails>
                                <Box
                                    component="div"
                                    sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}
                                >
                                    <LoadingButton
                                        loading={loading}
                                        onClick={() => handleToolApprove([report._id])}
                                        autoFocus
                                    >
                                        ĐÃ ĐỌC
                                    </LoadingButton>
                                </Box>
                            </Accordion>
                        ))}
                        <Box
                            component="div"
                            sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: '18px' }}
                        >
                            <LoadingButton
                                loading={loading}
                                onClick={() => {
                                    const ids = reports.map((report) => report._id);
                                    handleToolApprove(ids);
                                }}
                                autoFocus
                            >
                                ĐÃ ĐỌC TOÀN BỘ
                            </LoadingButton>
                        </Box>
                    </>
                ) : (
                    'Không có báo cáo'
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ReportDialog;
