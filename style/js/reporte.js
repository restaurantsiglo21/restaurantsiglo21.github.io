//Genera y Descarga Reporte Financiero en formato PDF
function ReporteFinanciero() {
    //Trae Token de Autorizacion y ajusta parametros de peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/movimiento/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;

        var movimientos = []
        var objeto = {} 

        for (var i = 0; i < data.length; i++) {
            objeto = {
                numero: data[i].numero, 
                fecha: data[i].fecha,
                detalle: data[i].detalle,
                ingreso: data[i].ingreso,
                egreso: data[i].egreso,
                metodo: data[i].metodo,
            }
            movimientos.push(objeto)
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

        movimientos.sort(sortByProperty('numero')); 

        var ingreso_total = 0
        var egreso_total = 0
        var saldo_total = 0
        
        //Calcula Metricas de Reporte
        for (var i = 0; i < data.length; i++) {
            ingreso_total += movimientos[i].ingreso 
            egreso_total += movimientos[i].egreso 
        }

        saldo_total = ingreso_total - egreso_total

        //Crea elemento de tipo jsPDF
        var pdf = new jsPDF("p", "pt", "a1");
    
        source = $('#scrollbar')[0];

        specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        };

        margins = {
            top: 10,
            bottom: 10,
            left: 10,
            width: 500,
        };

        pdf.fromHTML(
        source, 
        margins.left, 
        margins.top, { 
            'width': margins.width, 
            'elementHandlers': specialElementHandlers
        },

        //Genera PDF y lo descarga
        function (dispose) {
            pdf.text(1300, 40, "RESUMEN FINANCIERO\n\nTotales Generales:\nIngreso Total: "+ingreso_total+"\n"+"Egreso Total: "+egreso_total+"\n"+"Saldo Final: "+saldo_total)
            
            pdf.save('Resumen_Financiero.pdf');
        }, margins);
    }

    xhr.send();
}

//Operaciones con tiempo y fecha
function Tiempo(){
    var d = new Date();

    '2020-10-10T23:47:46.026068-03:00'
    '2020-10-14T22:10:44.026068-03:00'

    var fecha = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'T'+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.026068-03:00'
    
    var cumpleanos = new Date(1995,11,17,3,24,0);
}

//Genera y Descarga Reporte de Platos Vendidos en formato PDF
function PlatosVendidos(){
    //Trae Token de Autorizacion y ajusta parametros de peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/receta/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;

        var numeros_recetas = []

        for (var i = 0; i < data.length; i++) {
            
            numeros_recetas.push(data[i].numero)
        }

        localStorage.setItem('Indices',JSON.stringify(numeros_recetas))

        //Trae Token de Autorizacion y ajusta parametros de segunda peticion
        var token = localStorage.getItem("SavesToken", token) 
        var http = new XMLHttpRequest();   
        http.open("GET", "http://127.0.0.1:8000/api/orden/");
        http.setRequestHeader('Authorization', 'Token ' + token);
        http.responseType = 'json'

        http.onload = () => {
            //Recoge la respuesta de la segunda peticion
            var data = http.response;

            var indices = localStorage.getItem('Indices')
            indices  = JSON.parse(indices)

            var contador = 0;
            var max = 0;
            var platos = []

            for (var i = 0; i < data.length; i++) {

                var recetas = ''
                recetas =  data[i].recetas

                for (var x = 0; x < recetas.length; x++) {
                    platos.push(recetas[x])
                }
            }


            var diccionario = []

            //Crea diccionario y asigna indices en base a la ID del arreglo
            for (var i = 0; i < platos.length; i++) {

                var plato = new Object();
                plato.numero = platos[i]
                plato.cantidad = 0

                if(diccionario != null || diccionario != undefined){
                    if(diccionario[plato.numero] == undefined || diccionario[plato.numero == platos[i]]){
                        diccionario = {
                            ...diccionario,
                            [plato.numero]: plato
                        }
                    }
                    diccionario[plato.numero].cantidad += 1
                }
                else{
                    plato.cantidad = 1
                    diccionario = {
                        [plato.numero]: plato
                    }
                }

                for (var  j= 0; j < indices.length; j++) {
                    max = indices[j]

                    if(indices[j] == platos[i]){
                        contador += 1;
                    }
                }
            }



            localStorage.setItem('Platos_Vendidos',JSON.stringify(diccionario))
            localStorage.setItem('Platos_Totales', contador)
        }

        http.send()

    }

    xhr.send()

    TiemposAtencion();
    ClientesAtendidos();
}

//Genera y Descarga Reporte de Atencion al Cliente en formato PDF
function ClientesAtendidos(){
    //Trae Token de Autorizacion y ajusta parametros de peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/movimiento/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;

        var contador = 0;

        for (var i = 0; i < data.length; i++) {

            if(data[i].detalle.includes('Pago Ordenes')){
                contador++;
            }
        }


        localStorage.setItem('Clientes_atendidos', contador)

        setTimeout("RenderPDF()", 800);
    }

    xhr.send()

}

