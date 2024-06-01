'use client';
import classNames from 'classnames/bind';

import style from './UserEvaluate.module.scss';
import {
    AlertColor,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import { CriteriaInterface, ExtendedUser, RowInterface, ScoreInterface } from '~/libs/interfaces';
import { useEffect, useState } from 'react';
import NotFound from '~/app/(root)/not-found';
import { LoadingButton } from '@mui/lab';
import { CopyAll, Save } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';
import { calcTotal } from '~/libs/clientFunc';

const cx = classNames.bind(style);

const createArray = (rows: RowInterface[]) => {
    const result = rows.map((row) => {
        return new Array(row.criteria.length).fill(0);
    });
    return result;
};

function UserEvaluateTable({
    rows,
    score,
    isAdmin,
    version,
}: {
    rows?: RowInterface[];
    score?: ScoreInterface;
    isAdmin?: boolean;
    version?: string;
}) {
    if (!rows) return NotFound();

    const dispatch = useDispatch();

    const { data: session } = useSession();
    const extendedUser: ExtendedUser | undefined = session?.user;

    const [userScore, setUserScore] = useState(score && score.userScore ? score.userScore : createArray(rows));
    const [adminScore, setAdminScore] = useState(score && score.adminScore ? score.adminScore : createArray(rows));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAdminScore(score && score.adminScore ? score.adminScore : createArray(rows));
        setUserScore(score && score.userScore ? score.userScore : createArray(rows));
    }, [score]);

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const handleChange = (event: any, index: number, criteriaIndex: number, maxValue: number) => {
        const value =
            +event?.target.value < 0 || !event?.target.value
                ? 0
                : +event?.target.value > maxValue
                ? maxValue
                : +event?.target.value;

        const newScoreStore = [...userScore];
        newScoreStore[index] = [...newScoreStore[index]];
        newScoreStore[index][criteriaIndex] = String(value);

        setUserScore(newScoreStore);
    };

    const handleAdminChange = (event: any, index: number, criteriaIndex: number, maxValue: number) => {
        const value =
            +event?.target.value < 0 || !event?.target.value
                ? 0
                : +event?.target.value > maxValue
                ? maxValue
                : +event?.target.value;

        const newScoreStore = [...adminScore];
        newScoreStore[index] = [...newScoreStore[index]];
        newScoreStore[index][criteriaIndex] = String(value);

        setAdminScore(newScoreStore);
    };

    const handleCopy = () => {
        setAdminScore(userScore);
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (extendedUser?.role === 'admin') {
            const response = await fetch('/api/v1/evaluate/adminScore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: score ? score._id : '', score: adminScore, version }),
            });

            if (response.ok) {
                showAlert('Lưu điểm chấm thành công!', 'success');
            } else if (response.status === 400) {
                showAlert('Lưu điểm chấm thất bại!', 'error');
            } else if (response.status === 403) {
                showAlert('API ngoài thẩm quyền của bạn!', 'error');
            } else if (response.status === 500) {
                showAlert('Lỗi lưu điểm chấm, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
        } else {
            const response = await fetch('/api/v1/evaluate/userScore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: extendedUser?.email, score: userScore, version }),
            });

            if (response.ok) {
                showAlert('Lưu điểm chấm thành công!', 'success');
            } else if (response.status === 400) {
                showAlert('Lưu điểm chấm thất bại!', 'error');
            } else if (response.status === 403) {
                showAlert('API ngoài thẩm quyền của bạn!', 'error');
            } else if (response.status === 410) {
                showAlert('Phiên bản bảng đánh giá của bạn đã cũ hãy thử tải lại trang và đánh giá lại!', 'warning');
            } else if (response.status === 422) {
                showAlert('Điểm đánh giá của bạn không hợp lệ', 'error');
            } else if (response.status === 500) {
                showAlert('Lỗi lưu điểm chấm, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            }
        }
        setLoading(false);
    };

    return (
        <div className={cx('wrapper')}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell>Nội dung tiêu chuẩn</TableCell>
                            <TableCell>Nội dung tiêu chí</TableCell>
                            <TableCell align="center">Điểm tối đa</TableCell>
                            <TableCell align="center">Điểm của bạn</TableCell>
                            <TableCell align="center">Điểm của quản lý</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            const maxRowScore: number = row.criteria.reduce(
                                (sum, currCriteria) => sum + +currCriteria.maxScore,
                                0,
                            );
                            return (
                                <>
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell align="center">{maxRowScore}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    {row.criteria &&
                                        row.criteria.map((criteria, criteriaIndex) => (
                                            <TableRow
                                                key={criteriaIndex}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>{criteria.name}</TableCell>
                                                <TableCell align="center">{criteria.maxScore}</TableCell>
                                                <TableCell align="center">
                                                    {(score && score.adminScore) || !!isAdmin ? (
                                                        userScore[index][criteriaIndex]
                                                    ) : (
                                                        <TextField
                                                            type="number"
                                                            value={userScore[index][criteriaIndex]}
                                                            onChange={(event) =>
                                                                handleChange(
                                                                    event,
                                                                    index,
                                                                    criteriaIndex,
                                                                    criteria.maxScore,
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {!isAdmin ? (
                                                        adminScore[index][criteriaIndex]
                                                    ) : (
                                                        <TextField
                                                            type="number"
                                                            value={adminScore[index][criteriaIndex]}
                                                            onChange={(event) =>
                                                                handleAdminChange(
                                                                    event,
                                                                    index,
                                                                    criteriaIndex,
                                                                    criteria.maxScore,
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </>
                            );
                        })}
                        <TableRow key={'sumAll'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell></TableCell>
                            <TableCell component="th" scope="row">
                                Tổng điểm đánh giá
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell align="center">{calcTotal(userScore)}</TableCell>
                            <TableCell align="center">{calcTotal(adminScore)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {(score && score.adminScore && !isAdmin) || (
                <div className={cx('btn-group')}>
                    <Button
                        color="success"
                        startIcon={<CopyAll />}
                        variant="contained"
                        onClick={handleCopy}
                        className={cx('save-btn')}
                    >
                        Copy
                    </Button>
                    <LoadingButton
                        color="error"
                        onClick={handleSubmit}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<Save />}
                        variant="contained"
                        className={cx('save-btn')}
                    >
                        <span>Save</span>
                    </LoadingButton>
                </div>
            )}
        </div>
    );
}

export default UserEvaluateTable;
