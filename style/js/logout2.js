//Cierra la Sesion actual desde cualquier vista 
function Logout2(){
    console.log("Se deslogeo")

    //Trae Token de Autorización y Ajusta Parametros de la peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    //Solicita la eliminacion del token actual a la API, el token sera invalidado para siempre
    xhr.open("GET", "http://127.0.0.1:8000/api/logout/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);

    xhr.onload = () => {
    
        if(xhr.status >= 400){
            console.log("Something went wrong!")
        }
        if(xhr.status == 201 || xhr.status == 200){

            //Limpia las variables de la sesión
            localStorage.removeItem("SavesToken")
            localStorage.removeItem("Grupos")
            localStorage.removeItem("Usuario")
            localStorage.removeItem("Sesion_Mesa")
            localStorage.removeItem("ProductoModificable")

            //Redirige al Inicio de la Pagina
            window.location.replace("http://127.0.0.1:8887/index.html")

            //Notifica que la sesión ha cerrado correctamente
            Push.create("Sesión Cerrada",{
                body: "Ha cerrado sesión correctamente",
                icon: "images/favicon.png",
                timeout: 8000,
                onClick: function(){                  
                    this.close();
                }
            });
        }
    }

    xhr.send();
}

//Visualiza la pestaña de cierre de sesion dependiendo si hay o no un token vigente
function MostrarLogout(){

    var boton = document.getElementById('logout')
    var token = localStorage.getItem("SavesToken")
    
    if(token == 'undefined'){
        localStorage.removeItem('Usuario')
        localStorage.removeItem('SavesToken')
        window.location.replace("http://127.0.0.1:8887/index.html")
    }
    if(token != undefined){
        boton.style.display = "block"
    }
    
}