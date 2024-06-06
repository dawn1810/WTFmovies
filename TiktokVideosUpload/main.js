const { processAllVideos } = require("./covert.js");
const http = require('http');
const fs = require('fs');
const path = require('path');
// Sử dụng hàm

const inputDir = "input";
const outputDir = "output";

processAllVideos(inputDir, outputDir);
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
        const inputDir = path.join(__dirname, 'input');
        const outputDir = path.join(__dirname, 'output');

        const fileStream = fs.createWriteStream(path.join(inputDir, 'video.mp4'));
        req.pipe(fileStream);

        fileStream.on('finish', () => {
            processAllVideos(inputDir, outputDir)
                .then(() => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Video processing completed');
                })
                .catch((error) => {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Error processing video: ' + error.message);
                });
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
    }
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});