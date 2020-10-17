function ReporteFinanciero() {

    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
        
    xhr.open("GET", "http://127.0.0.1:8000/api/movimiento/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

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

        console.log(movimientos);

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
        console.log(movimientos);

        var ingreso_total = 0
        var egreso_total = 0
        var saldo_total = 0
        
        for (var i = 0; i < data.length; i++) {
            ingreso_total += movimientos[i].ingreso 
            egreso_total += movimientos[i].egreso 
        }

        saldo_total = ingreso_total - egreso_total

        var pdf = new jsPDF("p", "pt", "a2");
    
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        source = $('#scrollbar')[0];

        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.
        specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };

        margins = {
            top: 10,
            bottom: 10,
            left: 10,
            width: 500,
        };

        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, { // y coord
            'width': margins.width, // max width of content on PDF
            'elementHandlers': specialElementHandlers
        },

        function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF 
            //          this allow the insertion of new lines after html
            pdf.text(920, 40, "RESUMEN FINANCIERO\n\nTotales Generales:\nIngreso Total: "+ingreso_total+"\n"+"Egreso Total: "+egreso_total+"\n"+"Saldo Final: "+saldo_total)
            
            pdf.save('Resumen_Financiero.pdf');
        }, margins);
    }

    xhr.send();
}

function prueba(){
   
    var pdf = new jsPDF("p", "pt", "a2");
    
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('#scrollbar')[0];

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };

    margins = {
        top: 10,
        bottom: 10,
        left: 10,
        width: 500,
    };

    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top, { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
    },

    function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.text(920, 40, "RESUMEN FINANCIERO\n\nTotales Generales:")
        
        pdf.save('Test.pdf');
    }, margins);
    
}

function Tiempo(){
    var d = new Date();
    console.log(d.getDate());
    console.log(d.getMonth())
    console.log(d.getFullYear())

    console.log(d.getHours());
    console.log(d.getMinutes())
    console.log(d.getSeconds())

    console.log(d.getTime())
    console.log(d.getTimezoneOffset())
    console.log(d.getUTCHours())

    '2020-10-10T23:47:46.026068-03:00'
    '2020-10-14T22:10:44.026068-03:00'

    var fecha = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'T'+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'.026068-03:00'
    console.log(fecha)
}

function PlatosVendidos(){

    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
        
    xhr.open("GET", "http://127.0.0.1:8000/api/receta/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data); 

        var numeros_recetas = []

        for (var i = 0; i < data.length; i++) {
            
            numeros_recetas.push(data[i].numero)
        }

        localStorage.setItem('Indices',JSON.stringify(numeros_recetas))


        var token = localStorage.getItem("SavesToken", token) 
        var http = new XMLHttpRequest();   
        http.open("GET", "http://127.0.0.1:8000/api/orden/");
        http.setRequestHeader('Authorization', 'Token ' + token);
        http.responseType = 'json'

        http.onload = () => {
            var data = http.response;
            console.log(data);

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

            console.log(platos)

            var diccionario = []

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


            console.log(diccionario)
            console.log(contador)

            localStorage.setItem('Platos_Vendidos',JSON.stringify(diccionario))
            localStorage.setItem('Platos_Totales', contador)
        }

        http.send()

    }

    xhr.send()

    ClientesAtendidos();
}

function ClientesAtendidos(){
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
        
    xhr.open("GET", "http://127.0.0.1:8000/api/movimiento/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data); 

        var contador = 0;

        for (var i = 0; i < data.length; i++) {

            if(data[i].detalle.includes('Pago Ordenes')){
                contador++;
            }
        }

        console.log(contador)

        localStorage.setItem('Clientes_atendidos', contador)

        RenderPDF();
    }

    xhr.send()

}

function RenderPDF(){

    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
        
    xhr.open("GET", "http://127.0.0.1:8000/api/receta/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        var platos = localStorage.getItem('Platos_Vendidos')
        platos = JSON.parse(platos)
        var total_platos = localStorage.getItem('Platos_Totales')
        var total_clientes = localStorage.getItem('Clientes_atendidos')
        var pdf = new jsPDF();
    
        pdf.setFontSize(12);
        pdf.text(20, 20, "RESUMEN ATENCION AL CLIENTE\n\nMetricas de Atencion:\n\nTotal de Platos Vendidos: "+total_platos+"\n"+"Total de Clientes atendidos: "+total_clientes+"\n\nPlato Mejor Vendido:")
        pdf.text(20, 83, "RESUMEN INDIVIDUAL DE PLATOS")
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
                    pdf.text("Nombre: "+data[j].nombre+"\nNumero: "+data[j].numero+"\nPrecio de venta: "+data[j].precio+"\nVendidos: "+cantidad, 20, 90 + 25*i)
                }
            }
        }

        
        for (var i = 0; i < data.length; i++) {
            if(max == data[i].numero)
            {
                pdf.text("Numero: "+data[i].numero+"\nNombre: "+data[i].nombre+"\nPrecio de venta: "+data[i].precio+"\nVendidos: "+max_cantidad, 20, 60)
            }
            
        }
        
        pdf.save('Resumen-Atencion_al_Cliente.pdf');
    }

    xhr.send()

    

    
} 

function DetallesPlato(num){
    
}