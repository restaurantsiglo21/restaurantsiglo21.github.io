var formulario = document.getElementById("loginform")

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    var datos = new FormData(formulario);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://127.0.0.1:8000/api_token/");
    
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        localStorage.setItem("SavesToken", data.token) 
        console.log(data)
        console.log(data.token)
    
        location.replace("http://127.0.0.1:8887/orden.html");
    }

    xhr.send(datos);
})