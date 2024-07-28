'use client';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'var(--font-family)',
        fontSize: 20,
    },
});

export default function ThemeP({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
