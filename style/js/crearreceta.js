//Crea un receta con los datos del formulario HTML
function CrearReceta(){
    //Recoge Datos del Formulario
    var nombre_receta = document.getElementById("nombre_receta").value
    var preparacion_receta = document.getElementById("preparacion_receta").value
    var grupo_receta = document.getElementById("grupo_receta").value
    var subgrupo_receta = document.getElementById("subgrupo_receta").value
    var precio_receta = document.getElementById("precio_receta").value
    var productos = document.getElementById("input_productos").value
    var productos_format = ''

    //Formatea productos seleccionados previamente 
    for (var i = 0; i < productos.length; i++) {
        if(i != (productos.length - 1)){
            productos_format += productos[i]
        }
    }

    var productos = productos_format.split(',').map(function(item) {
        return parseInt(item);
    });
    
    var token = localStorage.getItem("SavesToken", token) 
    
    var datos = new FormData();
    datos.append("nombre", nombre_receta);
    datos.append("t_preparacion", preparacion_receta);
    datos.append("grupo", grupo_receta);
    datos.append("sub_grupo", subgrupo_receta);
    datos.append("precio", precio_receta);

    for (var i = 0; i < productos.length; i++) {
        datos.append("productos", productos[i]);
    }
    

    //Trae Token de Autorización y Ajusta Parametros de la peticion
    var xhr = new XMLHttpRequest();
    var token = localStorage.getItem("SavesToken", token) 
    xhr.open("POST", "http://127.0.0.1:8000/api/receta/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;

        if(xhr.status >= 400){
            Push.create("La receta no pudo ser creada",{
                body: "Revise sus campos o ingrese ingredientes validos que esten registrado",
                icon: "style/images/favicon.png",
                timeout: 8000,
                onClick: function(){                  
                    this.close();
                }
            });
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            ListarProductos();
            Push.create("La receta se creó exitosamente",{
                body: "Su receta ya está en el sistema y se añadió al menú para clientes",
                icon: "style/images/favicon.png",
                timeout: 8000,
                onClick: function(){                  
                    this.close();
                }
            });
        }
    }

    xhr.send(datos);
}

//Permite seleccionar de manera rapida los ingredientes de la receta, añadiendo sus numeros al campo de ingredientes
function LlenarIngredientes(numero){

    var previo = document.getElementById('input_productos').value
    document.getElementById('input_productos').value = previo+numero+','
    
}