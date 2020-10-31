//Lista detalle del pago
function ListarPago(){
    var ordenes = localStorage.getItem('Ordenes_en_curso')
    ordenes = JSON.parse(ordenes)

    var total_pago = []
    total_pago = JSON.stringify(total_pago);
    localStorage.setItem('Total_Pago', total_pago)

    //Envia numeros de Orden
    for (var i = 0; i < ordenes.length; i++) {
        PedirOrden(ordenes[i])
    }

    //Calcula Total
    setTimeout("CalcularTotalPago()", 500);
}

//Solicita los datos de una orden en especifico según el numero de la Orden
function PedirOrden(numero){
    
    //Trae Token de Autorización y Ajusta Parametros de la peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/orden/"+numero+"/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);
        
        var output = ''
        var output2 = ''
        var res = ''
        var detalle = data.detalle    
        var detalle_format = ''    

        //Formatea campo Detalle
        for (var i = 0; i < detalle.length; i++) {
            if(i != (detalle.length - 1)){
                detalle_format += detalle[i]
            }
        }
        res = data.detalle.split(",");
        
        //Lista en HTML Ordenes con sus numeros 
        document.getElementById('Resumen').innerHTML += '<div class="plato" id="'+numero+'"><span><strong>Resumen Orden '+numero+'</strong></span></div>'

        var recetas = data.recetas;
        console.log(recetas)

        //Lista en HTML Ordenes con sus numeros 
        for (var i = 0; i < recetas.length; i++) {
            output = ''
            output += '<div class="plato"><span><strong>'+res[i]+'</strong></span><div class="Receta'+recetas[i]+'"></div></div>'
            document.getElementById(numero).innerHTML += output

            console.log(recetas[i])
            //Envia Numeros de Recetas
            PreciosUnitarios(recetas[i], recetas[i]);   
        }
        
        //Guarda Totales
        var total_pago = localStorage.getItem('Total_Pago');
        total_pago = JSON.parse(total_pago);
        total_pago.push(data.total)
        localStorage.setItem('Total_Pago', JSON.stringify(total_pago));

    }

    xhr.send();
}

//Calcula el total del Pago basandose en los Totales individuales previamente calculados
function CalcularTotalPago(){
    var totales = localStorage.getItem('Total_Pago');
    totales = JSON.parse(totales)

    var final =  0 

    console.log(totales.length)
    
    for (var i = 0; i < totales.length; i++) {
        console.log(totales[i])
        final = totales[i] + final  
    }

    //Escribe en HTML el Total del Pago
    document.getElementById('precio_total').innerHTML = '<span>Total a Pagar $</span>'+'<p id="total">'+final+'</p>'
    localStorage.removeItem('Total_Pago')
}

//Vuelve a la vista de menu
function Volver(){
    window.location.replace('http://127.0.0.1:8887/menu.html')
}

//Funcion Extra en caso de recibir un pago en efectivo, en linea o por una orden que no se llevo a cabo
function SinPago(){
    
    var ordenes = localStorage.getItem('Ordenes_en_curso')
    ordenes = JSON.parse(ordenes)
    
    for (var i = 0; i < ordenes.length; i++) {
        console.log(ordenes[i])
        CompletarFecha(ordenes[i])
    }

    //Notifica al uauario el no pago
    Push.create("Orden sin Pagar",{
        body: "El pago no se ha recibido y la Orden se ha cerrado sin un movimiento asociado",
        icon: "style/images/favicon.png",
        timeout: 8000,
        onClick: function(){                  
            this.close();
        }
    });

    setTimeout('RedireccionFinal()', 800)

}

//Lista los precios unitarios de las recetas que se pidieron en la mesa
function PreciosUnitarios(numero_receta, id_contenedor){
    //Trae Token de Autorización y Ajusta Parametros de la peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/receta/"+numero_receta+"/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        var output = ''

        output += '<span class="price unitario"><strong>Precio unitario: '+data.precio+'</strong></span><hr/>'

        var divs = document.getElementsByClassName("Receta"+id_contenedor)

        for (var i = 0; i < divs.length; i++) {
            divs[i].innerHTML = output;
        }
    }

    xhr.send();
}

