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