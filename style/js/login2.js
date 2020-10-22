var formulario = document.getElementById("loginform")

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    var nombre_usuario = document.getElementById('id_usuario').value
    localStorage.setItem('Usuario', nombre_usuario)
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

        if(xhr.status >= 400){
            document.getElementById("alerta").innerHTML = "El nombre de usuario y contraseña son Incorrectos!!"
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            
            var token = localStorage.getItem("SavesToken", token) 
            var http = new XMLHttpRequest();
            http.open("GET", "http://127.0.0.1:8000/api/user/");
            http.setRequestHeader('Authorization', 'Token ' + token);
            http.responseType = 'json'

            http.onload = () => {
                var data = http.response;
                console.log(data);
                
                var nombre_usuario = localStorage.getItem('Usuario')

                for (var i = 0; i < data.length; i++) {
                    if(nombre_usuario == data[i].username){
                        var grupos = data[i].groups
                        localStorage.setItem('Grupos', JSON.stringify(grupos))
                    }
                }
                
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