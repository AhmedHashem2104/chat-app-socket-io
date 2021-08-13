
  
  // either
  const server = require("http").createServer();

  const io = require("socket.io")(server, {
    path: "/",
    cors: '*'
  });

  var messages = [];

  io.on("connection" , (socket) => {
    socket.on("message" , (data) => {
        messages.push(data);
        io.emit("received" , data)
    })
  })
  
  
  server.listen(5000);
  