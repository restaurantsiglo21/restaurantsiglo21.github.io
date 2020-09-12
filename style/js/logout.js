function Logout(){
    console.log("Se deslogeo")

    var token = localStorage.getItem("SavesToken", token)
    console.log(token)

    localStorage.getItem("SavesToken", token)
    localStorage.removeItem("SavesToken")

    var token2 = localStorage.getItem("SavesToken", token)
    console.log(token2)

}


