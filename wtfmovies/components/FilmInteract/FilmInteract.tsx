'use client';
import { Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Rating from '~/components/Rating';
import style from './FilmInteract.module.scss';
import { useDispatch } from 'react-redux';
import { changeFbDialog, changeFbDialogType, changeRpContent } from '~/layouts/components/Header/headerSlice';

const cx = classNames.bind(style);

function FilmInteract({
    data,
    filmInfo,
    setServerVideo,
    serverVideo,
}: {
    setServerVideo: any;
    serverVideo: string;
    filmInfo: { id: string; numEp: number };
    data: { [key: string]: string };
}) {
    const dispatch = useDispatch();

    const onChangeServer = (e: any) => {
        setServerVideo(e.target.value);
    };
    const listServer = Object.keys(data).filter((key) => data[key] !== '');

    const handleOpenReport = () => {
        dispatch(changeFbDialog(true));
        dispatch(changeFbDialogType('report'));
        dispatch(changeRpContent('Phim id: ' + filmInfo.id + ', tập: ' + filmInfo.numEp));
    };

    return (
        <div className={cx('wrapper')}>
            <Rating />

            <Form.Select
                value={serverVideo}
                onChange={onChangeServer}
                aria-label="Default select example"
                className={cx('server-list')}
            >
                {listServer.map((server) => (
                    <option key={server} value={server}>
                        {`#Máy chủ ${server}`}
                    </option>
                ))}
            </Form.Select>
            <Button primary className={cx('report-btn')} onClick={handleOpenReport}>
                #Báo cáo phim
            </Button>
        </div>
    );
}

export default FilmInteract;
