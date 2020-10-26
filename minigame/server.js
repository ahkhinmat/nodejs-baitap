var express= require("express");
var app=express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server=require("http").Server(app);
server.listen(process.env.PORT||3000);
var io=require("socket.io")(server);
var mangHocVien=[];// mảng chứa tất cả học viên
io.on("connection",function(socket){
    console.log("có người kết nối"+ socket.id);
        socket.on("client-goi-hocvien",function(data){
        mangHocVien.push(
            new HocVien(data.hoten,data.email,data.phone)
        );
        io.sockets.emit("server-goi-ds-hocvien",mangHocVien);
    })
})
app.get("/",function(rep,res){
    res.render("trangchu");
});
function HocVien(hoten,email,phone){
    this.HOTEN=hoten;
    this.EMAIL=email;
    this.PHONE=phone;
}