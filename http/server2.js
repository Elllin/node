const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log('서버실행');
    fs.readFile('./server3.html', (err, data) => {
        if(err){
            throw err;
        }
        response.end(data);
    });
}).listen(8080);
//버퍼를 받아서 브라우저가 랜더링
server.on('listening', () => {
    console.log('8080서버가 대기중 입니다');
});

server.on('error', (error) => {
    console.error(error);
});