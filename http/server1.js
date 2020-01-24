const http = require('http');

const server = http.createServer((request, response) => {
    console.log('서버실행');
    response.write('<h1>Hello Node!</h1>');
    response.write('<h2>Hello Node!</h2>');
    response.write('<h3>Hello Node!</h3>');
    response.write('<h4>Hello Node!</h4>');
    response.write('<h5>Hello Node!</h5>');
    response.end('<p>Hello Server</p>');//end가 응답이 끝났다는 것을 알려줌
}).listen(8080, ()=> { // listen이 서버가 죽지 않고 계속 실행할수 있도록 함
    console.log('8080포트 서버에서 대기중');
});//이부분도 이벤트 이기 때문에 아래처럼 바꿔서 가능

//server도 이벤트이기 때문에 이벤트 사용 가능

// server.on('listening', () => {
//     console.log('서버입니다~~!');
// })

server.on('error', (error) => {
    console.error(error);
});