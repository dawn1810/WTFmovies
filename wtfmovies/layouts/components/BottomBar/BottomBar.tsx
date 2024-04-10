'use client';
import Link from 'next/link';
import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, ThemeProvider, createTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faHeart, faHome, faUser } from '@fortawesome/free-solid-svg-icons';

import { useViewport } from '~/hooks';
import { useRouter } from 'next/navigation';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function Footer() {
    const router = useRouter();

    const [value, setValue] = useState('/');

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 1024;

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        router.push(newValue);
    };
    return (
        <ThemeProvider theme={darkTheme}>
            <nav>
                {isMobile && (
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
                            <BottomNavigationAction value="/" label="Home" icon={<FontAwesomeIcon icon={faHome} />} />
                            <BottomNavigationAction
                                value="/favorites"
                                label="Favorites"
                                icon={<FontAwesomeIcon icon={faHeart} />}
                            />
                            <BottomNavigationAction
                                value="/settings"
                                label="Settings"
                                icon={<FontAwesomeIcon icon={faGear} />}
                            />
                            <BottomNavigationAction
                                value="/profile"
                                label="Profile"
                                icon={<FontAwesomeIcon icon={faUser} />}
                            />
                        </BottomNavigation>
                    </Paper>
                )}
            </nav>
        </ThemeProvider>
    );
}

export default Footer;
