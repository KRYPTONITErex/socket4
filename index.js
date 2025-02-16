const { instrument } = require('@socket.io/admin-ui');

let express = require('express');
let socket = require('socket.io');

let app = express();

//create server
let server = app.listen(1900,()=>{
    console.log('server started on port 1900');
})

//create route
app.use(express.static('public'));


// Create Socket.IO instance with Admin UI
const io = socket(server, {
    cors: {
        origin: ['http://localhost:1900', 'https://admin.socket.io'],
        credentials: true
    }
});


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


instrument(io, { 
    auth: false,
    mode: 'development',
    namespaceName: '/admin' // Clearer namespace for admin
});

app.get('/admin', (req, res) => {
    res.send('<h1>Admin interface is running at <a href="https://admin.socket.io/">https://admin.socket.io/</a></h1>');
});