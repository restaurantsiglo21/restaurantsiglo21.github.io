//Permite cambiar la disponibilidad de la mesa desde la vista de mesas
function EditarMesa(n_mesa){
    //Trae Token de Autorización y Ajusta Parametros de la peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/mesa/"+n_mesa+"/");
    xhr.responseType = 'json'
    xhr.setRequestHeader('Authorization', 'Token ' + token);

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);
        console.log(data.disponibilidad);
        
        //Cambia la disponibilidad a OCUPADA
        if(data.disponibilidad == "DISPONIBLE"){
            var datos = new FormData();
            datos.append("numero", n_mesa)
            datos.append("disponibilidad", "OCUPADA")

            var peticion = new XMLHttpRequest();
            peticion.open("PUT", "http://127.0.0.1:8000/api/mesa/"+n_mesa+"/editar_mesa/");

            peticion.responseType = 'json'
            peticion.setRequestHeader('Authorization', 'Token ' + token);

            peticion.onload = () => {
                var data2 = peticion.response;
                console.log(data2);
                window.location.replace("http://127.0.0.1:8887/mesas.html")
            }
            
            peticion.send(datos)
        }

        //Cambia la disponibilidad a RESERVADA
        if(data.disponibilidad == "OCUPADA"){
            var datos = new FormData();
            datos.append("numero", n_mesa)
            datos.append("disponibilidad", "RESERVADA")

            var peticion = new XMLHttpRequest();
            peticion.open("PUT", "http://127.0.0.1:8000/api/mesa/"+n_mesa+"/editar_mesa/");

            peticion.responseType = 'json'
            peticion.setRequestHeader('Authorization', 'Token ' + token);

            peticion.onload = () => {
                var data2 = peticion.response;
                console.log(data2);
                window.location.replace("http://127.0.0.1:8887/mesas.html")
            }
            
            peticion.send(datos)
        }

        //Cambia la disponibilidad a DISPONIBLE
        if(data.disponibilidad == "RESERVADA"){
            console.log("paso")
            var datos = new FormData();
            datos.append("numero", n_mesa)
            datos.append("disponibilidad", "DISPONIBLE")

            var peticion = new XMLHttpRequest();
            peticion.open("PUT", "http://127.0.0.1:8000/api/mesa/"+n_mesa+"/editar_mesa/");

            peticion.responseType = 'json'
            peticion.setRequestHeader('Authorization', 'Token ' + token);

            peticion.onload = () => {
                var data2 = peticion.response;
                console.log(data2);
                window.location.replace("http://127.0.0.1:8887/mesas.html")
            }
            
            peticion.send(datos)
        }
    }

    xhr.send();

}