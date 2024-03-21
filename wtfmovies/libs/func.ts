export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';
import Mongodb from 'mongodb-cloudflare';

export function mongodb(): Mongodb {
    return new Mongodb({
        apiKey: getRequestContext().env.APIKey,
        apiUrl: getRequestContext().env.URL_Endpoint,
        dataSource: 'WTFmovies',
    });
}

const getSHA256Hash = async (input: string): Promise<string> => {
    const textAsBuffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map((item) => item.toString(16).padStart(2, '0')).join('');
    return hash;
};

// compare password
export const comparePassWord = async (serverPass: string, clientPass: string): Promise<boolean> =>
    serverPass === (await getSHA256Hash(clientPass));
