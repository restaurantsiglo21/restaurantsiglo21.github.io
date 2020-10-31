//Trae un listado de notificaciones presentes en la API para su despliegue en una tabla en HTML
function ListarNotificacion(){

    //Trae Token de Autorizacion y ajusta parametros de peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/notificacion/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        var notificaciones = []
        var objeto = {} 

        for (var i = 0; i < data.length; i++) {
            objeto = {
                numero: data[i].numero, 
                estado: data[i].estado,
                tipo: data[i].tipo,
                fecha: data[i].fecha,
                mesa: data[i].mesa,
                detalle: data[i].detalle,
            }
            notificaciones.push(objeto)
        }

        //Ordena los elementos de un arreglo de menor a mayor
        function sortByProperty(property){  
            return function(a,b){  
            if(a[property] < b[property])  
                return 1;  
            else if(a[property] > b[property])  
                return -1;  
        
            return 0;  
            }  
        }

        notificaciones.sort(sortByProperty('numero')); 
        console.log(notificaciones)

        var output = '<caption id="table_title2">Solicitudes de Inventario</caption><tr><th>N° Solicitud</th><th>Estado</th><th>Fecha</th><th>Detalle</th></tr>'

        //Genera tabla en HTML
        for (var i = 0; i < notificaciones.length; i++) {
            if(notificaciones[i].estado == 'RECHAZADA' && notificaciones[i].tipo == 'SOLICITUD'){
                output += '<tr class="bg-danger"><td>'+notificaciones[i].numero+'</td>'+'<td>'+notificaciones[i].estado+'</td>'+'<td>'+notificaciones[i].fecha.substring(8, 10)+"-"+notificaciones[i].fecha.substring(5,7)+"-"+notificaciones[i].fecha.substring(0,4)+" / "+notificaciones[i].fecha.substring(11,19)+'</td>'+'<td>'+notificaciones[i].detalle+'</td></tr>';      
            }
            if(notificaciones[i].estado == 'APROBADA' && notificaciones[i].tipo == 'SOLICITUD'){
                output += '<tr class="bg-success"><td>'+notificaciones[i].numero+'</td>'+'<td>'+notificaciones[i].estado+'</td>'+'<td>'+notificaciones[i].fecha.substring(8, 10)+"-"+notificaciones[i].fecha.substring(5,7)+"-"+notificaciones[i].fecha.substring(0,4)+" / "+notificaciones[i].fecha.substring(11,19)+'</td>'+'<td>'+notificaciones[i].detalle+'</td></tr>';      
            }
        }


        document.getElementById('tabla_solicitud').innerHTML = output;

    }

    xhr.send()
}

//Crea una notificacion de tipo Solicitud para que sea evaluada por el administrador
function EnviarSolicitud(){
    //Trae Token de Autorizacion y ajusta parametros de peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/api/notificacion/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    var texto = document.getElementById('detalle_solicitud').value

    var datos = new FormData();
    datos.append("tipo", 'SOLICITUD')
    datos.append("detalle", texto)


    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        if(xhr.status >= 400){
            Push.create("Solicitud Erronea",{
                body: "Ha ocurrido un error, solicitud no enviada",
                icon: "style/images/favicon.png",
                timeout: 8000,
                onClick: function(){                  
                    this.close();
                }
            });
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            Push.create("Solicitud recibida",{
                body: "El administrador evaluará su solicitud y emitira un veredicto",
                icon: "style/images/favicon.png",
                timeout: 8000,
                onClick: function(){                  
                    this.close();
                }
            });
        }
    }

    if(texto != "" && texto!= undefined){
        xhr.send(datos);
    }else{
        document.getElementById('alerta').innerHTML = '¡Complete el campo antes de continuar!'
    }
}

//Muestra el contenido del HTML en base al grupo del usuario
function Mostrar(){
    var grupos = localStorage.getItem('Grupos')
    var formularios = document.getElementById('contenido')
    grupos = JSON.parse(grupos)
    
    for (var i = 0; i < grupos.length; i++) {
        if(grupos[i] ==  3 || grupos[i] == 4){
            formularios.style.display = "block"
        }
    }
}
