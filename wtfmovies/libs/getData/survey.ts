import { mongodb } from '~/libs/func';
import { SuveyOptionsInterface } from '../interfaces';

export const getSurveyOptions = async (): Promise<{
    genres: SuveyOptionsInterface[];
    languages: SuveyOptionsInterface[];
}> => {
    try {
        const genres = await mongodb()
            .db('film')
            .collection('gerne')
            .find({ projection: { name: 1 } });

        const languages = await mongodb()
            .db('film')
            .collection('language')
            .find({ projection: { name: 1 } });

        return {
            genres,
            languages,
        };
    } catch (err) {
        console.log('😨😨😨 error at survey/getSurveyOptions function  : ', err);
        return {
            genres: [],
            languages: [],
        };
    }
};
