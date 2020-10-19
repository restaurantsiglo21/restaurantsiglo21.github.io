function ListarPago(){
    var ordenes = localStorage.getItem('Ordenes_en_curso')
    ordenes = JSON.parse(ordenes)

    console.log(ordenes)

    var total_pago = []
    total_pago = JSON.stringify(total_pago);
    localStorage.setItem('Total_Pago', total_pago)

    for (var i = 0; i < ordenes.length; i++) {
        PedirOrden(ordenes[i])
    }

    setTimeout("CalcularTotalPago()", 500);
}

function PedirOrden(numero){
    
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    

    xhr.open("GET", "http://127.0.0.1:8000/api/orden/"+numero+"/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);
    
        var output = ''
        var output2 = ''
        var res = ''
        var detalle = data.detalle    
        var detalle_format = ''    

        for (var i = 0; i < detalle.length; i++) {
            if(i != (detalle.length - 1)){
                detalle_format += detalle[i]
            }
        }

        res = data.detalle.split(",");

        document.getElementById('Resumen').innerHTML += '<div class="plato" id="'+numero+'"><span><strong>Resumen Orden '+numero+'</strong></span></div>'

        var recetas = data.recetas;
        console.log(recetas)

        for (var i = 0; i < recetas.length; i++) {
            output = ''
            output += '<div class="plato"><span><strong>'+res[i]+'</strong></span><div class="Receta'+recetas[i]+'"></div></div>'
            document.getElementById(numero).innerHTML += output

            console.log(recetas[i])
            PreciosUnitarios(recetas[i], recetas[i]);   
        }
        
        var total_pago = localStorage.getItem('Total_Pago');
        total_pago = JSON.parse(total_pago);
        total_pago.push(data.total)
        localStorage.setItem('Total_Pago', JSON.stringify(total_pago));

    }

    xhr.send();
}

function CalcularTotalPago(){
    var totales = localStorage.getItem('Total_Pago');
    totales = JSON.parse(totales)

    var final =  0 

    console.log(totales.length)
    
    for (var i = 0; i < totales.length; i++) {
        console.log(totales[i])
        final = totales[i] + final  
    }

    document.getElementById('precio_total').innerHTML = '<span>Total a Pagar $</span>'+'<p id="total">'+final+'</p>'
    localStorage.removeItem('Total_Pago')
}

function Volver(){
    window.location.replace('http://127.0.0.1:8887/menu.html')
}

function SinPago(){
    
    var ordenes = localStorage.getItem('Ordenes_en_curso')
    ordenes = JSON.parse(ordenes)
    
    for (var i = 0; i < ordenes.length; i++) {
        console.log(ordenes[i])
        CompletarFecha(ordenes[i])
    }

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

function PreciosUnitarios(numero_receta, id_contenedor){
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", "http://127.0.0.1:8000/api/receta/"+numero_receta+"/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
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

function Pagar(){
    var metodo = document.getElementById('metodo').value
    var total = document.getElementById('total').textContent
    var token = localStorage.getItem("SavesToken", token) 
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
    
    xhr.open("POST", "http://127.0.0.1:8000/api/movimiento/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        if(xhr.status >= 400){
            console.log("Something went wrong!")
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            
            Push.create("Su pago fue Recibido, Gracias vuelvas prontos",{
                body: "Gracias por preferirnos",
                icon: "style/images/favicon.png",
                timeout: 8000,
                onClick: function(){                  
                    this.close();
                }
            });

            var ordenes = localStorage.getItem('Ordenes_en_curso')
            ordenes = JSON.parse(ordenes)
            
            for (var i = 0; i < ordenes.length; i++) {
                PagarOrdenes(ordenes[i], data.numero)
            }

            setTimeout("RedireccionFinal()", 1000)
        }
    }

    xhr.send(datos)
}

function PagarOrdenes(numero_orden, numero_movimiento){

    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", "http://127.0.0.1:8000/api/orden/"+numero_orden+"/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        var peticion = new XMLHttpRequest();
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
        
    }

    xhr.send();
}

function CompletarFecha(numero){

    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", "http://127.0.0.1:8000/api/orden/"+numero+"/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

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


function RedireccionFinal(){
    localStorage.removeItem('Ordenes_en_curso')
    window.location.replace("http://127.0.0.1:8887/menu.html");
}