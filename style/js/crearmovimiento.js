function CrearMovimiento(){

    var formulario = document.getElementById("movimiento_form")
    var ingreso = document.getElementById("ingreso_movimiento").value
    var egreso = document.getElementById("egreso_movimiento").value

    var token = localStorage.getItem("SavesToken", token) 
    var datos = new FormData(formulario);
    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", "http://127.0.0.1:8000/api/movimiento/");

    xhr.setRequestHeader('Authorization', 'Token ' + token);
    xhr.responseType = 'json'

    xhr.onload = () => {
        var data = xhr.response;
        console.log(data);

        if(xhr.status >= 400){
            document.getElementById("alerta").innerHTML = "Complete todos los campos!!!"
        }
        if(xhr.status == 201 || xhr.status == 200 ){
            ListarMovimientos();
        }
    }
    
    if(ingreso != 0 && egreso != 0){
        document.getElementById("alerta_2").innerHTML = "No puede ingresar y egresar la vez!"
    }
    if((ingreso != 0 && egreso == 0)||(ingreso == 0 && egreso != 0)){
        xhr.send(datos);
    }
}
