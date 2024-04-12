import { mongodb } from '~/libs/func';
import { FilmInfoInterface } from '../interfaces';

export const getFilmReviewInfo = async (filmName: string): Promise<FilmInfoInterface[]> => {
    const films: FilmInfoInterface[] = await mongodb()
        .db('film')
        .collection('information')
        .findOne({
            filter: { name: filmName },
            projection: {
                _id: 0,
            },
        });

    return films;
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
