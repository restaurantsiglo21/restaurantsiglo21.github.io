function Listar(){

    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    

    xhr.open("GET", "http://127.0.0.1:8000/api/cliente/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);
    
        //for (var i = 0; i < respuesta.length; i++) {
        //   localStorage.setItem("SavedToken", respuesta[i].token)
        //}
    }

    xhr.send();
}


