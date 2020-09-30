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

    output +='<tr><th>N° Producto</th><th>Nombre</th><th>Costo</th><th>Stock</th><th>Embalaje</th><th>Detalle</th></tr>'

    for (var i = 0; i < productos.length; i++) {
        output += '<tr><td>'+productos[i].numero+'</td>'+'<td>'+productos[i].nombre+'</td>'+'<td>'+productos[i].costo+'</td>'+'<td>'+productos[i].stock+'</td>'+'<td>'+data[i].embalaje+'</td>'+'<td>'+data[i].detalle+'</td></tr>';  
    }

    document.getElementById('tabla').innerHTML = output;
}

xhr.send();