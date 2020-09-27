function EditarMesa(n_mesa){
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/mesa/"+n_mesa+"/");

    xhr.responseType = 'json'
    
    xhr.setRequestHeader('Authorization', 'Token ' + token);

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);
        console.log(data.disponibilidad);
        
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