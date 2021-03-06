var socket=io("http://localhost:3000"); 

socket.on("server-send-dangky-thatbai",function(){
    alert("User đã có người đăng ký");
});
socket.on("server-send-dangky-thanhcong",function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});
socket.on("server-send-danhsach-users",function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class='user'>"+i+"<div>")
    })
});
socket.on("server-send-message",function(data){
$("#listMessages").append("<div class='ms'>"+data.un+":"+data.nd+"</div>");
});
socket.on("ai-do-dang-go",function(data){
    $("#thongbao").html("<img width='50px' src='typing.gif'/>"+data);
});
socket.on("ai-do-stop-go-chu",function(data){
    $("#thongbao").html(data);
});
socket.on("server-send-room",function(data){
    $("#dsRoom").html("");
    data.map(function(r){
        
        $("#dsRoom").append("<h4 classs='room'>"+r+"</h4>");
    });
});
socket.on("server-send-room-soket",function (data){
    $("#roomHienTai").html(data);
});
socket.on("server-chat",function(data){
    $("#phai").append("<div>"+data+"</div>");
})
$(document).ready(function () {
        $("#loginForm").show();
        $("#chatForm").hide();
        $("#btnRegister").click(function(){
            socket.emit("Client-send-username",$("#txtUsername").val());
        });
        $("#btnLogout").click(function(){
            socket.emit("logout");
            $("#loginForm").show(2000);
            $("#chatForm").hide(1000);
        });
        $("#btnSendMessage").click(function(){
            socket.emit("user-send-message",$("#txtMessage").val());
        });
        $("#txtMessage").focusin(function(){
            socket.emit("toi-dang-go-chu");
        })
        $("#txtMessage").focusout(function(){
            socket.emit("toi-stop-go-chu");
        });
        $("#btnTaoroom").click(function(){
            socket.emit("tao-room",$("#txtRoom").val());
        });
        $("#btnChat").click(function(){
            socket.emit("user-chat",$("#txtMessageChat").val());
        })
})