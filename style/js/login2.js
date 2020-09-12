var formulario = document.getElementById("loginform")

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    var datos = new FormData(formulario);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://apisiglo21food.pythonanywhere.com/api_token/");
    
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        localStorage.setItem("SavesToken", data.token) 
        console.log(data)
        console.log(data.token)
    
        //for (var i = 0; i < respuesta.length; i++) {
        //   localStorage.setItem("SavedToken", respuesta[i].token)
        //}
    }

    xhr.send(datos);
})