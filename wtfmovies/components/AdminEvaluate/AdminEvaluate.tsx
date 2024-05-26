'use client';
import classNames from 'classnames/bind';

import style from './AdminEvaluate.module.scss';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { calcTotal, timePassed } from '~/libs/clientFunc';
import { useState } from 'react';
import UserEvaluate from '../UserEvaluate';
import { RowInterface, ScoreInterface } from '~/libs/interfaces';

const cx = classNames.bind(style);

const statistical = (scores: ScoreInterface[]) => {
    let obtain = 0;
    let notObtain = 0;
    let notScoreYet = 0;
    scores.forEach((score: ScoreInterface) => {
        if (!score.adminScore) {
            notScoreYet += 1;
        } else if (calcTotal(score.adminScore) > 60) {
            obtain += 1;
        } else {
            notObtain += 1;
        }
    });

    return { obtain, notObtain, notScoreYet };
};

export default function EvaluateTable({ table, scores }: { table?: RowInterface[]; scores: ScoreInterface[] }) {
    const [currUser, setCurrUser] = useState<any>(undefined);

    const handleChooseUser = (index: number) => {
        setCurrUser(scores[index]);
    };

    const finalStatistical = statistical(scores);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title_name')}>{'Quản lý đánh giá hội viên'}</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell align="center">Thời gian</TableCell>
                            <TableCell align="center">Kết quả</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scores.map((score, index) => (
                            <TableRow key={score._id} hover onClick={() => handleChooseUser(index)}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {score._id}
                                </TableCell>
                                <TableCell align="center">{timePassed(score.time)}</TableCell>
                                <TableCell align="center">
                                    {score && score.adminScore
                                        ? calcTotal(score.adminScore) >= 60
                                            ? 'Đạt'
                                            : 'Không Đạt'
                                        : 'Chưa chấm'}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={4} />
                        </TableRow>
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell>Đạt</TableCell>
                            <TableCell align="right">{finalStatistical.obtain}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Không đạt</TableCell>
                            <TableCell align="right">{finalStatistical.notObtain}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Chưa chấm</TableCell>
                            <TableCell align="right">{finalStatistical.notScoreYet}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {table && currUser && (
                <>
                    <h1 className={cx('title_name')}>{'Bảng đánh giá của: ' + currUser._id}</h1>
                    <UserEvaluate rows={table} score={currUser} isAdmin />
                </>
            )}
        </div>
    );
}
