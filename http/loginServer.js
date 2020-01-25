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

const server = http.createServer((request, response) => {
    const cookies = parseCookies(request.headers.cookie);
    if (request.url.startsWith('/login')) {//url이 /login이면
        const { query } = url.parse(request.url);//login?name=이름 이렇게 전송 되기 때문에 query를 가져와서 name에 담음
        const { name } = qs.parse(query); //query를 다시 파싱해서 name부분만 가져옴
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);//minutes을 가져와서 5를 더해서 minutes에 seting
        //302는 성공 후 다른 페이지로 이동
        response.writeHead(302, { Location: '/', 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/` });
        //1.한글처리 인코딩 2.쿠키 유효시간 설정 3.js에서 쿠키에 접근할수 없다 4.루트url에서만 유효한 쿠키
        response.end();
    } else if (cookies.name) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(`${cookies.name}님 안녕하세요`);
    }
    else {//login이 아닌 페이지면 
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