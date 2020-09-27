var token = localStorage.getItem("SavesToken", token) 
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://127.0.0.1:8000/api/mesa/");

xhr.responseType = 'json'

xhr.setRequestHeader('Authorization', 'Token ' + token);

xhr.onload = () => {
    var data = xhr.response;
    console.log(data);
    
    for (var i = 0; i < data.length; i++) {
        if(data[i].disponibilidad == "DISPONIBLE"){
            document.getElementById("mesa"+data[i].numero).style.background='#008000'
        }
    }
    for (var i = 0; i < data.length; i++) {
        if(data[i].disponibilidad == "OCUPADA"){
            document.getElementById("mesa"+data[i].numero).style.background='#FF0000'
        }
    }
    for (var i = 0; i < data.length; i++) {
        if(data[i].disponibilidad == "RESERVADA"){
            document.getElementById("mesa"+data[i].numero).style.background='#FFFF00'
        }
    }

    if(data.disponibilidad == "DISPONIBLE"){
       
    }
}

xhr.send()