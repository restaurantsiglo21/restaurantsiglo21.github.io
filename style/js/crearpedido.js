function AgregarPedido(numero){
    console.log("El numero es ", numero)

    var receta = new Object();
    receta.numero = numero
    receta.cantidad = 0

    var pedidoRecetas = localStorage.getItem('Recetas');
    pedidoRecetas = JSON.parse(pedidoRecetas);

    if(pedidoRecetas != null){
        if(pedidoRecetas[receta.numero] == undefined){
            pedidoRecetas = {
                ...pedidoRecetas,
                [receta.numero]: receta
            }
        }
        pedidoRecetas[receta.numero].cantidad += 1
    }
    else{
        receta.cantidad = 1
        pedidoRecetas = {
            [receta.numero]: receta
        }
    }

    localStorage.setItem('Recetas', JSON.stringify(pedidoRecetas));
}

function ListarPedido(){

    document.getElementById('Resumen').innerHTML = ''
    var pedidoRecetas = localStorage.getItem('Recetas');
    pedidoRecetas = JSON.parse(pedidoRecetas);
    

    var num = ''
    var salida = ''
    

    for (var i = 0; i < Object.keys(pedidoRecetas).length; i++) {
        var num = ''
        num = pedidoRecetas[Object.keys(pedidoRecetas)[i]].numero
        cantidad = pedidoRecetas[Object.keys(pedidoRecetas)[i]].cantidad

        salida += EnviarPeticion(num, cantidad);
        console.log(salida)
    }

    CalcularTotal();
}


function EnviarPeticion(num, cantidad){

    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    

    xhr.open("GET", "http://127.0.0.1:8000/api/receta/"+num+"/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);
        var output = ''
        output += '<div class="plato"><span><strong>'+data.nombre+'</strong></span><button class="remove" type="button" onclick="EliminarElemento('+num+')">X</button><span class="price">Precio: '+data.precio+' c/u</span><span class="price">'+'<span class="price">Cantidad: '+cantidad+'</span><span class="price">'+'</span></div><hr/>'
        console.log(output)

        var precio = data.precio
        document.getElementById('Resumen').innerHTML += output


        var  totales = localStorage.getItem('Totales');
        totales = JSON.parse(totales);

        total = cantidad*data.precio; 
        totales.push(total)

        localStorage.setItem('Totales', JSON.stringify(totales));
    }

    xhr.send();
    
}

function EliminarElemento(num){

    var pedidoRecetas = localStorage.getItem('Recetas');
    pedidoRecetas = JSON.parse(pedidoRecetas);

    delete pedidoRecetas[num];

    localStorage.setItem('Recetas', JSON.stringify(pedidoRecetas));
    ListarPedido();
}

function CalcularTotal(){
    
    var totales = localStorage.getItem('Totales');
    totales = JSON.parse(totales)

    var final =  0 

    console.log(totales)
    

    for (var i = 0; i < totales.length; i++) {
        console.log(totales[i])
        final = totales[i] + final  
    }

    document.getElementById('total').innerHTML = 'Total $'+final
    var totales = []
    localStorage.setItem('Totales', JSON.stringify(totales));
}