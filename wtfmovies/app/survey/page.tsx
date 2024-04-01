'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { DefaultLayout } from '~/layouts';
import classNames from 'classnames/bind';

import images from '~/assets/image';
import Button from '~/components/Button';
import style from './survey.module.scss';
import Image from 'next/image';
type OptionType = {
    label: string;
    value: string;
};

const cx = classNames.bind(style);

function Survey() {
    const [info, setInfo] = useState({ genres: [], directors: '', actors: '', languages: [] });

    const [genreOption, setGenreOption] = useState<OptionType[]>([]);
    const [languageOption, setLanguageOption] = useState<OptionType[]>([]);
    const [currForm, setCurrForm] = useState(0);

    useEffect(() => {
        const getSurveyInfo = async () => {
            try {
                const response = await fetch('/api/getSurveyInfo', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const res: { genre: { _id: string; name: string }[]; language: { _id: string; name: string }[] } =
                        await response.json();

                    const genres = res.genre.map((g) => ({ value: g._id, label: g.name }));
                    const languages = res.language.map((g) => ({ value: g._id, label: g.name }));

                    setGenreOption(genres);
                    setLanguageOption(languages);
                }
            } catch (err) {
                console.log(err);
            }
        };

        getSurveyInfo();
    }, []);

    const nextPage = () => setCurrForm((prev) => prev + 1);
    const prevPage = () => setCurrForm((prev) => prev - 1);

    const handleInfoChange = (event: any) => {
        setInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSelectChange = (options: any, actionMeta: any) => {
        setInfo((prev: any) => ({ ...prev, [actionMeta.name]: options }));
    };

    console.log(info);

    const renderForm = (form: number): React.ReactNode => {
        switch (form) {
            case 0:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>Thể loại phim bạn yêu thích?</h1>
                        <Image className={cx('quest-image')} width={300} height={252} src={images.gerne} alt="gerne" />
                        <Form.Group className="mb-5" controlId="formHorizontalLoveGerne">
                            <Select
                                isMulti
                                name="genres"
                                options={genreOption}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                            />
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('submit')} type="button" onClick={prevPage}>
                                Trở lại
                            </Button>
                            <Button primary className={cx('submit')} type="button" onClick={nextPage}>
                                Tiếp tục
                            </Button>
                        </Form.Group>
                    </Form>
                );
            case 1:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>Đạo diễn bạn yêu thích?</h1>
                        <Image
                            className={cx('quest-image')}
                            width={320}
                            height={252}
                            src={images.director}
                            alt="gerne"
                        />
                        <Form.Group className="mb-5" controlId="formHorizontalActor">
                            <Form.Control
                                className={cx('text-input')}
                                type="text"
                                name="dỉrectors"
                                placeholder="Tên đạo diễn"
                                onChange={(e) => {
                                    handleInfoChange(e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('submit')} type="button" onClick={prevPage}>
                                Trở lại
                            </Button>
                            <Button primary className={cx('submit')} type="button" onClick={nextPage}>
                                Tiếp tục
                            </Button>
                        </Form.Group>
                    </Form>
                );
            case 2:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>Diễn viên bạn yêu thích?</h1>
                        <Image className={cx('quest-image')} width={300} height={252} src={images.actor} alt="gerne" />
                        <Form.Group className="mb-5" controlId="formHorizontalActor">
                            <Form.Control
                                className={cx('text-input')}
                                type="text"
                                name="actors"
                                placeholder="Tên diễn viên"
                                onChange={(e) => {
                                    handleInfoChange(e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('submit')} type="button" onClick={prevPage}>
                                Trở lại
                            </Button>
                            <Button primary className={cx('submit')} type="button" onClick={nextPage}>
                                Tiếp tục
                            </Button>
                        </Form.Group>
                    </Form>
                );
            case 3:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>Ngôn ngữ phim bạn yêu thích?</h1>
                        <Image
                            className={cx('quest-image')}
                            width={500}
                            height={252}
                            src={images.language}
                            alt="gerne"
                        />
                        <Form.Group className="mb-5">
                            <Select
                                isMulti
                                name="languages"
                                options={languageOption}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                            />
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('submit')} type="button" onClick={prevPage}>
                                Trở lại
                            </Button>
                            <Button primary className={cx('submit')} type="button" onClick={nextPage}>
                                Tiếp tục
                            </Button>
                        </Form.Group>
                    </Form>
                );
            case 4:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>
                            Hoàn thành khảo sát{' '}
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'var(--green-highlight-color)' }} />
                        </h1>
                        <Form.Group className="mb-5">
                            <Form.Text className={cx('notify-text')}>
                                Cảm ơn bạn đã tham gia khảo sát!
                                <br />
                                Phần khảo sát đã giúp chúng tôi rất nhiều để mang đến cho người xem những trải nghiệm
                                tốt nhất
                                <br />
                                Chúc các bạn xem phim vui vẻ!
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('submit')} type="button" onClick={prevPage}>
                                Trở lại
                            </Button>
                            <Button primary className={cx('submit')} type="button">
                                Quay lại xem phim
                            </Button>
                        </Form.Group>
                    </Form>
                );
            default:
                return <></>;
        }
    };

    return (
        <DefaultLayout>
            <div className={cx('wrapper')}>{renderForm(currForm)}</div>
        </DefaultLayout>
    );
}

export default Survey;
