const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {};        

const server = http.createServer((request, response) => {
    const cookies = parseCookies(request.headers.cookie);
    if (request.url.startsWith('/login')) {
        const { query } = url.parse(request.url);
        const { name } = qs.parse(query); 
        const randomInt = + new Date();

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);

        session[randomInt] = {
            name,
            expires,
        }

        response.writeHead(302, { Location: '/', 'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/` });
        response.end();
    } else if (cookies.session && session[cookies.session] &&session[cookies.session].expires > new Date()) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(`${session[cookies.session].name}님 안녕하세요`);
    }
    else {
        fs.readFile('./login.html', (err, data) => {
            if (err) {
                throw err;
            }
            response.end(data);
        });
    }
}).listen(8080);

server.on('listening', () => {
    console.log('8080서버가 대기중 입니다');
});

server.on('error', (error) => {
    console.error(error);
});