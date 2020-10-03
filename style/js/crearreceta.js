var formulario = document.getElementById("recetaform")

function CrearReceta(){

    var token = localStorage.getItem("SavesToken", token) 
    var datos = new FormData(formulario);
    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", "http://127.0.0.1:8000/api/receta/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
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

function LlenarIngredientes(numero){

    var previo = document.getElementById('input_ingredientes').value
    document.getElementById('input_ingredientes').value = previo+numero+','
    
}