function ListarMovimientos(){
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
        

    xhr.open("GET", "http://127.0.0.1:8000/api/movimiento/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
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

        for (var i = 0; i < movimientos.length; i++) {

            output += '<tr><td>'+movimientos[i].numero+'</td>'+'<td>'+movimientos[i].fecha.substring(8, 10)+"-"+movimientos[i].fecha.substring(5,7)+"-"+movimientos[i].fecha.substring(0,4)+" / "+movimientos[i].fecha.substring(11,19)+'</td>'+'<td>'+movimientos[i].detalle+'</td>'+'<td>'+movimientos[i].metodo+'</td>'+'<td>'+movimientos[i].ingreso+'</td>'+'<td>'+movimientos[i].egreso+'</td></tr>';      
        }

        document.getElementById('tabla').innerHTML = output;
        document.getElementById('ingreso_movimiento').value = 0;
        document.getElementById('egreso_movimiento').value = 0;

    }

    xhr.send();
}




