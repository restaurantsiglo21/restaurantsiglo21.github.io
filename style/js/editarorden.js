function EditarOrden(){
    var token = localStorage.getItem("SavesToken", token) 
    
    var n_orden = document.getElementById("n_orden").value
    var estado = document.getElementById("estado").value
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/orden/"+n_orden+"/");

    xhr.responseType = 'json'
    
    xhr.setRequestHeader('Authorization', 'Token ' + token);

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        var datos = new FormData();
        datos.append("numero", n_orden)
        datos.append("estado", estado)
        datos.append("hora_ter", data.hora_ini)

        var peticion = new XMLHttpRequest();
        peticion.open("PUT", "http://127.0.0.1:8000/api/orden/"+n_orden+"/editar_orden/");

        peticion.responseType = 'json'
        peticion.setRequestHeader('Authorization', 'Token ' + token);

        peticion.onload = () => {
            var data2 = peticion.response;
            console.log(data2);
            window.location.replace("http://127.0.0.1:8887/orden.html")
        }
        
        peticion.send(datos);
    }

    xhr.send();


}

