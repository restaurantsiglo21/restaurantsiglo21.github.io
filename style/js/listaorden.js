//Refresca la pagina
function actualizar(){window.location.replace("http://127.0.0.1:8887/orden.html");}

//Trae un listado de ordenes presentes en la API para su despliegue en una tabla en HTML
function ListarOrdenes(){
    setInterval("actualizar()",30000);

    //Trae Token de Autorizacion y ajusta parametros de peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/orden/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;

        var output = '';
        var output2 = '';

        output +='<caption id="table_title2">Cola Normal</caption><tr><th>N° Orden</th><th>Estado</th><th>Hora Inicio</th><th>Mesa</th><th>Detalle</th></tr>'
        output2 +='<caption id="table_title2">Cola Especial</caption><tr><th>N° Orden</th><th>Estado</th><th>Hora Inicio</th><th>Mesa</th><th>Detalle</th></tr>'


        var ordenes = []
        var objeto = {} 

        for (var i = 0; i < data.length; i++) {
            objeto = {
                numero: data[i].numero, 
                estado: data[i].estado,
                hora_ini: data[i].hora_ini,
                minutos: data[i].minutos,
                mesa: data[i].mesa,
                detalle: data[i].detalle,
            }
            ordenes.push(objeto)
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

        ordenes.sort(sortByProperty('numero')); 

        //Genera Tabla HTML y asigna cola en base a tiempo de preparacion
        for (var i = 0; i < ordenes.length; i++) {
            if (ordenes[i].minutos < 60){
                if(ordenes[i].estado == 'PREPARACION'){
                    output += '<tr class="bg-danger"><td>'+ordenes[i].numero+'</td>'+'<td>'+ordenes[i].estado+'</td>'+'<td>'+ordenes[i].hora_ini.substring(11, 19)+'</td>'+'<td>'+ordenes[i].mesa+'</td>'+'<td>'+ordenes[i].detalle+'</td></tr>'; 
                }
                if(ordenes[i].estado == 'LISTA'){
                    output += '<tr class="bg-warning"><td>'+ordenes[i].numero+'</td>'+'<td>'+ordenes[i].estado+'</td>'+'<td>'+ordenes[i].hora_ini.substring(11, 19)+'</td>'+'<td>'+ordenes[i].mesa+'</td>'+'<td>'+ordenes[i].detalle+'</td></tr>'; 
                }
                if(ordenes[i].estado == 'ENTREGADA'){
                    output += '<tr class="bg-success"><td>'+ordenes[i].numero+'</td>'+'<td>'+ordenes[i].estado+'</td>'+'<td>'+ordenes[i].hora_ini.substring(11, 19)+'</td>'+'<td>'+ordenes[i].mesa+'</td>'+'<td>'+ordenes[i].detalle+'</td></tr>'; 
                }
                
            }
            if (ordenes[i].minutos >= 60){
                if(ordenes[i].estado == 'PREPARACION'){
                    output2 += '<tr class="bg-danger"><td>'+ordenes[i].numero+'</td>'+'<td>'+ordenes[i].estado+'</td>'+'<td>'+ordenes[i].hora_ini.substring(11, 19)+'</td>'+'<td>'+ordenes[i].mesa+'</td>'+'<td>'+ordenes[i].detalle+'</td></tr>'; 
                }
                if(ordenes[i].estado == 'LISTA'){
                    output2 += '<tr class="bg-warning"><td>'+ordenes[i].numero+'</td>'+'<td>'+ordenes[i].estado+'</td>'+'<td>'+ordenes[i].hora_ini.substring(11, 19)+'</td>'+'<td>'+ordenes[i].mesa+'</td>'+'<td>'+ordenes[i].detalle+'</td></tr>'; 
                }
                if(ordenes[i].estado == 'ENTREGADA'){
                    output2 += '<tr class="bg-success"><td>'+ordenes[i].numero+'</td>'+'<td>'+ordenes[i].estado+'</td>'+'<td>'+ordenes[i].hora_ini.substring(11, 19)+'</td>'+'<td>'+ordenes[i].mesa+'</td>'+'<td>'+ordenes[i].detalle+'</td></tr>'; 
                }
            }           
        }

        document.getElementById('cola').innerHTML = output;
        document.getElementById('cola_2').innerHTML = output2;

    }

    xhr.send();

}

//Muestra el contenido del HTML en base al grupo del usuario
function Mostrar(){
    var grupos = localStorage.getItem('Grupos')
    var formularios = document.getElementById('contenido')
    grupos = JSON.parse(grupos)
    
    for (var i = 0; i < grupos.length; i++) {
        if(grupos[i] == 3 || grupos[i] == 1){
            formularios.style.display = "block"
        }
    }
}