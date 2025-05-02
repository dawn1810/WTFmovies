import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import YoutubeUpload from './YoutubeUpload';
import TiktokUpload from './TiktokUpload';
import { TabPanel } from '../TabPanel';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

interface EpFormProps {
    listEpisodeTiktok: any;
    setListEpisodeTiktok: any;
    listEpisodeYoutube: any;
    setListEpisodeYoutube: any;
}

export default function EpForm({
    listEpisodeTiktok,
    setListEpisodeTiktok,
    listEpisodeYoutube,
    setListEpisodeYoutube,
}: EpFormProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
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
                <TiktokUpload listEpisode={listEpisodeTiktok} setListEpisode={setListEpisodeTiktok} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <YoutubeUpload listEpisode={listEpisodeYoutube} setListEpisode={setListEpisodeYoutube} />
            </TabPanel>
        </Box>
    );
}
