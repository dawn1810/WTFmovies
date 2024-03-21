import { getRequestContext } from '@cloudflare/next-on-pages';
import Mongodb from 'mongodb-cloudflare';
export function mongodb(): Mongodb {
    return new Mongodb({
        apiKey: getRequestContext().env.APIKey,
        apiUrl: getRequestContext().env.URL_Endpoint,
        dataSource: 'WTFmovies',
    });
}

