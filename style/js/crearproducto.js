//Crea un Producto de acuerdo a lois ddatos ungresados en la vista de bodega 
function CrearProducto(){
    
    //Trae Token de Autorización y Datos del Formulario 
    var formulario = document.getElementById("productoform")
    var token = localStorage.getItem("SavesToken", token) 
    var datos = new FormData(formulario);
    var xhr = new XMLHttpRequest();
    
    //Ajusta Parametros de la peticion
    xhr.open("POST", "http://127.0.0.1:8000/api/producto/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        //Valida el envio de todos los datos solicitados
        if(xhr.status >= 400){
            
            Push.create("El producto no pudo ser creado",{
                body: "Revise sus campos o ingrese un movimiento válido que este registrado",
                icon: "style/images/favicon.png",
                timeout: 8000,
                onClick: function(){                  
                    this.close();
                }
            });    
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            ListarProductos();
            Push.create("El producto se creó exitosamente",{
                body: "Su producto ya está en el sistema y se añadió al inventario",
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

//Permite el autocompletado automatico en los campos de ingreso de los datos de un producto
function LlenarCampos(n_producto){

    //Trae Token de Autorización y Ajusta Parametros de la peticion
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/producto/"+n_producto+"/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        //Llena los campos con la informacion del producto
        document.getElementById('nombre_producto').value = data.nombre
        document.getElementById('costo_producto').value = data.costo
        document.getElementById('stock_producto').value = data.stock
        document.getElementById('embalaje_producto').value = data.embalaje
        document.getElementById('detalle_producto').value = data.detalle

        localStorage.setItem("ProductoModificable", '')
        localStorage.setItem("ProductoModificable", n_producto)
    }

    xhr.send()
}

//Modifica el stock de un producto previamente seleccionado con los datos del formulario
function ModificarStock(){
    //Trae Token de Autorización 
    var token = localStorage.getItem("SavesToken", token) 
    var n_producto = localStorage.getItem("ProductoModificable", n_producto)
    var stock = document.getElementById("stock_producto").value

    //Ajusta Parametros de la peticion
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/producto/"+n_producto+"/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        //Recoge la respuesta de la peticion
        var data = xhr.response;
        console.log(data);

        //Recoge los datos para modificar el producto 
        var datos = new FormData();
        datos.append("numero", n_producto);
        datos.append("nombre", data.nombre);
        datos.append("stock", stock);
        datos.append("embalaje", data.embalaje);
        datos.append("detalle", data.detalle);

        //Trae Token de Autorización y Ajusta Parametros de la peticion
        var peticion = new XMLHttpRequest();
        var token = localStorage.getItem("SavesToken", token) 
        peticion.open("PUT", "http://127.0.0.1:8000/api/producto/"+n_producto+"/editar_producto/");
        peticion.setRequestHeader('Authorization', 'Token ' + token);
        peticion.responseType = 'json'

        peticion.onload = () => {
            //Recoge la respuesta de la peticion
            var data2 = peticion.response;
            console.log(data2);
            ListarProductos();
        }

        peticion.send(datos)
    }

    xhr.send()
}
