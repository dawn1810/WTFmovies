import { mongodb } from '~/libs/func';

interface SearchInterface {
    name: string;
    searchName: string;
}

export const getGenres = async (): Promise<{ name: string; to: string; special?: boolean | undefined; }[] | undefined> => {
    try {

        const defautlGenres = [
            { name: 'Tất cả', to: '/', special: true },
            { name: 'Thịnh hành', to: '/search?query=hot', special: true },
            { name: 'Mới', to: '/search?query=new', special: true },
        ];
        const genres: SearchInterface | any = await mongodb()
            .db('film')
            .collection('genre')
            .find({
                filter: {},
                projection: {
                    _id: 0,
                    name: 1,
                    searchName: 1,
                },
            });
        const updatedGenres = genres.map((genre: { searchName: any; }) => ({
            ...genre,
            to: '/search?query=' + genre.searchName,
        }));
        const combinedGenres = [...defautlGenres, ...updatedGenres];



        return combinedGenres;
    } catch (err) {
        console.log('😨😨😨 error at search/getGenres function  : ', err);
    }
};


export const getSearch = async (search): Promise<{ name: string; to: string; special?: boolean | undefined; }[] | undefined> => {
    try {

        const defautlGenres = [
            { name: 'Tất cả', to: '/', special: true },
            { name: 'Thịnh hành', to: '/search?query=hot', special: true },
            { name: 'Mới', to: '/search?query=new', special: true },
        ];
        const genres: SearchInterface | any = await mongodb()
            .db('film')
            .collection('genre')
            .find({
                filter: {},
                projection: {
                    _id: 0,
                    name: 1,
                    searchName: 1,
                },
            });
        const updatedGenres = genres.map((genre: { searchName: any; }) => ({
            ...genre,
            to: '/search?query=' + genre.searchName,
        }));
        const combinedGenres = [...defautlGenres, ...updatedGenres];



        return combinedGenres;
    } catch (err) {
        console.log('😨😨😨 error at search/getGenres function  : ', err);
    }
};
