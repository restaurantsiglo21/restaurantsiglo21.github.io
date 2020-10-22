function ListarProductos(){
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
        
    xhr.open("GET", "http://127.0.0.1:8000/api/producto/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        var productos = []
        var objeto = {} 

        for (var i = 0; i < data.length; i++) {
            objeto = {
                numero: data[i].numero, 
                nombre: data[i].nombre,
                costo: data[i].costo,
                stock: data[i].stock,
                embalaje: data[i].embalaje,
                detalle: data[i].detalle,
                movimiento: data[i].movimiento
            }
            productos.push(objeto)
        }

        console.log(productos);

        function sortByProperty(property){  
            return function(a,b){  
            if(a[property] > b[property])  
                return 1;  
            else if(a[property] < b[property])  
                return -1;  
        
            return 0;  
            }  
        }

        productos.sort(sortByProperty('numero')); 
        console.log(productos);

        var output = '';

        output +='<tr><th>N° Producto</th><th>Nombre</th><th>Costo</th><th>Stock</th><th>Embalaje</th><th>Detalle</th></th><th>Movimiento</th></tr>'

        for (var i = 0; i < productos.length; i++) {
            output += '<tr><td><button type="button" class="boton" onclick="LlenarCampos('+productos[i].numero+')">'+productos[i].numero+'</td>'+'<td>'+productos[i].nombre+'</td>'+'<td>'+productos[i].costo+'</td>'+'<td>'+productos[i].stock+'</td>'+'<td>'+productos[i].embalaje+'</td>'+'<td>'+productos[i].detalle+'</td>'+'<td>'+productos[i].movimiento+'</td>'+'<td><button type="button" class="boton_editar" onclick="LlenarIngredientes('+productos[i].numero+')">&#128221</td></tr>';  
        }

        document.getElementById('tabla').innerHTML = output;
    }

    xhr.send();
}

function Mostrar(){
    var grupos = localStorage.getItem('Grupos')
    var formularios = document.getElementById('contenido')
    grupos = JSON.parse(grupos)
    
    for (var i = 0; i < grupos.length; i++) {
        if(grupos[i] == 3 || grupos[i] == 4){
            formularios.style.display = "block"
        }
    }
}