const { instrument } = require('@socket.io/admin-ui');

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

// Create Socket.IO instance with Admin UI
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:1900','https://admin.socket.io'],
        credentials: true
    }
});

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


instrument(io, { 
    auth: false,
    namespaceName: '/admin' // Clearer namespace for admin
});

app.get('/admin', (req, res) => {
    res.send('<h1>Admin interface is running at https://admin.socket.io/</h1>');
});