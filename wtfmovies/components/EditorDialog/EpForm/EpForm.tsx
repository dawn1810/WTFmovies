import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import YoutubeUpload from './YoutubeUpload';
import TiktokUpload from './TiktokUpload';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
interface MovieForm {
    listEpisodeTiktok: any,
    setListEpisodeTiktok: any,
    listEpisodeYoutube: any,
    setListEpisodeYoutube: any
}
export default function VerticalTabs({
    listEpisodeTiktok,
    setListEpisodeTiktok,
    listEpisodeYoutube,
    setListEpisodeYoutube, }: MovieForm) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, display: 'flex' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical uploader"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Tiktok server" {...a11yProps(0)} />
                <Tab label="Youtube server" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <TiktokUpload listEpisode={listEpisodeTiktok} setListEpisode={setListEpisodeTiktok}></TiktokUpload>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <YoutubeUpload listEpisode={listEpisodeYoutube} setListEpisode={setListEpisodeYoutube}></YoutubeUpload>
            </TabPanel>

        </Box>
    );
}
