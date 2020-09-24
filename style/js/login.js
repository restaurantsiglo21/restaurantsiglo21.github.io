
var formulario = document.getElementById("loginform")

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    console.log("Paso por aqui")

    var datos = new FormData(formulario);

    fetch('http://127.0.0.1:8000/api_token/', {
        method : 'GET',
        body : datos
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            //for (var i = 0; i < dataparse.length; i++) {
            //    token = dataparse[i].token
            //    console.log(token)
            //    localStorage.setItem("SavedToken", token)           
            //}

            localStorage.setItem("dummy", data)

            Push.create("Peticion enviada",{
                body: "Tu token de autenticacion ya ha sido generado!!",
                icon: "images/icon192x192.png",
                timeout: 8000,
                onClick: function(){                  
                    window.location.replace("http://127.0.0.1:8000//login.html");
                    this.close();
                }
            });
        })
        //.then(window.location.replace("http://127.0.0.1:8887/index.html"))
})


