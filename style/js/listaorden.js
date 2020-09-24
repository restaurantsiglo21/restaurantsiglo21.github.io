function actualizar(){window.location.replace("http://127.0.0.1:8887/orden.html");}
setInterval("actualizar()",300000);

var token = localStorage.getItem("SavesToken", token) 
var xhr = new XMLHttpRequest();
    

xhr.open("GET", "http://127.0.0.1:8000/api/orden/");

xhr.setRequestHeader('Authorization', 'Token ' + token);
xhr.responseType = 'json'

xhr.onload = () => {
    var data = xhr.response;
    console.log(data);

    var output = '';
    var output2 = '';

    output +='<caption id="table_title2">Cola Normal</caption><tr><th>N° Orden</th><th>Estado</th><th>Hora Inicio</th><th>Mesa</th><th>Detalle</th></tr>'
    output2 +='<caption id="table_title2">Cola Especial</caption><tr><th>N° Orden</th><th>Estado</th><th>Hora Inicio</th><th>Mesa</th><th>Detalle</th></tr>'

    for (var i = 0; i < data.length; i++) {
        if (data[i].minutos < 30){
            if(data[i].estado == 'PREPARACION'){
                output += '<tr class="bg-danger"><td>'+data[i].numero+'</td>'+'<td>'+data[i].estado+'</td>'+'<td>'+data[i].hora_ini+'</td>'+'<td>'+data[i].mesa+'</td>'+'<td>'+data[i].detalle+'</td></tr>'; 
            }
            if(data[i].estado == 'LISTA'){
                output += '<tr class="bg-warning"><td>'+data[i].numero+'</td>'+'<td>'+data[i].estado+'</td>'+'<td>'+data[i].hora_ini+'</td>'+'<td>'+data[i].mesa+'</td>'+'<td>'+data[i].detalle+'</td></tr>'; 
            }
            if(data[i].estado == 'ENTREGADA'){
                output += '<tr class="bg-success"><td>'+data[i].numero+'</td>'+'<td>'+data[i].estado+'</td>'+'<td>'+data[i].hora_ini+'</td>'+'<td>'+data[i].mesa+'</td>'+'<td>'+data[i].detalle+'</td></tr>'; 
            }
            
        }
        if (data[i].minutos >= 30){
            if(data[i].estado == 'PREPARACION'){
                output2 += '<tr class="bg-danger"><td>'+data[i].numero+'</td>'+'<td>'+data[i].estado+'</td>'+'<td>'+data[i].hora_ini+'</td>'+'<td>'+data[i].mesa+'</td>'+'<td>'+data[i].detalle+'</td></tr>'; 
            }
            if(data[i].estado == 'LISTA'){
                output2 += '<tr class="bg-warning"><td>'+data[i].numero+'</td>'+'<td>'+data[i].estado+'</td>'+'<td>'+data[i].hora_ini+'</td>'+'<td>'+data[i].mesa+'</td>'+'<td>'+data[i].detalle+'</td></tr>'; 
            }
            if(data[i].estado == 'ENTREGADA'){
                output2 += '<tr class="bg-success"><td>'+data[i].numero+'</td>'+'<td>'+data[i].estado+'</td>'+'<td>'+data[i].hora_ini+'</td>'+'<td>'+data[i].mesa+'</td>'+'<td>'+data[i].detalle+'</td></tr>'; 
            }
        }           
    }

    document.getElementById('cola').innerHTML = output;
    document.getElementById('cola_2').innerHTML = output2;

}

xhr.send();