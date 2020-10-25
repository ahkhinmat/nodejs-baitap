var socket=io("http://localhost:3000"); 

socket.on("server-send-dangky-thatbai",function(){
    alert("User đã có người đăng ký");
})
socket.on("server-send-dangky-thanhcong",function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
})
socket.on("server-send-danhsach-users",function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class='user'>"+i+"<div>")
    })
})
$(document).ready(function () {
        $("#loginForm").show();
        $("#chatForm").hide();
        $("#btnRegister").click(function(){
            socket.emit("Client-send-username",$("#txtUsername").val());
        })
})