var express= require("express");
var app=express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server=require("http").Server(app);
server.listen(3000);
var io=require("socket.io")(server);
io.on("connection",function(socket){
    console.log("có người kết nối"+ socket.id);
})
app.get("/",function(rep,res){
    res.render("trangchu");
});