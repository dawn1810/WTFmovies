'use client';
import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { useViewport } from '~/hooks';
import { useRouter } from 'next/navigation';

function BottomBar() {
    const router = useRouter();

    const [value, setValue] = useState('/');

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        router.push(newValue);
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
                        value="/review/inuyashiki"
                        label="Favorites"
                        icon={<FavoriteBorderIcon />}
                    />
                    <BottomNavigationAction value="/settings" label="Settings" icon={<SettingsOutlinedIcon />} />
                    <BottomNavigationAction value="/profile" label="Profile" icon={<AccountCircleOutlinedIcon />} />
                </BottomNavigation>
            </Paper>
        );
}

export default BottomBar;
