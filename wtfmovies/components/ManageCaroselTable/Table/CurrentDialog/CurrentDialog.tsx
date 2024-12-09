import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDebounce } from '~/hooks';
import { useDispatch } from 'react-redux';
//import { AlertColor } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Autocomplete from '@mui/material/Autocomplete';

import style from '../Table.module.scss';
import EmailTemplate from '~/components/ManageReportTable/EmailTemplate';
import { showNotify } from '~/components/Notify/notifySlide';
import ImageCropPopup from '~/components/FilmManager/EditorDialog/ImageDropzone/ImageCropPopUp';
import ImageDropzone from '~/components/FilmManager/EditorDialog/ImageDropzone';

const cx = classNames.bind(style);

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

function CurrentDialog({
    open,
    dialogType,
    dialogData,
    approveLoading,
    handleClose,
    handleReply,
    handleApprove,
}: {
    open: boolean;
    dialogType: boolean;
    dialogData: { id: string; type: string; from: string; content: string; time: string };
    approveLoading: boolean;
    handleClose: (event: any) => void;
    handleReply: (type: boolean) => void;
    handleApprove: (ids: string[]) => void;
}) {
    //alert
    const dispatch = useDispatch();

    const showAlert = (content: string, type: any) => {
        dispatch(showNotify({ content, type, open: true }));
    };

    const [loading, setLoading] = useState<boolean>(false);
    const [formValue, setFormValue] = useState(
        'Chúng tôi đã đọc và xem xét cẩn thận những báo cáo của bạn. Chúng tôi thấy được rằng đây là một vấn đề cần giải quyết và đã lên kế hoạch để giải quyết vấn đề mà bạn đã báo cáo.\n\nNhờ vào những báo cáo của bạn và cộng đồng webside của chúng tôi đã có thể phát triễn ngày càng tốt hơn và phù hợp hơn đối với cộng đồng. Thế nên chúng tôi sẽ liên hệ để gửi lời cảm ơn và phần quà đến bạn trong thời gian sớm nhất.',
    );

    const mailContent = useDebounce(formValue.replace(/\n/g, '<br/>'), 1000);

    const handleMailContentChange = (event: any) => {
        setFormValue(event.target.value);
    };

    const options = top100Films.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle className={cx('dialog-title')}>
                <span>Chi tiết hiễn thị</span>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div>
                    <ImageDropzone
                        cropResult={true}
                        setCropResultBanner={true}
                        cropResultBanner={true}
                        setCropResult={true}
                        setImageF={true}
                        setImageBannerF={true}
                        imageBannerDefault={''}
                        imageDefault={''}
                    ></ImageDropzone>
                    <Autocomplete
                        id="free-solo-demo"
                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Tên Phim" />}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleReply(false)}>HUỶ</Button>
                <LoadingButton loading={approveLoading} onClick={() => handleApprove([dialogData.id])} autoFocus>
                    LƯU
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default CurrentDialog;
