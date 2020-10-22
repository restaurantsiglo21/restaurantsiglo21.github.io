function actualizar(){window.location.replace("http://127.0.0.1:8887/notificacion.html");}

function ListarNotificacion(){
    setInterval("actualizar()",30000);

    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
        

    xhr.open("GET", "http://127.0.0.1:8000/api/notificacion/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        var notificaciones = []
        var objeto = {} 

        for (var i = 0; i < data.length; i++) {
            objeto = {
                numero: data[i].numero, 
                estado: data[i].estado,
                fecha: data[i].fecha,
                mesa: data[i].mesa,
                detalle: data[i].detalle,
            }
            notificaciones.push(objeto)
        }

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

        var output = '<caption id="table_title2">Notificaciones</caption><tr><th>N° Notificacion</th><th>Estado</th><th>Fecha</th><th>Mesa</th><th>Detalle</th></tr>'

        for (var i = 0; i < notificaciones.length; i++) {
            if(notificaciones[i].estado == 'SIN_ATENCION'){
                output += '<tr class="bg-danger"><td>'+notificaciones[i].numero+'</td>'+'<td>'+notificaciones[i].estado+'</td>'+'<td>'+notificaciones[i].fecha.substring(8, 10)+"-"+notificaciones[i].fecha.substring(5,7)+"-"+notificaciones[i].fecha.substring(0,4)+" / "+notificaciones[i].fecha.substring(11,19)+'</td>'+'<td>'+notificaciones[i].mesa+'</td>'+'<td>'+notificaciones[i].detalle+'</td>'+'<td><button class="boton_editar" type="button" onclick="AtenderNotificacion('+notificaciones[i].numero+')">&#10004</button></td></tr>';      
            }
        }


        document.getElementById('tabla_notificacion').innerHTML = output;

    }

    xhr.send()
}

function AtenderNotificacion(numero){
    
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", "http://127.0.0.1:8000/api/notificacion/"+numero+"/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        var token = localStorage.getItem("SavesToken", token) 
        var http = new XMLHttpRequest();  
        http.open("PUT", "http://127.0.0.1:8000/api/notificacion/"+numero+"/editar_notificacion/");
        http.setRequestHeader('Authorization', 'Token ' + token);
        http.responseType = 'json'

        var datos = new FormData();
        datos.append("estado", 'ATENDIDA')

        http.onload = () => {
            var data = http.response;
            console.log(data);
            ListarNotificacion();
        }

        http.send(datos)
    }

    xhr.send()
    
}

function Mostrar(){
    var grupos = localStorage.getItem('Grupos')
    var formularios = document.getElementById('contenido')
    grupos = JSON.parse(grupos)
    
    for (var i = 0; i < grupos.length; i++) {
        if(grupos[i] ==  3 || grupos[i] == 2){
            formularios.style.display = "block"
        }
    }
}
