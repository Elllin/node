const http = require('http');
const fs = require('fs');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
//파싱 함수

const server = http.createServer((request, response) => {
    console.log(parseCookies(request.headers.cookie));
    //클라이언트가 보내준 쿠키 
    //넘어온 정보는 string이기에 객체로 파싱해야 함 
    //서버에서 쿠키를 등록해놨기 때문에 클라이언트에서 항상 쿠키를 header에서 같이 보내줌 
    console.log(request.url); //어떤 주소로 사용자가 요청했는지 알 수 있음
   response.writeHead(200, {'Set-Cookie': 'mycookie=test'});//header부분 키:mycookie 값:text / 쿠키를 설정한 것
   response.end('Hello Cookie');
}).listen(8080);
//버퍼를 받아서 브라우저가 랜더링
server.on('listening', () => {
    console.log('8080서버가 대기중 입니다');
});

server.on('error', (error) => {
    console.error(error);
});