
var  socket=io("https://hmdntool.herokuapp.com/"); 
socket.on("server-goi-ds-hocvien",function(data){
    $("#dshocvien").html("");
    data.map(function(hocvien,index){
       $("#dshocvien").append(`
       <div class='hocvien'>
                         <div class='hang1'>id:`+index+` || <span>`+hocvien.HOTEN+`</span></div>
                         <div class='hang2'>`+hocvien.EMAIL+`-ĐT-`+hocvien.PHONE+`</div>
       </div>
       `);
    })
})
$(document).ready(function(){
    $("#btnSend").click(function(){
            socket.emit("client-goi-hocvien",
            {
                hoten:$("#txtHoten").val(),
                email:$("#txtEmail").val(),
                phone:$("#txtPhone").val()
            }
        );
    });
})