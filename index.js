var socket = io("http://127.0.0.1:5000" , {
            transports : ["polling" , "websocket"]
        });
var senderId;
        socket.on('connect', function() {
            senderId = socket.id
        });

        socket.on("received" , ({ message , sender }) => {

            const p = document.createElement('p');
            if(senderId == sender)
            p.style.cssText = 'background-color:grey;padding:15px;border-radius:25px;color:white;font-weight:bold;display:flex;align-items:center;direction:rtl'
            else
            p.style.cssText = 'background-color:blue;padding:15px;border-radius:25px;color:white;font-weight:bold;display:flex;align-items:center'
            p.innerHTML = message
            document.getElementById("chatElement").appendChild(p);
           
        })

        setInterval(() => {
    $("#chatElement").scrollTop($("#chatElement")[0].scrollHeight);
} , 200)


const handleClick = () => {
    const input = document.getElementById("input").value;
    input && socket.emit("message" , { message : input , sender : senderId})
    document.getElementById("input").value = ''
}

$('#input').on('keyup', function(e) {
    e.preventDefault();
    if(e.keyCode == 13)
    handleClick()
});