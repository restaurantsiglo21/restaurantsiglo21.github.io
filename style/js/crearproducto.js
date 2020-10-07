function CrearProducto(){
    
    var formulario = document.getElementById("productoform")
    var token = localStorage.getItem("SavesToken", token) 
    var datos = new FormData(formulario);
    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", "http://127.0.0.1:8000/api/producto/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        if(xhr.status >= 400){
            document.getElementById("alerta").innerHTML = "Complete todos los campos!!!"
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            ListarProductos();
        }
    }

    xhr.send(datos);
}

function LlenarCampos(n_producto){
    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();
        
    xhr.open("GET", "http://127.0.0.1:8000/api/producto/"+n_producto+"/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

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

function ModificarStock(){
    
    var token = localStorage.getItem("SavesToken", token) 
    var n_producto = localStorage.getItem("ProductoModificable", n_producto)
    var stock = document.getElementById("stock_producto").value

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://127.0.0.1:8000/api/producto/"+n_producto+"/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        var datos = new FormData();
        datos.append("numero", n_producto);
        datos.append("nombre", data.nombre);
        datos.append("stock", stock);
        datos.append("embalaje", data.embalaje);
        datos.append("detalle", data.detalle);

        var peticion = new XMLHttpRequest();
        peticion.open("PUT", "http://127.0.0.1:8000/api/producto/"+n_producto+"/editar_producto/");

        peticion.setRequestHeader('Authorization', 'Token ' + token);
        peticion.responseType = 'json'

        peticion.onload = () => {
            var data2 = peticion.response;
            console.log(data2);
            ListarProductos();
        }

        peticion.send(datos)
    }

    xhr.send()
}
