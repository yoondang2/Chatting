const express = require('express')
//설치한 express 모듈 불러오기

const socket = require('socket.io')
//설치한 socket.io 모듈 불러오기

const http = require('http')
//Node.js 기본 내장 모듈 불러오기

const fs = require('fs')
//Node.js 기본 내장 모듈 불러오기

const app = express()
//express 객체 생성

const server = http.createServer(app)
//express http 서버 생성

const io = socket(server)
//생성된 서버를 socket.io에 바인딩



app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))


app.get('/', function(request, response){
    fs.readFile('./static/index.html', function(err, data){
        if(err) {
            response.send('에러')
        } else {
            response.writeHead(200, {'Content-Type':'text/html'})
            response.write(data)
            response.end()
        }
    })
    /*
    console.log('유저가 / 으로 접속하였습니다!!')
    response.send('Hello, Express Server!!')*/
})
//Get 방식으로 / 경로에 접속하면 실행됨
//request는 클라이언트에서 전달된 데이터와 정보들이 담겨있고 
//response에는 클라이언트에게 응답을 위한 정보가 들어있다.

io.sockets.on('connection',function(socket){
//새로운 유저가 접속했을 경우 다른 소켓에도 알려줌
  socket.on('newUser', function(name){
    console.log(name + ' 님이 접속하였습니다!^^')
//소켓에 이름 저장해두기
    socket.name = name
//모든 소켓에게 전송
  io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + ' 님이 접속하였습니다!^^'})
})

//전송한 메시지 받기
  socket.on('message', function(data){
     //받은 데이터에 누가 보냈는지 이름을 추가
      data.name = socket.name
      console.log(data);
      
     //보낸 사람을 제외한 나머지 유저에게 메시지 전송
      socket.broadcast.emit('update', data);
  })
  socket.on('balanceCheck', function(data){
    //받은 데이터에 누가 보냈는지 이름을 추가
     console.log(data);
     
    //보낸 사람을 제외한 나머지 유저에게 메시지 전송
     
 })
//접속 종료
  socket.on('disconnect', function(){

      console.log(socket.name + ' 님이 나가셨습니다~~')
   //나가는 사람을 제외한 나머지 유저에게 메시지 전송
      socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다~~'});
  })
})

server.listen(10080, function(){

    console.log('서버 실행 중..')
})
//서버를 10080포트로 listen