//Crea un movimiento por el pago asociado a las ordenes de la mesa 
function Pagar(){

    var metodo = document.getElementById('metodo').value
    var total = document.getElementById('total').textContent
    var detalle = ''
    var ordenes = localStorage.getItem('Ordenes_en_curso')
    ordenes = JSON.parse(ordenes)
    
    detalle += 'Pago Ordenes '

    for (var i = 0; i < ordenes.length; i++) {
        detalle +=ordenes[i]+', '
    }

    var xhr = new XMLHttpRequest();
    var datos = new FormData();

    datos.append("ingreso", total)
    datos.append("egreso", 0)
    datos.append("metodo", metodo)
    datos.append("detalle", detalle)

    //Trae Token de Autorización y Ajusta Parametros de la peticion
    var token = localStorage.getItem("SavesToken", token) 
    xhr.open("POST", "http://127.0.0.1:8000/api/movimiento/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        if(xhr.status >= 400){
            console.log("Something went wrong!")
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            //Notifica al usuario el pago exitoso
            Push.create("Su pago fue Recibido, Gracias vuelva pronto",{
                body: "Gracias por preferirnos",
                icon: "style/images/favicon.png",
                timeout: 8000,
                onClick: function(){                  
                    this.close();
                }
            });      

            var ordenes = localStorage.getItem('Ordenes_en_curso')
            ordenes = JSON.parse(ordenes)

            //Envia numero de ordenes, numero de movimiento y metodo de pago
            for (var i = 0; i < ordenes.length; i++) {
                PagarOrdenes(ordenes[i], data.numero, data.metodo)
            }

            
            setTimeout("RedireccionFinal()", 1000)
        }
    }

    xhr.send(datos)
}

//Asocia el Pago Correspondiente a sus ordenes 
function PagarOrdenes(numero_orden, numero_movimiento, metodo_pago){

    //Trae Token de Autorización y Ajusta Parametros de la peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/orden/"+numero_orden+"/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        //Crea Peticion que actualiza los datos de las ordenes y asocia el pago
        var peticion = new XMLHttpRequest();
        var token = localStorage.getItem("SavesToken", token) 
        peticion.open("PUT", "http://127.0.0.1:8000/api/orden/"+numero_orden+"/editar_orden/");
        peticion.responseType = 'json'
        peticion.setRequestHeader('Authorization', 'Token ' + token);

        var d = new Date();
        var fecha = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'T'+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.026068-03:00'

        var datos = new FormData();
        datos.append("mesa", data.mesa)
        datos.append("movimiento", numero_movimiento)
        datos.append("hora_ter", fecha)

        var recetas = data.recetas

        for (var i = 0; i < recetas.length; i++) {
            datos.append("recetas", recetas[i]);
            console.log(recetas[i])
        }

        peticion.onload = () => {
            var data2 = peticion.response;
            console.log(data2);
        }
        
        peticion.send(datos);

        //Crea notificacion solicitando atencion en mesa para pago en efectivo
        //o de lo contrario notifica que el pago en linea fue recibido.
        var token = localStorage.getItem("SavesToken", token) 
        var http = new XMLHttpRequest();
        http.open("POST", "http://127.0.0.1:8000/api/notificacion/");
        http.setRequestHeader('Authorization', 'Token ' + token);
        http.responseType = 'json'

        var notificacion = new FormData()
        notificacion.append("estado", 'SIN_ATENCION')
        notificacion.append("mesa", data.mesa)

        if(metodo_pago == 'EFECTIVO'){
            notificacion.append("detalle", 'Solicita Pago en Efectivo')
        }else{
            notificacion.append("detalle", 'El Pago en Linea fue recibido')
        }

        http.onload = () => {
            //Recoge la respuesta de la peticion
            var data = xhr.response;
            console.log(data);
        }
        
        http.send(notificacion)

    }

    xhr.send();
}

//Da por cerrada una orden añadiendo la fecha y hora de su termino 
function CompletarFecha(numero){

    //Trae Token de Autorización y Ajusta Parametros de la peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/orden/"+numero+"/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        //Edita la orden correspondiente con su fecha de termino
        var token = localStorage.getItem("SavesToken", token) 
        var http = new XMLHttpRequest();  
        http.open("PUT", "http://127.0.0.1:8000/api/orden/"+numero+"/editar_orden/");
        http.setRequestHeader('Authorization', 'Token ' + token);
        http.responseType = 'json'

        var d = new Date();
        var fecha = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'T'+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.026068-03:00'

        var datos = new FormData();
        datos.append("mesa", data.mesa)
        datos.append("hora_ter", fecha)

        var recetas = data.recetas

        for (var i = 0; i < recetas.length; i++) {
            datos.append("recetas", recetas[i]);
        }

        http.onload = () => {
            var data = http.response;
            console.log(data);
        }

        http.send(datos)
    }

    xhr.send()
}

//Limpia las ordenes en curso y reestablece la aplicacion para volver a pedir platos y recetas desde el menu
function RedireccionFinal(){
    GenerarBoleta();
    localStorage.removeItem('Ordenes_en_curso')
    window.location.replace("http://127.0.0.1:8887/menu.html");
}

function GenerarBoleta(){

    var main = document.getElementById('main')
    var boton_menu = document.getElementById('boton_menu')
    var confirmacion = document.getElementById('confirmacion')
    var volver = document.getElementById('volver')
    
    main.style.maxWidth = "100%"
    main.style.marginLeft = "0px"
    boton_menu.style.display = "none"
    confirmacion.style.display = "none"
    volver.style.display = "none"
    window.print()
}