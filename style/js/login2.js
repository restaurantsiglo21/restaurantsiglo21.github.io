//Perimte la autenticaion de un usuario a traves su nombre de usuario y contraseña

//Recoje los datos del formulario
var formulario = document.getElementById("loginform")

//Solicita Token de Autenticación a API
formulario.addEventListener('submit', function(e){
    e.preventDefault();

    var nombre_usuario = document.getElementById('id_usuario').value
    localStorage.setItem('Usuario', nombre_usuario)
    var datos = new FormData(formulario);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://127.0.0.1:8000/api_token/");
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoje respuesta de la peticion
        var data = xhr.response;

        //Guarda el Token de autenticacion mientras la sesion este abierta
        localStorage.setItem("SavesToken", data.token) 

        if(xhr.status >= 400){
            document.getElementById("alerta").innerHTML = "El nombre de usuario o contraseña son Incorrectos!!"
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            
            //Trae Token de Autorización y Ajusta Parametros de la peticion
            var token = localStorage.getItem("SavesToken", token) 
            var http = new XMLHttpRequest();
            http.open("GET", "http://127.0.0.1:8000/api/user/");
            http.setRequestHeader('Authorization', 'Token ' + token);
            http.responseType = 'json'

            http.onload = () => {
                //Recoje respuesta de la peticion
                var data = http.response;
                console.log(data);
                
                var nombre_usuario = localStorage.getItem('Usuario')

                //Guarda el grupo al que pertenece el usuario
                for (var i = 0; i < data.length; i++) {
                    if(nombre_usuario == data[i].username){
                        var grupos = data[i].groups
                        localStorage.setItem('Grupos', JSON.stringify(grupos))
                    }
                }
                
                //Redirecciona a una vista según el grupo del usuario
                if(grupos.includes(3) ){
                    window.location.replace("http://127.0.0.1:8887/index.html")
                }
                if(grupos.includes(1) ){
                    window.location.replace("http://127.0.0.1:8887/orden.html")
                }
                if(grupos.includes(2) ){
                    window.location.replace("http://127.0.0.1:8887/mesas.html")
                }
                if(grupos.includes(4) ){
                    window.location.replace("http://127.0.0.1:8887/bodega.html")
                }
                if(grupos.includes(5) ){
                    window.location.replace("http://127.0.0.1:8887/finanzas.html")
                }
                if(grupos.includes(6) ){
                    window.location.replace("http://127.0.0.1:8887/login_mesa.html")
                }
                
            }

            http.send()
        }
    
    }

    xhr.send(datos);
})