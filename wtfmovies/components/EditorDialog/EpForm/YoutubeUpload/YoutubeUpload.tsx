import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import classNames from 'classnames/bind';
import { changeNotifyContent, changeNotifyOpen, changeNotifyType } from '~/redux/actions';
import { AlertColor } from '@mui/material';
import { useDispatch } from 'react-redux';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Player from '~/components/Player';
import style from './YoutubeUpload.module.scss';
const cx = classNames.bind(style);

import { useState } from 'react';
interface MovieForm {
    listEpisode: { link: string; index: number }[],
    setListEpisode: any;
}
import { CloudUpload } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';

interface FectData {
    result: {
        film_id: string;
        index: number;
        link: { Youtube: string };
        name: string;
        rating: null;
        upload_date: any;
        uploader_email: string;
        views: number;
    }[]
}
export default function InfoForm({ listEpisode, setListEpisode }: MovieForm) {
    // console.log(defaultValue);

    const [playlistId, setPlaylistId] = useState<any>('');
    const [loading, setLoading] = useState<any>(true);

    const [episode, setEpisode] = useState(listEpisode.length > 0 ? listEpisode[0].link : '');

    const handleChange = (event: SelectChangeEvent) => {

        setEpisode(event.target.value);
    };
    const dispatch = useDispatch();

    const showAlert = (content: string, type: AlertColor) => {
        dispatch(changeNotifyContent(content));
        dispatch(changeNotifyType(type));
        dispatch(changeNotifyOpen(true));
    };

    const handleClickFetch = async (event: any): Promise<void> => {
        setLoading(false);
        const lEp = await fetch('/api/v1/editor/fetchEpYoutube', { method: 'POST', body: JSON.stringify({ type: 'fetchEpisodes', playlistId: playlistId }) })
        if (lEp.status === 200) {
            const lEpDe: FectData = await lEp.json();
            setListEpisode(lEpDe.result.map((item) => ({ link: item.link.Youtube, index: item.index })));
            setEpisode(lEpDe.result[0].link.Youtube)
            showAlert('Tải dữ liệu tập phim thành công', 'success')

        } else {
            showAlert('Có lỗi xảy ra khi tải dữ liệu tập phim', 'error')
            setListEpisode([]);
            setEpisode('');
        }
        setLoading(true);

    }

    return (
        <Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="query" hidden={loading} value={0} />
            </Box>
            <Box
                component="form"
                sx={{
                    '& .Muiem-root': { m: 1, width: '100%' },
                    '& #movie-title': {
                        width: '50ch',
                    },
                    '& #movie-sumary': {
                        width: '50ch',
                    },
                    '& .MuiFormHelperText-root': { marginLeft: 0 },
                    display: 'flex',
                    padding: '1rem',
                    alignItems: 'stretch',
                    gap: '1rem',
                    width: '100%',
                }}
                autoComplete="off"
            >

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 1,
                        position: 'relative'
                    }}
                >
                    <Box sx={{ minWidth: 450, p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                        <TextField id="outlined-basic" label="Liên kết danh sách phát" variant="outlined" onChange={(e) => {
                            try {
                                const u: URL = new URL(e.target.value);
                                const idp = u.searchParams.get('list');
                                setPlaylistId(idp);
                            } catch (error) {
                                setPlaylistId('');
                            }

                        }} />

                        <FormControl fullWidth

                        >

                            <InputLabel id="demo-simple-select-label">Chọn tập</InputLabel>

                            <Select
                                key={episode}
                                labelId="demo-simple-select-label"
                                value={episode}
                                label="Chọn tập"
                                onChange={handleChange}
                            >


                                {listEpisode &&
                                    listEpisode.map((item: { link: string; index: number }) => (
                                        <MenuItem
                                            value={item.link}
                                            key={item.index}
                                        >
                                            {item.index}

                                        </MenuItem>
                                    ))}

                            </Select>

                        </FormControl>
                        <Button
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            onClick={handleClickFetch}
                            startIcon={<CloudUpload />}
                        >
                            Load danh sách phát
                        </Button>
                    </Box>




                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '30vw',
                        alignItems: 'center',
                        gap: 1,
                        borderRadius: '5px',
                    }}
                >
                    <Player isEdior className={cx('uploadPlayer')} key={episode} url={episode} numEp={0} maxEp={0}></Player>
                </Box>


            </Box>
        </Box>
    );
}
