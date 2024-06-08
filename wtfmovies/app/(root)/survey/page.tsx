import classNames from 'classnames/bind';

import style from './survey.module.scss';
import SurveyForm from '~/components/SurveyForm';
import { getSurveyOptions } from '~/libs/getData/survey';
import NotFound from '../not-found';
// import { DefaultLayout } from '~/layouts';

const cx = classNames.bind(style);

async function Survey() {
    const options = await getSurveyOptions();

    if (!!options) return <SurveyForm genreOptions={options.genres} languageOptions={options.languages} />;
    else return NotFound();
}

export default Survey;
