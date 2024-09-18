const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('join', (email) => {
            email && socket.join(email);
        });

        // for comment
        socket.on('comment', (message) => {
            const data = JSON.parse(message);
            socket.broadcast.emit('newComment', JSON.stringify({ msgFilmName: data.filmName, comment: data.comment }));
        });

        socket.on('replyComment', (message) => {
            const data = JSON.parse(message);
            io.in(data.receiver).emit('commentNotify', JSON.stringify({ comment: data.comment, filmName: data.filmName }));
            socket.broadcast.emit('newReplyComment', JSON.stringify({ msgFilmName: data.filmName, comment: data.comment }));
        });

        socket.on('editComment', (message) => {
            socket.broadcast.emit('newEditComment', message);
        });

        socket.on('recallComment', (message) => {
            socket.broadcast.emit('newRecallComment', message);
        });

        // admin ban and update
        socket.on('banUser', (message) => {
            const data = JSON.parse(message);
            io.in(data.receiver).emit('banCurrUser', data.unbanDate);
        });

        socket.on('banComment', (message) => {
            socket.broadcast.emit('banIdComment', message);
        });

        socket.on('changeRole', (message) => {
            const data = JSON.parse(message);
            io.to(data.receiver).emit('changeUserRole', data.role);
        });

        socket.on('disconnect', () => {
            // socket.leave(email);
            console.log('Client disconnected');
        });
    });

    server.listen(3001, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3001');
    });
});
