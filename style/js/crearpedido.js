//Agrega y arma un pedido con platos y cantidades, funcion se ejecuta cada vez que se añade un plato
function AgregarPedido(numero){

    //Crea un diccionario de objetos 
    var receta = new Object();
    receta.numero = numero
    receta.cantidad = 0

    var pedidoRecetas = localStorage.getItem('Recetas');
    pedidoRecetas = JSON.parse(pedidoRecetas);

    //Añade platos a pedido
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

    //Guarda el pedido en localstorage 
    localStorage.setItem('Recetas', JSON.stringify(pedidoRecetas));
}

//Lista el detalle del pedido actual antes de su confirmacion 
function ListarPedido(){

    document.getElementById('Resumen').innerHTML = ''
    var pedidoRecetas = localStorage.getItem('Recetas');
    pedidoRecetas = JSON.parse(pedidoRecetas);
    
    var num = ''
    var salida = ''
    
    //Crea variables para el calculo de total del pedido, tiempo de preparacion(minutos) y detalle del pedido
    var totales = []
    totales = JSON.stringify(totales);
    localStorage.setItem('Totales', totales)

    var minutos = []
    minutos = JSON.stringify(minutos);
    localStorage.setItem('Minutos', minutos)

    var detalle = []
    detalle = JSON.stringify(detalle);
    localStorage.setItem('Detalle', detalle)

    //Trae los datos por cada receta del pedido y según su cantidad
    for (var i = 0; i < Object.keys(pedidoRecetas).length; i++) {
        var num = ''
        num = pedidoRecetas[Object.keys(pedidoRecetas)[i]].numero
        cantidad = pedidoRecetas[Object.keys(pedidoRecetas)[i]].cantidad

        salida += EnviarPeticion(num, cantidad);
        console.log(salida)
    }

    //Invoca los metodos para el calculo de total de pago y total de tiempo de preparacion (minutos)
    setTimeout("CalcularTotal()", 500);
    setTimeout("CalcularMinutos()", 500);
}

//Solicita los datos de una receta a la API, según su numero de receta y cantidad
function EnviarPeticion(num, cantidad){

    //Trae Token de Autorización y Ajusta Parametros de la peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/receta/"+num+"/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        //Genera Botones para Eliminar un elemento del pedido
        var output = ''
        output += '<div class="plato"><span><strong>'+data.nombre+'</strong></span><button class="remove" type="button" onclick="EliminarElemento('+num+')">X</button><span class="price">Precio: '+data.precio+' c/u</span><span class="price">'+'<span class="price">Cantidad: '+cantidad+'</span><span class="price">'+'</span></div><hr/>'
        console.log(output)

        //Lista el precio del plato(Receta)
        var precio = data.precio
        document.getElementById('Resumen').innerHTML += output

        //Calcula el total por cantidad ded platos
        var  totales = localStorage.getItem('Totales');
        totales = JSON.parse(totales);
        total = cantidad*precio; 
        totales.push(total)
        localStorage.setItem('Totales', JSON.stringify(totales));

        //Calcula el tiempo de preparacion por cantidad de platos
        var minutos = localStorage.getItem('Minutos');
        minutos = JSON.parse(minutos);
        minuto = cantidad*data.t_preparacion; 
        minutos.push(minuto)
        localStorage.setItem('Minutos', JSON.stringify(minutos));

        //Genera detalle por cantidad de platos
        var detalle = localStorage.getItem('Detalle');
        detalle = JSON.parse(detalle);
        detail = data.nombre+' x'+cantidad
        detalle.push(detail)
        localStorage.setItem('Detalle', JSON.stringify(detalle));
    }

    xhr.send();
    
}

//Elimina un plato del pedido actual, recibe un numero de receta.
function EliminarElemento(num){

    var pedidoRecetas = localStorage.getItem('Recetas');
    pedidoRecetas = JSON.parse(pedidoRecetas);

    delete pedidoRecetas[num];

    localStorage.setItem('Recetas', JSON.stringify(pedidoRecetas));
    ListarPedido();
}

//Calcula el monto total de pago por la orden actual 
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

//Calcula el tiempo de preparacion (minutos) total de la orden 
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

//Permite ubicar la aplicacion en un mesa y asi pedir las ordenes desde esta
function IniciarMesa(){

    var num_mesa = '' 
    localStorage.removeItem('Sesion_Mesa')
    var num_mesa = '' 
    num_mesa = document.getElementById('id_mesa').value

    localStorage.setItem('Sesion_Mesa', num_mesa)
    window.location.replace('http://127.0.0.1:8887/menu.html')

}

//Vuelve al menu de platos
function Volver(){
    window.location.replace('http://127.0.0.1:8887/menu.html')
}

//Inicializa la variable para las ordenes cada vez que se inicia la aplicacion en una mesa en especifico
function AbrirOrdenes(){

    var ordenes = localStorage.getItem('Ordenes_en_curso')

    if(ordenes != undefined && ordenes != null){

    }
    else{
        var ordenes = []
        ordenes = JSON.stringify(ordenes);
        localStorage.setItem('Ordenes_en_curso', ordenes)
    }
}

//Crea la orden como tal, recogiendo los datos del pedido previamente armado
function CrearOrden(){
    
    //Trae Token de Autorización  
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

    //Reune los datos de la orden
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
    
    //Ajusta Parametros de la peticion
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/api/orden/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        //Añade la orden a las ordenes en curso de la mesa
        var ordenes = localStorage.getItem('Ordenes_en_curso');
        ordenes = JSON.parse(ordenes);
        ordenes.push(data.numero)
        localStorage.setItem('Ordenes_en_curso', JSON.stringify(ordenes));

        if(xhr.status >= 400){
            console.log("Error")
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            //Notifica al cliente que su orden fue ingresada exitosamente 
            Push.create("Su Orden esta en camino",{
                body: "Recibimos su orden, en minutos llegara a su mesa",
                icon: "style/images/favicon.png",
                timeout: 8000,
                onClick: function(){                  
                    window.location.replace("http://127.0.0.1:8887/menu.html");
                    this.close();
                }
            });
            window.location.replace("http://127.0.0.1:8887/menu.html");
        }

        //Limpia variables en caché
        localStorage.removeItem('Recetas')
        localStorage.removeItem('Detalle')
        localStorage.removeItem('Total_prep')
        
    }

    xhr.send(datos);

}