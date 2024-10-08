import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import Mongodb from 'mongodb-cloudflare'
export const runtime = 'edge'
export async function GET(request: NextRequest) {
  const mongodb = new Mongodb({
    apiKey: getRequestContext().env.APIKey,
    apiUrl: getRequestContext().env.URL_Endpoint,
    dataSource: 'WTFmovies'
  });
  const text = await mongodb.db("film").collection("information").find();

  // In the edge runtime you can use Bindings that are available in your application
  // (for more details see:
  //    - https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#use-bindings-in-your-nextjs-application
  //    - https://developers.cloudflare.com/pages/functions/bindings/
  // )
  //
  // KV Example:
  // const myKv = getRequestContext().env.MY_KV
  // await myKv.put('suffix', ' from a KV store!')
  // const suffix = await myKv.get('suffix')
  // responseText += suffix

  return new Response(JSON.stringify(text, null, 2))
}
