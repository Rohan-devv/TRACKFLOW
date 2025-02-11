const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require("http");
const path = require('path');

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", function(socket){
     socket.on("send-location",function(data){
        io.emit("received-location",{id: socket.id, ...data});
     });

     socket.on("dissconnect",function(){
        io.emit("user-dissconnected", socket.id);
     })

    
    });

   


app.get("/", function(req, res){
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
