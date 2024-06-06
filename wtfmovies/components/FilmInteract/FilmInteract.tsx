'use client';
import { Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import Rating from '~/components/Rating';
import style from './FilmInteract.module.scss';

const cx = classNames.bind(style);

function FilmInteract({ data, setServerVideo, serverVideo }: { setServerVideo: any, serverVideo: string, data: { [key: string]: string } }) {
    const onChangeServer = (e: any) => { setServerVideo(e.target.value) };
    const listServer = Object.keys(data).filter(key => data[key] !== "");
    console.log(listServer);

    return (
        <div className={cx('wrapper')}>
            <Rating />

            <Form.Select value={serverVideo} onChange={onChangeServer} aria-label="Default select example" className={cx('server-list')}>
                {listServer.map((server) => (
                    <option key={server} value={server}>
                        {`#Máy chủ ${server}`}
                    </option>
                ))}

            </Form.Select>
            <Button primary className={cx('report-btn')}>
                #Méc bọ
            </Button>
        </div>
    );
}

export default FilmInteract;
