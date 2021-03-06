const bodegaform = document.getElementsByClassName("form");
const inputs = document.querySelectorAll("form input");
const alerta = document.getElementById("alerta");

const expresiones = {
    numero: /^\d/,
  };
  
  const validarFormulario = (e) => {
    switch (e.target.id) {
        //Validacion producto
      case "n_orden":
        if (expresiones.numero.test(e.target.value)) {
          document
            .getElementById("ordenIn")
            .classList.remove("formError");
          document
            .getElementById("ordenIn")
            .classList.add("formCorrect");
          alerta.innerHTML = ``;
        } else {
          document
            .getElementById("ordenIn")
            .classList.add("formError");
          document
            .getElementById("ordenIn")
            .classList.remove("formCorrect");
          alerta.innerHTML = `Este campo solo acepta numeros`;
        }
        break;

}
}
inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
input.addEventListener("blur", validarFormulario);
});
