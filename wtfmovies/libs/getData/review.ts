import { mongodb } from '~/libs/func';
import { FilmInfoInterface } from '../interfaces';

export const getFilmReviewInfo = async (filmName: string): Promise<FilmInfoInterface> => {
    // const films: FilmInfoInterface[] = await mongodb()
    //     .db('film')
    //     .collection('information')
    //     .findOne({
    //         filter: { name: filmName },
    //         projection: {
    //             _id: 0,
    //         },
    //     });
    const films: FilmInfoInterface[] = await mongodb()
        .db('film')
        .collection('information')
        .aggregate({
            pipeline: [
                { $sort: { releaseYear: -1, updateTime: -1 } }, // Assuming you want newer updates and releases first
                {
                    $lookup: {
                        from: 'author',
                        let: { authorIds: '$author' }, // Define the local variable authorIds
                        pipeline: [
                            { $match: { $expr: { $in: ['$_id', '$$authorIds'] } } }, // Match the author ids
                            { $project: { _id: 0, name: 1 } }, // Get name only
                        ],
                        as: 'authorDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'genre',
                        let: { genreIds: '$genre' }, // Define the local variable genreIds
                        pipeline: [
                            { $match: { $expr: { $in: ['$_id', '$$genreIds'] } } }, // Match the genre ids
                            { $project: { _id: 0, name: 1 } }, // Get name only
                        ],
                        as: 'genreDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'director',
                        let: { directorIds: '$director' }, // Define the local variable genreIds
                        pipeline: [
                            { $match: { $expr: { $in: ['$_id', '$$directorIds'] } } }, // Match the genre ids
                            { $project: { _id: 0, name: 1 } }, // Get name only
                        ],
                        as: 'directorDetails',
                    },
                },
                {
                    $lookup: {
                        from: 'actor',
                        let: { actorIds: '$actor' }, // Define the local variable genreIds
                        pipeline: [
                            { $match: { $expr: { $in: ['$_id', '$$actorIds'] } } }, // Match the genre ids
                            { $project: { _id: 0, name: 1 } }, // Get name only
                        ],
                        as: 'actorDetails',
                    },
                },
                {
                    $project: {
                        _id: 0,
                        name: 1,
                        describe: 1,
                        author: '$authorDetails.name',
                        genre: '$genreDetails.name',
                        director: '$directorDetails.name',
                        videoType: 1,
                        views: 1,
                        rating: 1,
                        poster: 1,
                        status: 1,
                        duration: 1,
                        tag: 1,
                        releaseYear: 1,
                        country: 1,
                        actor: '$actorDetails.name',
                    },
                },
                { $limit: 1 },
            ],
        });

    return films[0];
};

// const infoList = {
//     image: '/jjk-wallpaper-3.jpg',
//     title: 'Jujutsu Kaisen',
//     rating: '4.9',
//     episodes: '100M',
//     decript:
//         "Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024Jujutsu Kaisen is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 25 tankōbon volumes as of January 2024",
//     info: [
//         { title: 'Trạng thái', info: 'Hoàn thành', type: 'highLight' },
//         { title: 'Tác giả', info: ['Gege Akutami'], type: 'searchAble' },
//         { title: 'Thể loại', info: ['Shonen manga', 'Dark fantasy'], type: 'searchAble' },
//         {
//             title: 'Đạo diễn',
//             info: ['Sunghoo Park (S1)', 'Shōta Goshozono (S2)'],
//             type: 'searchAble',
//         },
//         { title: 'Thời lượng', info: '24 phút/tập' },
//         { title: 'Ngôn ngữ', info: ['Nhật Bản', 'Anh'], type: 'searchAble' },
//         { title: 'Nhãn', info: 'R-16 (Restricted-16)', type: 'highLight' },
//         { title: 'Năm sản xuất', info: '2021' },
//         { title: 'Quốc gia sản xuất', info: 'Nhật Bản' },
//         {
//             title: 'Diển viên nổi bật',
//             info: ['Kenjiro Tsuda', 'Yuichi Nakamura', 'Junya Enoki'],
//             type: 'searchAble',
//         },
//         {
//             title: 'Tập mới cập nhật',
//             info: [29, 28, 27],
//             type: 'watchAble',
//         },
//     ],
// };
