import { Montserrat, Roboto_Mono } from 'next/font/google';

export const montserrat = Montserrat({
    weight: ['300', '400', '500', '600', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});

export const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
});
