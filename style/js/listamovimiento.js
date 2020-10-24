//Trae un listado de movimientos financieros presentes en la API para su despliegue en una tabla en HTML
function ListarMovimientos(){
    //Trae Token de Autorizacion y ajusta parametros de peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/movimiento/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        var movimientos = []
        var objeto = {} 

        for (var i = 0; i < data.length; i++) {
            objeto = {
                numero: data[i].numero, 
                fecha: data[i].fecha,
                detalle: data[i].detalle,
                ingreso: data[i].ingreso,
                egreso: data[i].egreso,
                metodo: data[i].metodo,
            }
            movimientos.push(objeto)
        }

        console.log(movimientos);

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

        movimientos.sort(sortByProperty('numero')); 
        console.log(movimientos);

        var output = '';
        var output = '<tr><th>N° Movimiento</th><th>Fecha</th><th>Detalle</th><th>Metodo de Pago</th><th>Ingreso</th><th>Egreso</th></tr>';

        //Genera tabla en HTML
        for (var i = 0; i < movimientos.length; i++) {

            output += '<tr><td>'+movimientos[i].numero+'</td>'+'<td>'+movimientos[i].fecha.substring(8, 10)+"-"+movimientos[i].fecha.substring(5,7)+"-"+movimientos[i].fecha.substring(0,4)+" / "+movimientos[i].fecha.substring(11,19)+'</td>'+'<td>'+movimientos[i].detalle+'</td>'+'<td>'+movimientos[i].metodo+'</td>'+'<td>'+movimientos[i].ingreso+'</td>'+'<td>'+movimientos[i].egreso+'</td></tr>';      
        }

        document.getElementById('tabla').innerHTML = output;
        document.getElementById('ingreso_movimiento').value = 0;
        document.getElementById('egreso_movimiento').value = 0;

    }

    xhr.send();
}

//Muestra el contenido del HTML en base al grupo del usuario
function Mostrar(){
    var grupos = localStorage.getItem('Grupos')
    var formularios = document.getElementById('contenido')
    grupos = JSON.parse(grupos)
    
    for (var i = 0; i < grupos.length; i++) {
        if(grupos[i] ==  3 || grupos[i] == 5){
            formularios.style.display = "block"
        }
    }
}



