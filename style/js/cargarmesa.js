//Carga las mesas y sus estados, para que a traves del CSS se cargen de un color u otro dependido de su estado 

//Trae Token de Autorización y Ajusta Parametros de la peticion
var token = localStorage.getItem("SavesToken", token) 
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://127.0.0.1:8000/api/mesa/");
xhr.responseType = 'json'
xhr.setRequestHeader('Authorization', 'Token ' + token);

xhr.onload = () => {
    //Recoge la respuesta de la peticion
    var data = xhr.response;
    console.log(data);

    //Lista mesas segun disponibilidad
    for (var i = 0; i < data.length; i++) {
        if(data[i].disponibilidad == "DISPONIBLE"){
            document.getElementById("mesa"+data[i].numero).style.background='#008000'
        }
    }
    for (var i = 0; i < data.length; i++) {
        if(data[i].disponibilidad == "OCUPADA"){
            document.getElementById("mesa"+data[i].numero).style.background='#FF0000'
        }
    }
    for (var i = 0; i < data.length; i++) {
        if(data[i].disponibilidad == "RESERVADA"){
            document.getElementById("mesa"+data[i].numero).style.background='#FFFF00'
        }
    }
}

//Envia Peticion
xhr.send()

//Muestra el Contenido de la pagina segun el grupo al que pertenece al usuario previemente autentificado
function Mostrar(){
    var grupos = localStorage.getItem('Grupos')
    var formularios = document.getElementById('contenido')
    grupos = JSON.parse(grupos)
    
    for (var i = 0; i < grupos.length; i++) {
        if(grupos[i] == 3 || grupos[i] == 2){
            formularios.style.display = "block"
        }
    }
}