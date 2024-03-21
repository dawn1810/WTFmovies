export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';
import Mongodb from 'mongodb-cloudflare';

export const mongodb = new Mongodb({
    apiKey: getRequestContext().env.APIKey,
    apiUrl: getRequestContext().env.URL_Endpoint,
    dataSource: 'WTFmovies',
});
