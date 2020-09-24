function Logout2(){
    console.log("Se deslogeo")

    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://127.0.0.1:8000/api/logout/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);

    xhr.send();

    localStorage.removeItem("SavesToken")
}