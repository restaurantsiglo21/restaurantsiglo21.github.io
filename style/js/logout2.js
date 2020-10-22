function Logout2(){
    console.log("Se deslogeo")

    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://127.0.0.1:8000/api/logout/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);

    xhr.onload = () => {
    
        if(xhr.status >= 400){
            console.log("Something went wrong!")
        }
        if(xhr.status == 201 || xhr.status == 200){
            localStorage.removeItem("SavesToken")
            localStorage.removeItem("Grupos")
            localStorage.removeItem("Usuario")
            localStorage.removeItem("Sesion_Mesa")
            localStorage.removeItem("ProductoModificable")

            window.location.replace("http://127.0.0.1:8887/index.html")

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