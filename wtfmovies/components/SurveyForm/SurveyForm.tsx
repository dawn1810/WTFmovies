'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Form } from 'react-bootstrap';
import Select, { GroupBase } from 'react-select';
import classNames from 'classnames/bind';

import { SuveyOptionsInterface } from '~/libs/interfaces';
import images from '~/assets/image';
import Button from '~/components/Button';
import style from './SurveyForm.module.scss';
import { useRouter } from 'next/navigation';

const cx = classNames.bind(style);

function Survey({
    genreOptions,
    languageOptions,
}: {
    genreOptions: SuveyOptionsInterface[];
    languageOptions: SuveyOptionsInterface[];
}) {
    const router = useRouter();
    const prevPath = typeof window !== 'undefined' && !!sessionStorage && sessionStorage.getItem('prev');

    const [info, setInfo] = useState({ genres: [], directors: '', actors: '', languages: [] });

    const [currForm, setCurrForm] = useState(0);

    const mappedOptions = (options: SuveyOptionsInterface[]): any[] => {
        const mappedOptions = options.map((option) => ({
            value: option._id,
            label: option.name,
        }));

        return mappedOptions;
    };

    const nextPage = () => setCurrForm((prev) => prev + 1);
    const prevPage = () => setCurrForm((prev) => prev - 1);

    const handleInfoChange = (event: any) => {
        setInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSelectChange = (options: any, actionMeta: any) => {
        setInfo((prev: any) => ({ ...prev, [actionMeta.name]: options }));
    };

    const handleSubmit = async () => {
        const response = await fetch('/api/survey/updateSurveyInfo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ info }),
        });

        if (response.ok) {
            if (prevPath) {
                router.push(prevPath);
            } else {
                router.push('/');
            }
        }
    };

    const handleSkip = async () => {
        const response = await fetch('/api/survey/updateSurveyInfo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ info: false }),
        });

        if (response.ok) {
            if (prevPath) {
                router.push(prevPath);
            } else {
                router.push('/');
            }
        }
    };

    const renderForm = (form: number): React.ReactNode => {
        switch (form) {
            case 0:
                return (
                    <Form className={cx('login-form')}>
                        <h1 className={cx('title')}>Thể loại phim bạn yêu thích?</h1>
                        <img className={cx('quest-image')} width={300} height={252} src={images.gerne} alt="gerne" />
                        <Form.Group className="mb-5" controlId="formHorizontalLoveGerne">
                            <Select
                                isMulti
                                name="genres"
                                defaultValue={info.genres}
                                options={mappedOptions(genreOptions) as readonly GroupBase<never>[]}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                            />
                        </Form.Group>
                        <Form.Group className={cx('btn-group')}>
                            <Button primary className={cx('skip')} type="button" onClick={handleSkip}>
                                Bỏ qua
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
                        <img className={cx('quest-image')} width={320} height={252} src={images.director} alt="gerne" />
                        <Form.Group className="mb-5" controlId="formHorizontalDirector">
                            <Form.Control
                                value={info.directors}
                                className={cx('text-input')}
                                type="text"
                                name="directors"
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
                        <img className={cx('quest-image')} width={300} height={252} src={images.actor} alt="gerne" />
                        <Form.Group className="mb-5" controlId="formHorizontalActor">
                            <Form.Control
                                value={info.actors}
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
                        <img className={cx('quest-image')} width={500} height={252} src={images.language} alt="gerne" />
                        <Form.Group className="mb-5">
                            <Select
                                isMulti
                                name="languages"
                                defaultValue={info.languages}
                                options={mappedOptions(languageOptions)}
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
                            <Button primary className={cx('submit')} type="button" onClick={handleSubmit}>
                                Hoàn thành khảo sát
                            </Button>
                        </Form.Group>
                    </Form>
                );
            default:
                return <></>;
        }
    };

    return <div className={cx('wrapper')}>{renderForm(currForm)}</div>;
}

export default Survey;
