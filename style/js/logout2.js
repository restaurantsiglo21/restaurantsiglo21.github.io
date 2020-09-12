function Logout2(){
    console.log("Se deslogeo")

    var token = localStorage.getItem("SavesToken", token) 
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://apisiglo21food.pythonanywhere.com/api/logout/");
    xhr.setRequestHeader('Authorization', 'Token ' + token);

    xhr.send();
}