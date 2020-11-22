const bodegaform = document.getElementsByClassName("form");
const inputs = document.querySelectorAll("form input");
const alerta = document.getElementById("alerta");

const expresiones = {
    numero: /^\d/,
  };
  
  const validarFormulario = (e) => {
    switch (e.target.id) {
        //Validacion producto
      case "id_mesa":
        if (expresiones.numero.test(e.target.value)) {
          document
            .getElementById("numMesaIn")
            .classList.remove("formError");
        //   document
        //     .getElementById("numMesaIn")
        //     .classList.add("formCorrect");
          alerta.innerHTML = ``;
        } else {
          document
            .getElementById("numMesaIn")
            .classList.add("formError");
          document
            .getElementById("numMesaIn")
            .classList.remove("formCorrect");
          alerta.innerHTML = `Por favor ingresar un numero de mesa valido`;
        }
        break;

}
}
inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
input.addEventListener("blur", validarFormulario);
});