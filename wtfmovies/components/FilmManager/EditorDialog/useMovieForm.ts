import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { cropImage } from '~/libs/clientFunc';
import { AlertColor } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilms, setSelectedFilm, setFormOpen } from '~/components/FilmManager/filmManagerSlice';

export function useMovieForm({
    defaultValue,
    tags,
    countrys,
    film_id,
    setLoading,
    showAlert,
}: {
    defaultValue: any;
    tags: any;
    countrys: any;
    film_id: string;
    handleClose: () => any;
    setLoading: (loading: boolean) => void;
    showAlert: (content: string, type: AlertColor) => void;
}) {
    const dispatch = useDispatch();
    const films = useSelector((state: any) => state.editor.films);

    const statusMovies = [
        { value: 'going', label: 'Đang ra' },
        { value: 'pause', label: 'Tạm dừng' },
        { value: 'done', label: 'Hoàn thành' },
        { value: 'will', label: 'Sắp chiếu' },
    ];

    const [valueAuthors, setValueAuthors] = useState(defaultValue.author || []);
    const [valueGenres, setValueGenres] = useState(defaultValue.genre || []);
    const [valueDirectors, setValueDirectors] = useState(defaultValue.director || []);
    const [valueActors, setValueActors] = useState(defaultValue.actor || []);
    const [valueTag, setvValueTag] = useState(defaultValue.tag || '');
    const [valueCountry, setValueCountry] = useState(defaultValue?.country?.[0]?.value || '');
    const [sumaryMovie, setSumaryMovie] = useState(defaultValue.describe || '');
    const [titleMovie, setTitleMovie] = useState(defaultValue.name || '');
    const [year, setYear] = useState<Dayjs | null>(defaultValue.releaseYear ? dayjs(defaultValue.releaseYear) : null);
    const [maxEp, setMaxEp] = useState(defaultValue.maxEp || undefined);
    const [duration, setDuration] = useState<Dayjs | null>(
        defaultValue.duration ? dayjs().startOf('year').add(defaultValue.duration, 'seconds') : null,
    );
    const [valueStatus, setValueStatus] = useState(
        statusMovies.find((item) => item.label === defaultValue.status)?.value || '',
    );
    const [imgMovie, setImgMovie] = useState(defaultValue.img || undefined);
    const [imgBannerMovie, setImgBannerMovie] = useState(defaultValue.poster || undefined);
    const [cropResultBanner, setCropResultBanner] = useState<any>(null);
    const [cropResult, setCropResult] = useState<any>(null);

    const [listEpisodeTiktok, setListEpisodeTiktok] = useState<{ link: string; index: number }[]>(
        defaultValue.listEp
            ? defaultValue.listEp
                .map((item: { link: { Tiktok: any } }) => {
                    if (item.link.Tiktok) {
                        return { ...item, link: item.link.Tiktok };
                    }
                    return;
                })
                .filter((item: any) => item !== undefined)
            : [],
    );

    const [listEpisodeYoutube, setListEpisodeYoutube] = useState<{ link: string; index: number }[]>(
        defaultValue.listEp
            ? defaultValue.listEp
                .map((item: { link: { Youtube: any } }) => {
                    if (item.link.Youtube) {
                        return { ...item, link: item.link.Youtube };
                    }
                    return;
                })
                .filter((item: any) => item !== undefined)
            : [],
    );

    const sendInfo = async () => {
        const min = duration?.minute();
        const sec = duration?.second();
        let timeEp = 0;
        if (
            titleMovie === '' ||
            sumaryMovie === '' ||
            min === undefined ||
            sec === undefined ||
            valueGenres.length === 0 ||
            valueDirectors.length === 0 ||
            valueActors.length === 0 ||
            valueAuthors.length === 0 ||
            valueCountry === '' ||
            valueStatus === '' ||
            year === null ||
            maxEp === undefined ||
            imgMovie === undefined ||
            imgBannerMovie === undefined
        )
            return showAlert('Vui lòng điền đầy đủ thông tin', 'error');
        setLoading(true);

        const dropedImage = await cropImage(imgMovie, cropResult);
        const dropedImageBanner = await cropImage(imgBannerMovie, cropResultBanner);

        timeEp = min * 60 + sec;
        const data = {
            film_id: film_id,
            name: titleMovie,
            describe: sumaryMovie,
            genre: valueGenres.map((item: any) => item.id),
            director: valueDirectors.map((item: any) => item.id),
            actor: valueActors.map((item: any) => item.id),
            author: valueAuthors.map((item: any) => item.id),
            tag: tags.find((item: any) => item.name === valueTag)?._id,
            country: countrys.find((item: any) => item.value === valueCountry)?._id,
            releaseYear: year?.toISOString(),
            maxEp: maxEp,
            duration: timeEp,
            status: statusMovies.find((item) => item.value === valueStatus)?.label,
            listEp: {
                tiktok: listEpisodeTiktok,
                youtube: listEpisodeYoutube,
            },
        };

        const formData = new FormData();
        if (!!dropedImage) formData.append('image', dropedImage);
        if (!!dropedImageBanner) formData.append('imageBanner', dropedImageBanner);

        formData.append('info', JSON.stringify(data));
        const rd = await fetch('/api/v1/editor/addMovies', {
            method: 'POST',
            body: formData,
        });
        const dre: any = await rd.json();
        console.log(defaultValue, dre);

        if (rd.status === 200) {
            if (defaultValue && defaultValue.film_id) {
                showAlert('Chỉnh sửa phim thành công!', 'success');
            } else {
                showAlert('Thêm phim thành công!', 'success');
            }
            handleAfterAddMovie(dre);
        } else {
            showAlert('Thêm phim không thành công!', 'error');
        }

        setLoading(false);
    };

    const handleAfterAddMovie = (data: any) => {
        //add to table
        const convertSecondsToDHMS = (seconds: number) => {
            const days = Math.floor(seconds / (24 * 60 * 60));
            const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((seconds % (60 * 60)) / 60);
            const remainingSeconds = seconds % 60;

            let result = '';
            if (days > 0) {
                result += `${days}d `;
            }
            if (hours > 0) {
                result += `${hours}h `;
            }
            if (minutes > 0) {
                result += `${minutes}m `;
            }
            if (remainingSeconds > 0) {
                result += `${remainingSeconds}s`;
            }

            return result.trim();
        };
        const lisEp = {
            tiktok: listEpisodeTiktok,
            youtube: listEpisodeYoutube,
        };
        const arrays = Object.values(lisEp);
        const lengths = arrays.map((arr: any) => arr.length);
        const maxLength = lengths.reduce((max, length) => Math.max(max, length), 0);
        const proListEp = [];
        for (let index = 0; index < maxLength; index++) {
            proListEp.push({
                index: index + 1,
                link: {
                    Youtube: lisEp.youtube[index]?.link || '',
                    Tiktok: lisEp.tiktok[index]?.link || '',
                },
            });
        }

        const rdata = {
            ...data,
            tag: valueTag,
            actor: valueActors.map((item: any) => item.title),
            author: valueAuthors.map((item: any) => item.title),
            country: [countrys.find((item: any) => item.value === valueCountry)?.label],
            director: valueDirectors.map((item: any) => item.title),
            genre: valueGenres.map((item: any) => item.title),
            listEp: proListEp,
            durationAsString: convertSecondsToDHMS(data.duration),
            id: data.film_id,
            releaseYear: year,
            releaseYearASString: year?.year(),
            maxEpAsString: [maxLength, data.maxEp !== -1 ? data.maxEp : '?'].join(' / ') + ' tập',
            videoType: data.videoType.map((videoType: any) => videoType.title),
        };

        function removeItemsById(arr: any, ids: any) {
            return arr.filter((item: any) => !ids.includes(item.id));
        }

        dispatch(setFilms([rdata, ...removeItemsById(films, [rdata.id])]));
        dispatch(setFormOpen(false));
        dispatch(setSelectedFilm(null));

    };


    return {
        statusMovies,
        valueAuthors,
        setValueAuthors,
        valueGenres,
        setValueGenres,
        valueDirectors,
        setValueDirectors,
        valueActors,
        setValueActors,
        valueTag,
        setvValueTag,
        valueCountry,
        setValueCountry,
        sumaryMovie,
        setSumaryMovie,
        titleMovie,
        setTitleMovie,
        year,
        setYear,
        maxEp,
        setMaxEp,
        duration,
        setDuration,
        valueStatus,
        setValueStatus,
        imgMovie,
        setImgMovie,
        imgBannerMovie,
        setImgBannerMovie,
        cropResultBanner,
        setCropResultBanner,
        cropResult,
        setCropResult,
        listEpisodeTiktok,
        setListEpisodeTiktok,
        listEpisodeYoutube,
        setListEpisodeYoutube,
        sendInfo,
    };
}
