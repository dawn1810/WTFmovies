'use client';
import classNames from 'classnames/bind';

import style from './UserEvaluate.module.scss';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { CriteriaInterface, RowInterface } from '~/libs/interfaces';
import { useState } from 'react';
import NotFound from '~/app/(root)/not-found';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

const cx = classNames.bind(style);

const createData = (name: string, criteria: CriteriaInterface[]) => {
    return { name, criteria };
};

const createArray = (rows: RowInterface[]) => {
    const result = rows.map((row) => {
        return new Array(row.criteria.length).fill(0);
    });
    return result;
};

const calcTotal = (store: any[]) => {
    const result = store.reduce(
        (total: number, row: number[]) => total + row.reduce((sum: number, c: number) => sum + +c, 0),
        0,
    );
    return result;
};

function UserEvaluateTable({ rows, score }: { rows?: RowInterface[]; score: any }) {
    if (!rows) return NotFound();

    const [userScore, setUserScore] = useState(score.userScore || createArray(rows));
    const [adminScore, setAdminScore] = useState(score.adminScore || createArray(rows));

    const handleChange = (event: any, index: number, criteriaIndex: number, maxValue: number) => {
        const value =
            event?.target.value < 0 || !event?.target.value
                ? 0
                : event?.target.value > maxValue
                ? maxValue
                : +event?.target.value;

        const newScoreStore = [...userScore];
        newScoreStore[index] = [...newScoreStore[index]];
        newScoreStore[index][criteriaIndex] = '' + value;

        setUserScore(newScoreStore);
    };

    const handleSubmit = async () => {};

    return (
        <div className={cx('wrapper')}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Nội dung tiêu chuẩn</TableCell>
                            <TableCell>Nội dung tiêu chí</TableCell>
                            <TableCell>Điểm tối đa</TableCell>
                            <TableCell>Điểm của bạn</TableCell>
                            <TableCell>Điểm của quản lý</TableCell>
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
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{maxRowScore}</TableCell>
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
                                                <TableCell>{criteria.maxScore}</TableCell>
                                                <TableCell>
                                                    {score.adminScore ? (
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
                                                <TableCell>{adminScore[index][criteriaIndex]}</TableCell>
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
                            <TableCell>{calcTotal(userScore)}</TableCell>
                            <TableCell>{calcTotal(adminScore)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <LoadingButton
                color="error"
                onClick={handleSubmit}
                // loading={loading}
                loadingPosition="start"
                startIcon={<Save />}
                variant="contained"
                className={cx('save-btn')}
            >
                <span>Save</span>
            </LoadingButton>
        </div>
    );
}

export default UserEvaluateTable;
