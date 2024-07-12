addEventListener('fetch', (event) => {
    event.respondWith(handleWebSocket(event.request));
});

class WebSocketServer {
    constructor(socket) {
        this.socket = socket;
    }

    async accept(request) {
        const { socket, response } = new WebSocketPair();

        this.socket.respondWith(response);
        return await socket.accept();
    }

    broadcast(message) {
        this.socket.send(message);
    }
}

async function handleWebSocket(request) {
    const { readable, writable } = new TransformStream();
    const wsServer = new WebSocketServer(writable);

    const { done } = await wsServer.accept(request);

    await forwardMessages(readable, done, wsServer);

    return new Response(null, { status: 101 });
}

async function forwardMessages(reader, done, wsServer) {
    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            wsServer.broadcast(value);
        }
    } finally {
        reader.releaseLock();
    }
}