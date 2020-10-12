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

        document.getElementById('Resumen').innerHTML += '<div class="plato"><span><strong>Resumen Orden '+numero+'</strong></span></div><hr/>'

        var recetas = data.recetas;
        console.log(recetas)

        for (var i = 0; i < recetas.length; i++) {
            output = ''
            output += '<div class="plato" id="'+recetas[i]+'"><span><strong>'+res[i]+'</strong></span></div><hr/>'
            document.getElementById('Resumen').innerHTML += output

            console.log(recetas[i])
            PreciosUnitarios(recetas[i]);   
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

function PreciosUnitarios(numero){
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", "http://127.0.0.1:8000/api/receta/"+numero+"/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        var output = ''

        output += '<span class="price"><strong>Precio unitario: '+data.precio+'</strong></span><hr/>'
        document.getElementById(numero).innerHTML += output
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
            localStorage.removeItem('Ordenes_en_curso')
            Push.create("Su pago fue Recibido, Gracias vuelvas prontos",{
                body: "Gracias por preferirnos",
                icon: "style/images/favicon.png",
                timeout: 8000,
                onClick: function(){                  
                    this.close();
                }
            });
            window.location.replace("http://127.0.0.1:8887/menu.html")
        }
    }

    xhr.send(datos);
}


