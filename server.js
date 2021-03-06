var express= require("express");
var app=express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server=require("http").Server(app);
server.listen(3000);
var io=require("socket.io")(server);
io.on("connection",function(socket){
    console.log("có người kết nối "+ socket.id);
    socket.on("disconnect",function(){
        console.log(socket.id+" Ngắt kết nối");
    });
    socket.on("Client-send-data",function(data){
        console.log( socket.id+ " gởi "+data);//client gởi
        //máy chủ thông báo đến tất cả: io.sockets.emit
        //io.sockets.emit("Server-send-data",data+ "- gởi tất cả");
        //máy chủ chỉ  phát thông báo cho nơi gởi đến
        //socket.emit("Server-send-data",data+ "- chỉ nơi gọi");
        //máy chủ  phát thông báo cho tất cả trừ nơi gởi đến
        socket.broadcast.emit("Server-send-data",data+ "-đến tất cả trừ nơi gọi");

    });
    socket.on("Client-send-mau",function(data){
        console.log(data);
        io.sockets.emit("Server-send-mau",data);
    })
})
app.get("/",function(rep,res){
    res.render("trangchu");
});