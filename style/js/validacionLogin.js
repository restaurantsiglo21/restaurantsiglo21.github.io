const bodegaform = document.getElementsByClassName("form");
const inputs = document.querySelectorAll("form input");
const alerta = document.getElementById("alerta");

const expresiones = {
    nombre: /^[A-Za-z][A-Za-z0-9]*$/,
    numero: /^\d/,
  };
  
  const validarFormulario = (e) => {
    switch (e.target.id) {
        //Validacion producto
      case "id_usuario":
        if (expresiones.nombre.test(e.target.value)) {
          document
            .getElementById("userIn")
            .classList.remove("formError");
        //   document
        //     .getElementById("userIn")
        //     .classList.add("formCorrect");
          alerta.innerHTML = ``;
        } else {
          document
            .getElementById("userIn")
            .classList.add("formError");
          document
            .getElementById("userIn")
            .classList.remove("formCorrect");
          alerta.innerHTML = `Por favor ingresar un usuario valido`;
        }
        break;

}
}
inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
input.addEventListener("blur", validarFormulario);
});

