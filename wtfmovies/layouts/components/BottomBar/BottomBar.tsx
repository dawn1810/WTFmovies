'use client';
import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';

import { useViewport } from '~/hooks';
import { changeModalShow } from '~/layouts/components/Header/headerSlice';

function BottomBar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [value, setValue] = useState('/');
    const { data: session } = useSession();
    const extendedUser: any | undefined = session?.user;

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        if (!!session) router.push(newValue);
        else dispatch(changeModalShow(true));
    };

    if (isMobile)
        return (
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 11 }} elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    sx={{
                        '& .MuiBottomNavigationAction-root, svg': {
                            color: 'var(--text-color)',
                        },
                        '& .Mui-selected, .Mui-selected > svg': {
                            color: 'var(--highlight-color)',
                        },
                        '& .MuiBottomNavigationAction-root:active': {
                            color: 'var(--highlight-color)',
                        },
                    }}
                >
                    <BottomNavigationAction value="/" label="Home" icon={<HomeOutlinedIcon />} />
                    <BottomNavigationAction
                        value={`/profile/${extendedUser?.email}`}
                        label="Profile"
                        icon={<AccountCircleOutlinedIcon />}
                    />
                    <BottomNavigationAction value="/notification" label="Notify" icon={<NotificationsNoneIcon />} />
                </BottomNavigation>
            </Paper>
        );
}

export default BottomBar;
