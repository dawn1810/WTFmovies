import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ListAltIcon from '@mui/icons-material/ListAlt';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'var(--font-family)',
        fontSize: 20,
    },

});
function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (

        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>

    );
}

export default function MyDialogWithTabs() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={darkTheme} >
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open dialog
                </Button>
                <Dialog fullScreen open={open} onClose={handleClose}>
                    <AppBar position="static" >
                        <Toolbar >
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                centered
                                variant="fullWidth"
                            >
                                <Tab icon={<InfoIcon />} iconPosition="start" label="Thông tin cơ bản" wrapped />
                                <Tab icon={<ListAltIcon />} iconPosition="start" label="Thông tin tập phim" wrapped />
                            </Tabs>
                            <Button autoFocus variant="contained" onClick={handleClose}>
                                Lưu
                            </Button>
                        </Toolbar>

                    </AppBar>
                    <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}