import classNames from 'classnames/bind';

import style from './survey.module.scss';
import SurveyForm from '~/components/SurveyForm';
import { getSurveyOptions } from '~/libs/getData/survey';
import { DefaultLayout } from '~/layouts';

const cx = classNames.bind(style);

async function Survey() {
    const options = await getSurveyOptions();
    console.log(options);

    return (
        <DefaultLayout>
            <SurveyForm genreOptions={options.genres} languageOptions={options.languages} />
        </DefaultLayout>
    );
}

export default Survey;
