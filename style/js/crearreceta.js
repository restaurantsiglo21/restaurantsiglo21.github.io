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
    console.log(productos_format)

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
    
    console.log(productos)
    console.log(datos.productos)

    //Trae Token de Autorización y Ajusta Parametros de la peticion
    var xhr = new XMLHttpRequest();
    var token = localStorage.getItem("SavesToken", token) 
    xhr.open("POST", "http://127.0.0.1:8000/api/receta/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        if(xhr.status >= 400){
            document.getElementById("alerta_2").innerHTML = "Complete todos los campos!!!"
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            ListarProductos();
        }
    }

    xhr.send(datos);
}

//Permite seleccionar de manera rapida los ingredientes de la receta, añadiendo sus numeros al campo de ingredientes
function LlenarIngredientes(numero){

    var previo = document.getElementById('input_productos').value
    document.getElementById('input_productos').value = previo+numero+','
    
}