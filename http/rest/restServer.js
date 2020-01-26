const http = require('http');
const fs = require('fs');

const users = {};

http.createServer((request, response) => {
    if (request.method === 'GET') {
        if (request.url === '/') {
            return fs.readFile('./restFront.html', (err, data) => {
                if (err) {
                    throw err;
                }
                response.end(data);
            })
        } else if (request.url === '/about') {
            return fs.readFile('./about.html', (err, data) => {
                if (err) {
                    throw err;
                }
                response.end(data);
            });
        } else if (request.url === '/users') {
            return response.end(JSON.stringify(users));
        }
        return fs.readFile(`.${request.url}`, (err, data) => {
            if (err) {
                response.writeHead(404, 'NOT FOUND');
                return response.end(data);
            }
            return response.end(data);
        })
    } else if (request.method === 'POST') {
        if (request.url === '/users') {
            let body = '';//스트림이 데이터가 크기때문에 버퍼 단위로 데이터를 조각조각내서 받음 body에 chunk를 모아서 합침
            request.on('data', (data) => {
                body += data;
            })
            return request.on('end', () => {
                console.log('POST분문 :', body);
                const { name } = JSON.parse(body);//.name => 원래 이렇게지만 비구조화할당 
                const id = Date.now();//사용자에게 고유 키를 부여해줌
                users[id] = name;
                response.writeHead(201);
                response.end('등록성공');
            })
        }
    } else if (request.method === 'PUT') {
        if (request.url.startsWith('/users/')) {
            const key = request.url.split('/')[2];
            let body = '';
            request.on('data', (data) => {
                body += data;
            });
            return request.on('end', () => {
                console.log('PUT 본문 :', body);
                users[key] = JSON.parse(body).name;
                return response.end(JSON.stringify(users));
            });
        }
    } else if (request.method === 'DELETE') {
        if (request.url.startsWith('/users/')) {
            const key = request.url.split('/')[2];
            delete users[key];
            return response.end(JSON.stringify(users))
        }
    }
    response.writeHead(404, 'NOT FOUND');
    return response.end('NOT FOUND');
})
    .listen(8080, () => {
        console.log('8080 포트에서 서버 대기중');
    });

