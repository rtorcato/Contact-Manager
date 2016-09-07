// =======================
// socket io ======
// =======================

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//var server = require('http').createServer(APP);
//var io = require('socket.io')(server);





io.on('connection1',function(socket){
    console.log('We have user connected !');
    //console.log('Client connected...');
    socket.on('join', function(data) {
        console.log(data);
        client.emit('messages', 'Hello from server');
    });
    socket.emit('message', {
        message: 'welcome to the chat'
    });
    client.on('messages', function(data) {
           client.emit('broad', data);
           client.broadcast.emit('broad',data);
    });
    // This event will be emitted from Client when some one add comments.
    socket.on('comment added',function(data){
                // Add the comment in database.
        /*db.addComment(data.user,data.comment,mysql,pool,function(error,result){
            if (error) {
                io.emit('error');
            } else {
                // On successful addition, emit event for client.
                socket.broadcast.emit("notify everyone",{user : data.user,comment : data.comment});
            }
        });
        */
    });
});
