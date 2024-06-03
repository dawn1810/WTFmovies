'use-client';

import { FilmInfoInterface, FilmsInterFace } from './interfaces';

const bufferFromPEM = (pem: string) => {
    // Remove the PEM headers and base64 decode the binary data
    const b64Data = pem.replace(/(-----(BEGIN|END) (PUBLIC|PRIVATE) KEY-----|\s)/g, '');
    return Uint8Array.from(atob(b64Data), (c) => c.charCodeAt(0));
};

const bufferToBase64 = (buffer: any) => {
    return btoa(String.fromCharCode(...buffer));
};

// auth
export const encryptData = async (publicKeyPEM: string, data: string) => {
    // Import the public key
    const publicKey = await crypto.subtle.importKey(
        'spki',
        bufferFromPEM(publicKeyPEM),
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
        },
        true,
        ['encrypt'],
    );

    // Convert the data to an ArrayBuffer and encrypt it
    const encrypted = await crypto.subtle.encrypt(
        {
            name: 'RSA-OAEP',
        },
        publicKey,
        new TextEncoder().encode(data),
    );

    // Convert the encrypted data to a Base64 string to return
    return bufferToBase64(new Uint8Array(encrypted));
};

// client validate
export const validateEmail = (email: string) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email.toLowerCase().match(emailRegex);
};

export const validatePassword = (password: string): number => {
    // Check for empty string
    if (password.length === 0) {
        return 3; // Code 3 for empty password
    }

    // Check password length (8 to 49 characters)
    if (password.length < 8) {
        return 1; // Code 1 for less than 8 characters
    } else if (password.length > 50) {
        return 2; // Code 2 for longer than 50 characters
    }

    // Regular expression for password complexity
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\-]+$/;

    // Check for complexity requirements
    if (!regex.test(password)) {
        return 4; // Code 4 for lack of complexity
    }

    // Password is valid (no errors)
    return 0;
};

export const validateBirthDate = (birthDate: string) => {
    let today = new Date();
    let bd = new Date(birthDate);

    // Calculate the difference in milliseconds
    let difference = today.getTime() - bd.getTime();

    // Convert the difference into years
    let yearsDifference = difference / (1000 * 60 * 60 * 24 * 365);

    // Check if the difference is greater than 10 years
    if (yearsDifference > 10) {
        return true;
    } else {
        return false;
    }
};

// map films data
export const mapFilms = (films: FilmInfoInterface[]): FilmsInterFace[] => {
    const mappedFilms: FilmsInterFace[] = films.map(
        ({ img, name, videoType, views, rating, poster, searchName }): FilmsInterFace => {
            // Calculate the total number of episodes across all video types
            const subsType = videoType.find((type) => type.title === 'Subs') as any;
            if (!subsType) return { img, name, searchName, views, rating, poster, episodes: 0 };

            const totalEpisodes = subsType.episode[subsType.episode.length - 1];
            return {
                img,
                name,
                searchName,
                views,
                rating,
                poster,
                episodes: totalEpisodes,
            };
        },
    );
    return mappedFilms;
};

// time format
export const timePassed = (datestring: string): string => {
    const date = new Date(datestring);
    const now = new Date();

    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.ceil(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);

    if (diffSeconds <= 10) {
        return `bây giờ`;
    } else if (diffSeconds <= 60) {
        return `${diffSeconds} giây trước`;
    } else if (diffMinutes <= 60) {
        return `${diffMinutes} phút trước`;
    } else if (diffHours <= 24) {
        return `${diffHours} giờ trước`;
    } else if (diffDays <= 30) {
        return `${diffDays} ngày trước`;
    } else if (diffDays <= 365) {
        return `${diffMonths} tháng trước`;
    } else {
        return `${diffYears} năm trước`;
    }
};

// number format
export const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }

    return num.toString();
};

// evaluate
export const calcTotal = (store: any[]) => {
    const result = store.reduce(
        (total: number, row: number[]) => total + row.reduce((sum: number, c: number) => sum + +c, 0),
        0,
    );
    return result;
};
