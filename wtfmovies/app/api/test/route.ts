import { ObjectId, mongodb, toJSON } from '~/libs/func';
export const runtime = 'edge';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const data: any[] = [];

    return toJSON(data);
}
