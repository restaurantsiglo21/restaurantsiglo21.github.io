//Trae un listado de productos presentes en la API para su despliegue en una tabla en HTML
function ListarRecetas(){
    //Trae Token de Autorizacion y ajusta parametros de peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/receta/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;

        var recetas = []
        var objeto = {} 

        for (var i = 0; i < data.length; i++) {
            objeto = {
                numero: data[i].numero, 
                nombre: data[i].nombre,
                t_preparacion: data[i].t_preparacion,
                precio: data[i].precio,
                grupo: data[i].grupo,
                sub_grupo: data[i].sub_grupo,
                productos: data[i].productos
            }
            recetas.push(objeto)
        }


        //Ordena los elementos de un arreglo de menor a mayor
        function sortByProperty(property){  
            return function(a,b){  
            if(a[property] > b[property])  
                return 1;  
            else if(a[property] < b[property])  
                return -1;  
        
            return 0;  
            }  
        }

        recetas.sort(sortByProperty('nombre')); 

        var output = '';

        var sopas = '';        
        var cremas = '';
        var empanadas = '';
        var carnes_rojas = '';
        var carnes_blancas = '';
        var pescados = '';
        var mariscos = '';
        var caldos = '';
        var legumbres = '';
        var pasteles = '';
        var embutidos = '';
        var aperitivo = '';
        var agregado = '';
        var vinos = '';
        var bebidas = '';
        var jugos = '';
        var bajativo = '';
        var helados = '';
        var tortas = '';
        var kuchen = '';

        //Genera Menú en HTML y asigna categoria en base a grupo y subgrupo del plato
        for (var i = 0; i < recetas.length; i++) {

            if(recetas[i].grupo == 'ENTRADA'){
                if(recetas[i].sub_grupo == 'SOPAS'){
                    sopas += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Sopas').innerHTML = sopas
                } 
                if(recetas[i].sub_grupo == 'CREMAS'){
                    cremas += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Cremas').innerHTML = cremas
                }
                if(recetas[i].sub_grupo == 'EMPANADAS'){
                    empanadas += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Empanadas').innerHTML = empanadas
                }              
            }
            if(recetas[i].grupo == 'PLATO_FONDO'){
                if(recetas[i].sub_grupo == 'CARNES_ROJAS'){
                    carnes_rojas += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Carnes_Rojas').innerHTML = carnes_rojas
                } 
                if(recetas[i].sub_grupo == 'CARNES_BLANCAS'){
                    carnes_blancas += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Carnes_Blancas').innerHTML = carnes_blancas
                }  
                if(recetas[i].sub_grupo == 'PESCADOS'){
                    pescados += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Pescados').innerHTML = pescados
                }
                if(recetas[i].sub_grupo == 'MARISCOS'){
                    mariscos += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Mariscos').innerHTML = mariscos
                }
                if(recetas[i].sub_grupo == 'CALDOS'){
                    caldos += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Caldos').innerHTML = caldos
                }
                if(recetas[i].sub_grupo == 'LEGUMBRES'){
                    legumbres += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Legumbres').innerHTML = legumbres
                }   
                if(recetas[i].sub_grupo == 'PASTELES'){
                    pasteles += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Pasteles').innerHTML = pasteles
                }  
                if(recetas[i].sub_grupo == 'EMBUTIDOS'){
                    embutidos += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Embutidos').innerHTML = embutidos
                }           
            }
            if(recetas[i].grupo == 'APERITIVO'){
                aperitivo += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                document.getElementById('Aperitivos').innerHTML = aperitivo
            }
            if(recetas[i].grupo == 'AGREGADO'){
                agregado += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                document.getElementById('Agregados').innerHTML = agregado
            }
            if(recetas[i].grupo == 'BEBESTIBLE'){
                if(recetas[i].sub_grupo == 'VINOS'){
                    vinos += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Vinos').innerHTML = vinos
                } 
                if(recetas[i].sub_grupo == 'BEBIDAS'){
                    bebidas += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Bebidas').innerHTML = bebidas
                }
                if(recetas[i].sub_grupo == 'JUGOS'){
                    jugos += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Jugos').innerHTML = jugos
                }   
                if(recetas[i].sub_grupo == 'BAJATIVO'){
                    bajativo += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Bajativos').innerHTML = bajativo
                }           
            }
            if(recetas[i].grupo == 'POSTRE'){
                if(recetas[i].sub_grupo == 'HELADOS'){
                    helados += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Helados').innerHTML = helados
                } 
                if(recetas[i].sub_grupo == 'TORTAS'){
                    tortas += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price" >'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Tortas').innerHTML = tortas
                }
                if(recetas[i].sub_grupo == 'KUCHENS'){
                    kuchen += '<div class="plato"><span class="labels"><strong>'+recetas[i].nombre+'</strong></span><button class="add" type="button" onclick="AgregarPedido('+recetas[i].numero+')">Agregar</button><span class="price">'+'$'+recetas[i].precio+' c/u</span></div><hr>'     
                    document.getElementById('Kuchen').innerHTML = kuchen
                }          
            }

        }
    }

    xhr.send();
}

//Notifica a usuario que se esta enviando una orden vacia
function Redirect(){

    var pedido = localStorage.getItem('Recetas')

    if(pedido != undefined && pedido != null){
        window.location.replace("http://127.0.0.1:8887/confirmacion.html")
    }
    else{
        Push.create("Porfavor, Indiquenos su Pedido",{
            body: "Ingrese Platos o Bebestibles a su pedido",
            icon: "style/images/favicon.png",
            timeout: 8000,
            onClick: function(){                  
                this.close();
            }
        });
    }
    
}

//Muestra el contenido del HTML en base al grupo del usuario
function Mostrar(){
    var grupos = localStorage.getItem('Grupos')
    var formularios = document.getElementById('contenido')
    grupos = JSON.parse(grupos)
    
    for (var i = 0; i < grupos.length; i++) {
        if(grupos[i] == 3 || grupos[i] == 6){
            formularios.style.display = "block"
        }
    }
}