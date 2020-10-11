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
    
    var totales = []
    totales = JSON.stringify(totales);
    localStorage.setItem('Totales', totales)

    var minutos = []
    minutos = JSON.stringify(minutos);
    localStorage.setItem('Minutos', minutos)

    var detalle = []
    detalle = JSON.stringify(detalle);
    localStorage.setItem('Detalle', detalle)

    for (var i = 0; i < Object.keys(pedidoRecetas).length; i++) {
        var num = ''
        num = pedidoRecetas[Object.keys(pedidoRecetas)[i]].numero
        cantidad = pedidoRecetas[Object.keys(pedidoRecetas)[i]].cantidad

        salida += EnviarPeticion(num, cantidad);
        console.log(salida)
    }

    
    setTimeout("CalcularTotal()", 500);
    setTimeout("CalcularMinutos()", 500);
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

        var minutos = localStorage.getItem('Minutos');
        minutos = JSON.parse(minutos);
        minuto = cantidad*data.t_preparacion; 
        minutos.push(minuto)
        localStorage.setItem('Minutos', JSON.stringify(minutos));

        var detalle = localStorage.getItem('Detalle');
        detalle = JSON.parse(detalle);
        detail = data.nombre+' x'+cantidad
        detalle.push(detail)
        localStorage.setItem('Detalle', JSON.stringify(detalle));
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

    console.log(totales.length)
    
    for (var i = 0; i < totales.length; i++) {
        console.log(totales[i])
        final = totales[i] + final  
    }

    document.getElementById('precio_total').innerHTML = '<span>Total a Pagar $</span>'+'<p id="total">'+final+'</p>'
    localStorage.removeItem('Totales')
}

function CalcularMinutos(){
    
    var minutos = localStorage.getItem('Minutos');
    minutos = JSON.parse(minutos)

    var final =  0 

    console.log(minutos.length)
    
    for (var i = 0; i < minutos.length; i++) {
        console.log(minutos[i])
        final = minutos[i] + final  
    }

    localStorage.setItem('Total_prep', final)
    localStorage.removeItem('Minutos')
}

function IniciarMesa(){

    var num_mesa = '' 
    localStorage.removeItem('Sesion_Mesa')
    var num_mesa = '' 
    num_mesa = document.getElementById('id_mesa').value


    localStorage.setItem('Sesion_Mesa', num_mesa)
    window.location.replace('http://127.0.0.1:8887/menu.html')

}

function Volver(){
    window.location.replace('http://127.0.0.1:8887/menu.html')
}

function AbrirOrdenes(){
    var ordenes = []
    ordenes = JSON.stringify(ordenes);
    localStorage.setItem('Ordenes_en_curso', ordenes)
}

function CrearOrden(){
    
    var token = localStorage.getItem("SavesToken", token) 
    var estado = 'PREPARACION'
    var detalle = localStorage.getItem("Detalle")
    detalle = JSON.parse(detalle)

    var detalle_final = ''

    for (var i = 0; i < detalle.length; i++) {
        console.log(detalle[i])
        detalle_final += detalle[i] + ','  
    }
    console.log(detalle_final)

    var total = document.getElementById('total').textContent
    console.log(total)
    total = parseInt(total)
    console.log(total)

    var minutos = localStorage.getItem('Total_prep')
    var mesa = localStorage.getItem('Sesion_Mesa')
    var ordenRecetas = localStorage.getItem('Recetas');
    ordenRecetas = JSON.parse(ordenRecetas);

    var datos = new FormData();
    datos.append("estado", estado);
    datos.append("detalle", detalle_final);
    datos.append("total", total);
    datos.append("minutos", minutos);
    datos.append("mesa", mesa);

    for (var i = 0; i < Object.keys(ordenRecetas).length; i++) {

        var num = ordenRecetas[Object.keys(ordenRecetas)[i]].numero
        console.log(num)
        datos.append("recetas", num);
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/api/orden/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        var ordenes = localStorage.getItem('Ordenes_en_curso');
        ordenes = JSON.parse(ordenes);
        ordenes.push(data.numero)
        localStorage.setItem('Ordenes_en_curso', JSON.stringify(ordenes));

        if(xhr.status >= 400){
            console.log("Error")
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            Push.create("Su Orden esta en camino",{
                body: "Recibimos su orden, en minutos llegara a su mesa",
                icon: "style/images/favicon.png",
                timeout: 8000,
                onClick: function(){                  
                    window.location.replace("http://127.0.0.1:8887/menu.html");
                    this.close();
                }
            });
        }

        localStorage.removeItem('Recetas')
        localStorage.removeItem('Detalle')
        localStorage.removeItem('Total_prep')
        
    }

    xhr.send(datos);

}