import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDebounce } from '~/hooks';
import { useDispatch } from 'react-redux';
//import { AlertColor } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import style from '../Table.module.scss';

const cx = classNames.bind(style);

function ReportDialog({
    open,
    reports,
    handleClose,
}: {
    open: boolean;
    reports?: { id: string; ep?: number }[];
    handleClose: (event: any) => void;
}) {
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
                {reports && reports.length
                    ? reports.map((report: any, index: any) => (
                          <Accordion key={index}>
                              <AccordionSummary expandIcon={<ArrowDropDownIcon />} id="panel2-header">
                                  <Typography>{report.from}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                  <Typography dangerouslySetInnerHTML={{ __html: report.content }} />
                                  <Typography>Tập phim báo cáo: {report.ep}</Typography>
                                  <Typography>Thời gian thực hiện: {report.time.substring(0, 10)}</Typography>
                              </AccordionDetails>
                          </Accordion>
                      ))
                    : 'Không có báo cáo'}
            </DialogContent>
        </Dialog>
    );
}

export default ReportDialog;
