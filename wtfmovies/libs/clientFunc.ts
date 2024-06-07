'use-client';

import { AdminDatasetInterface, FilmInfoInterface, FilmsInterFace, NumStatisticalInterface } from './interfaces';

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

// admin dashboard function
export const convertNumberToMonth = (number: number) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    if (number < 0 || number > 11) {
        return 'Invalid month number';
    }

    return months[number];
};

export const getDataCurrentYear = (data: NumStatisticalInterface[]): AdminDatasetInterface => {
    // views statistic map
    const current_year = new Date().getFullYear();

    const yearDataset = data
        .filter((data) => {
            const dataTime = new Date(data.time);
            return dataTime.getFullYear() === current_year;
        })
        .map((data) => {
            const dataTime = new Date(data.time);
            return {
                month: convertNumberToMonth(dataTime.getMonth()),
                view: data.views,
                user: data.users,
                film: data.films,
            };
        });

    return {
        view: yearDataset.map((item) => ({
            time: item.month,
            data: item.view,
        })),
        user: yearDataset.map((item) => ({
            time: item.month,
            data: item.user,
        })),
        film: yearDataset.map((item) => ({
            time: item.month,
            data: item.film,
        })),
    };
};

export const getDataByYear = (data: NumStatisticalInterface[]): AdminDatasetInterface => {
    const viewsByYear: any = {};
    const usersByYear: any = {};
    const filmsByYear: any = {};

    data.forEach((item) => {
        const year = new Date(item.time).getFullYear().toString();

        if (!viewsByYear[year] || !usersByYear[year] || !filmsByYear[year]) {
            viewsByYear[year] = { time: year, data: 0 };
            usersByYear[year] = { time: year, data: 0 };
            filmsByYear[year] = { time: year, data: 0 };
        }

        viewsByYear[year].data += item.views;
        usersByYear[year].data += item.users;
        filmsByYear[year].data += item.films;
    });

    return { view: Object.values(viewsByYear), user: Object.values(usersByYear), film: Object.values(filmsByYear) };
};

export const calcViewChange = (dataset: AdminDatasetInterface, typeData: 'view' | 'user' | 'film') => {
    const currentMonth = dataset[typeData][dataset[typeData].length - 1].data;
    const previousMonth = dataset[typeData][dataset[typeData].length - 2].data;
    const prevMonthChange = previousMonth / (currentMonth / 100);
    const changePersent = Math.round((100 - prevMonthChange) * 10) / 10;

    return {
        number: currentMonth,
        change: changePersent < 0 ? -changePersent : changePersent,
        up: changePersent >= 0,
    };
};

export const convertGender = (gender?: number) => {
    switch (gender) {
        case 0:
            return 'nam';
        case 1:
            return 'nữ';
        case 2:
            return 'khác';
        default:
            return 'chưa biết';
    }
};

export function cropImage(imageSrc: string, croppedArea: {
    x: number;
    y: number;
    width: number;
    height: number;
}): Promise<Blob | string> {
    return new Promise((resolve, reject) => {
        try {
            if (!croppedArea) {
                return resolve(imageSrc);
            }
            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
                const canvas = document.createElement('canvas');
                const croppedWidth = croppedArea.width;
                const croppedHeight = croppedArea.height;
                const croppedX = croppedArea.x;
                const croppedY = croppedArea.y;
                canvas.width = croppedWidth;
                canvas.height = croppedHeight;
                const context = canvas.getContext('2d');
                if (!context) {
                    reject(new Error('Unable to get canvas context'));
                    return;
                }

                context.drawImage(
                    image,
                    croppedX,
                    croppedY,
                    croppedWidth,
                    croppedHeight,
                    0,
                    0,
                    croppedWidth,
                    croppedHeight
                );

                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Unable to create blob from canvas'));
                        return;
                    }

                    resolve(blob);
                }, 'image/png');
            };

            image.onerror = () => {
                reject(new Error('Unable to load image'));
            };
        } catch (error) {
            return resolve(imageSrc);
        }


    });
}

export const generateUUIDv4 = (): string => {
    // Create a placeholder array for UUID format
    const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    return template.replace(/[xy]/g, (c) => {
        // Generate a random number between 0 and 15
        const r = (Math.random() * 16) | 0;
        // Adjust for 'y' values to conform to RFC 4122 which requires it to be 8, 9, A, or B
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        // Convert the number to its hexadecimal representation
        return v.toString(16);
    });
};