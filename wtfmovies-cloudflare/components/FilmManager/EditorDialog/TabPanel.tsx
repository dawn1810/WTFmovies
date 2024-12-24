import Box from '@mui/material/Box';

export function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
            {value === index && (
                <Box
                    sx={{
                        p: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}
