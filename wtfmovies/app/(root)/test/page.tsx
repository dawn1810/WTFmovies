'use client';
import classNames from 'classnames/bind';

import style from './test.module.scss';
// //import { AlertColor } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotify } from '~/components/Notify/notifySlide';

// import _fetch from 'node-fetch';
import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-wasm';
import * as use from '@tensorflow-models/universal-sentence-encoder';

// console.log("Works!");
// import * as tf from '@tensorflow/tfjs';
// import * as use from '@tensorflow-models/universal-sentence-encoder';

// const text = "To generate and send a multi-row insert query, we'll use pg-promise.";

const cx = classNames.bind(style);

function Test() {
    const [result, setResult] = useState<any>(undefined);
    const [value, setValue] = useState<string>('');
    const [films, setFilms] = useState<any>(undefined);

    const [model, setModel] = useState<any>(undefined);

    const LoadModel = async () => {
        try {
            console.log('Đang tải mô hình..');
            setModel(await use.load());
            console.log('Đã tải mô hình..');
        } catch (err) {
            console.log(err);
            LoadModel();
        }
    };

    useEffect(() => {
        tf.setBackend('cpu').then(() => LoadModel());
    }, []);

    useEffect(() => {
        const getFilms = async () => {
            const response = await fetch(`/api/test`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const res: any[] = await response.json();
                console.log(res);
                setFilms(res);
            }
        };

        getFilms();
    }, []);

    async function EmbeddingText(text: string) {
        try {
            if (model) {
                for (const film of films) {
                    const embeddings = await model.embed(film.describe);
                    console.log(embeddings.arraySync()[0]);
                    film.embedding = embeddings.arraySync()[0];
                    console.log(film);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Button variant="contained" onClick={() => EmbeddingText(value)}>
                Contained
            </Button>
            <div style={{ color: 'white' }}>Result: {JSON.stringify(result, null, '\t')}</div>
        </div>
    );
    // const dispatch = useDispatch();

    // const showAlert = (content: string, type: any) => {
    //     dispatch(showNotify({ content, type, open: false }));
    // };

    // const [value, setValue] = useState(
    //     JSON.stringify(
    //         {
    //             playlistId: '',
    //             nameInput: '',
    //             describe: '',
    //             status: '',
    //             author: [],
    //             director: [],
    //             tag: '',
    //             country: '',
    //             actor: [],
    //             img: '',
    //             poster: '',
    //             genre: [],
    //             maxEp: 18,
    //         },
    //         null,
    //         2,
    //     ),
    // );

    // const handleChange = (event: any) => {
    //     setValue(event.target.value);
    // };

    // const handleSend = async () => {
    //     const response = await fetch('/api/v1/editor/youtubeUpload', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: value,
    //     });

    //     // console.log(value);

    //     if (response.ok) {
    //         showAlert('Đăng tải phim thành công 😎😎😎', 'success');
    //     } else if (response.status === 400) {
    //         showAlert('Đăng tải phim thất bại, vui lòng thử lại 😞😞😞', 'info');
    //     } else if (response.status === 500) {
    //         const res = await response.text();
    //         showAlert(res, 'error');
    //     }
    // };

    // return (
    //     <div className={cx('wrapper')}>
    //         <h1 className={cx('title')}>YOUTUBE UPLOAD DEMO:</h1>
    //         <TextField
    //             autoFocus
    //             label="body"
    //             spellCheck={false}
    //             multiline
    //             fullWidth
    //             value={value}
    //             onChange={handleChange}
    //         />
    //         <Button variant="contained" className={cx('btn')} onClick={handleSend}>
    //             SEND
    //         </Button>
    //     </div>
    // );
}

export default Test;
