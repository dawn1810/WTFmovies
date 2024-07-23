export const runtime = 'edge';
import type { NextRequest } from 'next/server';
import { mongodb, toError } from '~/libs/func';
import { auth } from '../../auth/[...nextauth]/auth';
import { ExtendedUser } from '~/libs/interfaces';

interface StateInterface {
    name: string;
    email?: any;
    storage: any;
}

export class WebsocketObject {
    private conns: any = new Set<WebSocket>();

    constructor(private state: StateInterface) {}

    private broadcast(message: string) {
        for (const conn of this.conns) {
            // Check if the connection is still alive
            try {
                conn.send(message);
            } catch {
                // If the connection is closed, remove it from the Set
                this.conns.delete(conn);
            }
        }
    }

    // async increment() {
    //     const count = (await this.state.storage.get('count')) ?? 0;
    //     const newCount = count + 1;
    //     await this.state.storage.put('count', newCount);

    //     // Broadcast the new count to all connected clients
    //     this.broadcast(JSON.stringify({ type: 'update/count', count: newCount }));

    //     return newCount;
    // }

    // async decrement() {
    //     const count = (await this.state.storage.get('count')) ?? 0;
    //     const newCount = count - 1;
    //     await this.state.storage.put('count', newCount);

    //     // Broadcast the new count to all connected clients
    //     this.broadcast(JSON.stringify({ type: 'update/count', count: newCount }));

    //     return newCount;
    // }

    async fetch(request: Request) {
        const webSocketPair = new WebSocketPair();
        const [client, server]: any = Object.values(webSocketPair);

        server.addEventListener('message', async (event: any) => {
            // Messages are received/sent as strings, so we need to parse it into JSON
            // to use it as an object
            const action = JSON.parse(event.data);
            // server.send(JSON.stringify({ type: 'update/count', count: 10 }));

            // if (action.type === 'increment') {
            //     const newCount = await this.increment();
            //     server.send(JSON.stringify({ type: 'update/count', count: newCount }));
            // } else if (action.type === 'decrement') {
            //     const newCount = await this.decrement();

            //     server.send(JSON.stringify({ type: 'update/count', count: newCount }));
            // }
        });

        server.addEventListener('close', async () => {
            // Remove the session from the Set
            this.conns.delete(server);

            if (this.conns.size === 0) {
                // When the client disconnects, we can delete all the data in Durable Object
                // Deleting all data automatically discards the Durable Object instance
                await this.state.storage.deleteAll();
            }
        });

        server.accept();

        // Add the session to the Set
        this.conns.add(server);

        return new Response(null, {
            status: 101,
            webSocket: client,
        });
    }
}

async function handleRequest(request: Request) {
    try {
        const session = await auth();

        if (!session) return undefined;

        const extendedUser: ExtendedUser | undefined = session?.user;

        const upgradeHeader = request.headers.get('Upgrade');

        // If the upgrade header is not set, or it's not set to "websocket", return 426
        if (!upgradeHeader || upgradeHeader !== 'websocket') {
            return new Response('Expected Upgrade: websocket', { status: 426 });
        }

        const ob = await mongodb()
            .db('user')
            .collection('ws')
            .findOne({
                filter: { email: extendedUser?.email },
            });

        if (!!ob) {
            const wsOb: WebsocketObject = new WebsocketObject(ob);
            return await wsOb.fetch(request);
        } else {
            const newOb = {
                name: 'minhdz',
                email: extendedUser?.email,
                storage: {},
            };

            const wsOb: WebsocketObject = new WebsocketObject(newOb);

            await mongodb().db('user').collection('ws').insertOne(newOb);

            return await wsOb.fetch(request);
        }
    } catch (err) {
        return toError('Error from websocket API: ' + err, 500);
    }
}

export default {
    fetch: handleRequest,
};
