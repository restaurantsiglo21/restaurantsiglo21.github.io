//Modifica el estado de la orden desde la vista de Cola de Ordenes
function EditarOrden(){
    //Trae Token de Autorización 
    var token = localStorage.getItem("SavesToken", token) 
    var n_orden = document.getElementById("n_orden").value
    var estado = document.getElementById("estado").value
    
    //Ajusta Parametros de la peticion
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/orden/"+n_orden+"/");
    xhr.responseType = 'json'
    xhr.setRequestHeader('Authorization', 'Token ' + token);

    xhr.onload = () => {
        //Recoje respuesta de la peticion
        var data = xhr.response;

        var datos = new FormData();
        datos.append("numero", n_orden)
        datos.append("estado", estado)
        datos.append("mesa", data.mesa)

        var recetas = data.recetas

        for (var i = 0; i < recetas.length; i++) {
            datos.append("recetas", recetas[i]);
        }


        //Añade Tiempo de termino para una Orden Entregada
        if(estado == 'ENTREGADA'){
            var d = new Date();
            var fecha = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'T'+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.026068-03:00' 

            datos.append("hora_ter", fecha)
        }

        //Trae Token de Autorización y Ajusta Parametros de la peticion
        var token = localStorage.getItem("SavesToken", token) 
        var peticion = new XMLHttpRequest();
        peticion.open("PUT", "http://127.0.0.1:8000/api/orden/"+n_orden+"/editar_orden/");
        peticion.responseType = 'json'
        peticion.setRequestHeader('Authorization', 'Token ' + token);

        peticion.onload = () => {
            //Recoje respuesta de la peticion
            var data2 = peticion.response;
            ListarOrdenes();
        }
        
        peticion.send(datos);
    }

    xhr.send();
}

