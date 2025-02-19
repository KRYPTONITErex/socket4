let socket = require('socket.io');

let express = require('express');
let app = express();

//create route
app.use(express.static('public'));

//create server
let server = app.listen(1900,()=>{
    console.log('server started on port 1900');
})


//create socket
let io = socket(server);

io.on('connection',(socket)=>{
    console.log(' a new user is connnected : @' + socket.id);

    socket.on('disconnect',()=>{
        console.log('user disconnected : @' + socket.id);
    })

    socket.on('chat',(data)=>{
        // console.log(data);
        io.sockets.emit('chat',data);
    })

    socket.on('typing',(name)=>{
        socket.broadcast.emit('typing',name);
    })
})