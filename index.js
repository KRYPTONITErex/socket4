
let express = require('express');
let socket = require('socket.io');

let app = express();

//create server
let server = app.listen(1900,()=>{
    console.log('server started on port 1900');
})

//create route
app.get('/',(res,req)=>{
    req.sendFile(__dirname + '/public/index.html');
})

//create socket
let io = socket(server);

io.on('connection',(socket)=>{
    console.log(' a new user is connnected : @' + socket.id);

    socket.on('chat',(data)=>{
        // console.log(data);
        io.sockets.emit('chat',data);

    })

    socket.on('typing',(name)=>{
        socket.broadcast.emit('typing',name);
    })
})
