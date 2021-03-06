var express= require("express");
var app=express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server=require("http").Server(app);
server.listen(3000);
var io=require("socket.io")(server);
var mangUers=[];
io.on("connection",function(socket){
    // show ds room đang có 
    
    console.log("có người kết nối "+ socket.id);
    console.dir(socket.adapter.rooms);
    socket.on("Client-send-username",function(data){
        console.log(data);
        if(mangUers.indexOf(data)>=0){
            //đăng ký thất baị
            socket.emit("server-send-dangky-thatbai");
        }else{//đăng ký thành công
            socket.Username=data;
            mangUers.push(data);
            socket.emit("server-send-dangky-thanhcong",data);//thông báo riêng người thành công
            //thông báo cho tất cả mảng user online
            io.sockets.emit("server-send-danhsach-users",mangUers);
        }
    })
    socket.on("logout",function(){
        mangUers.splice(mangUers.indexOf(mangUers.Username),1);
        socket.broadcast.emit("server-send-danhsach-users",mangUers);
    })
    socket.on("disconnect",function(){
        console.log(socket.id+" Ngắt kết nối");
    });

    socket.on("user-send-message",function(data){
        //console.log(data);
        io.sockets.emit("server-send-message",{un:socket.Username,nd:data});
    })
    socket.on("toi-dang-go-chu",function(data){
        var s=socket.Username+" đang gõ chữ";
        io.sockets.emit("ai-do-dang-go",s);
       // io.sockets.emit("server-send-message",{un:socket.Username,nd:data});
    });
    socket.on("toi-stop-go-chu",function(data){
        var s=socket.Username+" dừng gõ chữ";
        io.sockets.emit("ai-do-stop-go-chu",s);
       // io.sockets.emit("server-send-message",{un:socket.Username,nd:data});
    });
    socket.on("tao-room",function(data){
         socket.join(data);
         socket.Phong=data;
         console.dir(socket.adapter.rooms);
         var mang=[];
         for (r in socket.adapter.rooms){
             console.log(r);
             mang.push(r);
         }
         io.sockets.emit("server-send-room",mang);
         socket.emit("server-send-room-soket",data);
    });
    socket.on("user-chat",function(data){
        io.sockets.in(socket.Phong).emit("server-chat",data);
    })
})
app.get("/",function(rep,res){
    res.render("chat");
});