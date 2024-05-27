'use client';
import classNames from 'classnames/bind';

import style from './AdminEvaluate.module.scss';
import {
    AlertColor,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { calcTotal, timePassed } from '~/libs/clientFunc';
import { useState } from 'react';
import UserEvaluate from '../UserEvaluate';
import { RowInterface, ScoreInterface } from '~/libs/interfaces';
import { useDispatch } from 'react-redux';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';

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

export default function AdminEvaluate({
    table,
    scores,
    versionList,
}: {
    table?: RowInterface[];
    scores: ScoreInterface[];
    versionList: any[];
}) {
    const dispatch = useDispatch();

    const [version, setVersion] = useState(versionList[0].version);
    const [currUser, setCurrUser] = useState<any>(undefined);
    const [currTable, setCurrTable] = useState(table);
    const [currScore, setCurrScore] = useState(scores);
    const [loading, setLoading] = useState(false);

    const finalStatistical = statistical(currScore);

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const handleChooseUser = (index: number) => {
        setCurrUser(currScore[index]);
    };

    const handleChangeVersion = async (event: any) => {
        setLoading(true);
        const response = await fetch('/api/v1/evaluate/getNewVersion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ version: event.target.value }),
        });

        if (response.ok) {
            const res: any = await response.json();
            console.log(res);

            const mappedScores = res.scores.map((score: any) => ({
                ...score,
                _id: score.email,
                adminScore: score.adminScore[0],
                userScore: score.userScore[0],
                time: score.time[0],
            }));
            setCurrTable(res.table.table);
            setCurrScore(mappedScores);
            setVersion(event.target.value);
        } else if (response.status === 400) {
            showAlert('Lỗi cập nhật phiên bản', 'error');
        } else if (response.status === 500) {
            showAlert('Lỗi cập nhật phiên bản, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
        }
        setLoading(false);
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title_name')}>{'Quản lý đánh giá hội viên'}</h1>
            <FormControl style={{ alignSelf: 'flex-end', minWidth: '120px' }}>
                <InputLabel id="demo-simple-select-standard-label">Version</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={version}
                    onChange={handleChangeVersion}
                    label="Version"
                >
                    {versionList.map((v, index) => (
                        <MenuItem key={index} value={v.version}>
                            {v.version}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell>Tên hiễn thị</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell align="center">Thời gian chấm</TableCell>
                                    <TableCell align="center">Kết quả</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currScore.map((score, index) => (
                                    <TableRow key={score._id} hover onClick={() => handleChooseUser(index)}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {score.name}
                                        </TableCell>
                                        <TableCell>{score._id}</TableCell>
                                        <TableCell align="center">
                                            {score.time ? timePassed(score.time) : 'Chưa chấm'}
                                        </TableCell>
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
                                    <TableCell colSpan={2}>Đạt</TableCell>
                                    <TableCell align="right">{finalStatistical.obtain}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Không đạt</TableCell>
                                    <TableCell align="right">{finalStatistical.notObtain}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Chưa chấm</TableCell>
                                    <TableCell align="right">{finalStatistical.notScoreYet}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {currTable && currUser && (
                        <>
                            <h1 className={cx('title_name')}>{'Bảng đánh giá của: ' + currUser.name}</h1>
                            <UserEvaluate rows={currTable} score={currUser} version={version} isAdmin />
                        </>
                    )}
                </>
            )}
        </div>
    );
}