//Genera Reporte de Tiempos de Atencion al Cliente
function TiemposAtencion(){
    //Trae Token de Autorizacion y ajusta parametros de peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/orden/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;

        var tiempos = []

        //Formatea tiempos de atencion
        for (var i = 0; i < data.length; i++) {
            
            var inicio = data[i].hora_ini 
            
            var anio = parseInt(inicio.substring(0, 4))
            var mes = parseInt(inicio.substring(5, 7)) -1
            var dia = parseInt(inicio.substring(8, 10))
            var horas = parseInt(inicio.substring(11, 13))
            var minutos = parseInt(inicio.substring(14, 16))
            var segundos = parseInt(inicio.substring(17, 19))

            var hora_inicio = new Date(anio,mes,dia,horas,minutos,segundos);

            var termino = data[i].hora_ter

            var anio = parseInt(termino.substring(0, 4))
            var mes = parseInt(termino.substring(5, 7)) -1
            var dia = parseInt(termino.substring(8, 10))
            var horas = parseInt(termino.substring(11, 13))
            var minutos = parseInt(termino.substring(14, 16))
            var segundos = parseInt(termino.substring(17, 19))

            var hora_termino = new Date(anio,mes,dia,horas,minutos,segundos);
            milisegundos = hora_termino - hora_inicio  
            tiempos.push(milisegundos)            
        }

        //Calcula Tiempos de Atencion
        var tiempo_calculado = []

        for (var i = 0; i < tiempos.length; i++) {
            
            var minutos_calculado = ((tiempos[i])/1000)
            
            tiempo_calculado.push(minutos_calculado)
        }


        var max = 0;
        var min = 99999999999999;
        var suma = 0;
        var media = 0;

        //Calcula mayor y menor tiempo de atencion
        for (var i = 0; i < tiempo_calculado.length; i++) {
            if(tiempo_calculado[i] > max){
                max = tiempo_calculado[i]
            }
            if(tiempo_calculado[i]< min){
                min = tiempo_calculado[i]
            }
            
            suma += tiempo_calculado[i]
        }

        media = suma/tiempo_calculado.length;

        var max_seg = 0
        max_seg = max % 60
        max = Math.trunc(max/60)

        var min_seg = 0
        

        if(min > 60){
            min_seg = max % 60
            min = Math.trunc(min/60)
        }
        

        localStorage.setItem('max',max)
        localStorage.setItem('max_seg',max_seg)
        localStorage.setItem('min',min)
        localStorage.setItem('min_seg',min_seg)
        localStorage.setItem('media',media)

    }

    xhr.send()

}

//Añade reporte de tiempos de atencion al cliente a Reporte de Atencion al Cliente
function RenderPDF(){
    //Trae Token de Autorizacion y ajusta parametros de peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/receta/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de peticion
        var data = xhr.response;

        var platos = localStorage.getItem('Platos_Vendidos')
        platos = JSON.parse(platos)
        var total_platos = localStorage.getItem('Platos_Totales')
        var total_clientes = localStorage.getItem('Clientes_atendidos')
        var min = localStorage.getItem('min')
        var min_seg = localStorage.getItem('min_seg')
        var max = localStorage.getItem('max')
        var max_seg = localStorage.getItem('max_seg')
        var media = localStorage.getItem('media')

        //Genera y formatea reporte
        var pdf = new jsPDF();
    
        pdf.setFontSize(12);
        pdf.text(20, 20, "RESUMEN ATENCION AL CLIENTE\n\nMetricas de Atencion:\n\nTotal de Platos Vendidos: "+total_platos+"\n"+"Total de Clientes atendidos: "+total_clientes+"\n\nPlato Mejor Vendido:")
        
        if(max_seg > 10){
            pdf.text(20, 83, "RESUMEN TIEMPOS DE ATENCION\n\nMayor tiempo de Atencion: "+max+":"+max_seg)
        }else{
            pdf.text(20, 83, "RESUMEN TIEMPOS DE ATENCION\n\nMayor tiempo de Atencion: "+max+":0"+max_seg)
        }

        if(min_seg > 10){
            pdf.text(20, 98, "Menor tiempo de Atencion: "+min+":"+min_seg+"\nMedia de Tiempo de Atencion(Segundos): "+media)
        }else{
            pdf.text(20, 98, "Menor tiempo de Atencion: "+min+":0"+min_seg+"\nMedia de Tiempo de Atencion(Segundos): "+media)
        }



        
        pdf.text(20, 113, "RESUMEN INDIVIDUAL DE PLATOS")
        
        var max = 0
        var max_cantidad = 0

        for (var i = 0; i < Object.keys(platos).length; i++) {

            var num = ''
            num = platos[Object.keys(platos)[i]].numero
            cantidad = platos[Object.keys(platos)[i]].cantidad

            if(cantidad > max_cantidad){
                max_cantidad = cantidad;
                max = num;
            }
            
            for (var j = 0; j <data.length; j++) {
                if(num == data[j].numero){
                    pdf.text("Nombre: "+data[j].nombre+"\nNumero: "+data[j].numero+"\nPrecio de venta: "+data[j].precio+"\nVendidos: "+cantidad, 20, 120 + 25*i)
                }
            }
        }

        
        for (var i = 0; i < data.length; i++) {
            if(max == data[i].numero)
            {
                pdf.text("Numero: "+data[i].numero+"\nNombre: "+data[i].nombre+"\nPrecio de venta: "+data[i].precio+"\nVendidos: "+max_cantidad, 20, 60)
            }
            
        }
        
        //Descarga reporte en formato PDF
        pdf.save('Resumen-Atencion_al_Cliente.pdf');

        //Limpia las todas las variables de calculo
        localStorage.removeItem('Indices')
        localStorage.removeItem('Platos_Vendidos')
        localStorage.removeItem('Platos_Totales')
        localStorage.removeItem('min')
        localStorage.removeItem('max')
        localStorage.removeItem('min_seg')
        localStorage.removeItem('max_seg')
        localStorage.removeItem('media')
    }

    xhr.send()
    
} 

