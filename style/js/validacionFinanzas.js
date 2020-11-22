const bodegaform = document.getElementsByClassName("form");
const inputs = document.querySelectorAll("form input");
const alerta = document.getElementById("alerta");
const alerta2 = document.getElementById("alerta2");

const expresiones = {
  nombre: /^[a-zA-Z0-9\_\-\s\.]{1,25}$/,
  numero: /^\d/,
};

const validarFormulario = (e) => {
  switch (e.target.id) {
	  //Validacion detalle
    case "detalle_movimiento":
      if (expresiones.nombre.test(e.target.value)) {
        document
          .getElementById("container-detaller")
          .classList.remove("formError");
        document
          .getElementById("container-detaller")
          .classList.add("formCorrect");
        alerta.innerHTML = ``;
      } else {
        document
          .getElementById("container-detaller")
          .classList.add("formError");
        document
          .getElementById("container-detaller")
          .classList.remove("formCorrect");
        alerta.innerHTML = `Debe ingresar un detalle válido`;
      }
	  break;
	  //Fin validacion detalle
	  //-----------------------------------------º-----------------------------------------
	  //Validacion engreso movimiento
	  case "egreso_movimiento": 
		if (expresiones.numero.test(e.target.value)) {
			document
			  .getElementById("container-egmovimiento")
			  .classList.remove("formError");
			document
			  .getElementById("container-egmovimiento")
			  .classList.add("formCorrect");
			alerta.innerHTML = ``;
		  } else {
			document
			  .getElementById("container-egmovimiento")
			  .classList.add("formError");
			document
			  .getElementById("container-egmovimiento")
			  .classList.remove("formCorrect");
			alerta.innerHTML = `Debe ingresar un egreso valido`;
		  }
	  break;
	  //Fin validacion costo
	  //-----------------------------------------º-----------------------------------------
	  //Validacion stock
	  case "ingreso_movimiento": 
		if (expresiones.numero.test(e.target.value)) {
			document
			  .getElementById("container-inmovimiento")
			  .classList.remove("formError");
			document
			  .getElementById("container-inmovimiento")
			  .classList.add("formCorrect");
			alerta.innerHTML = ``;
		  } else {
			document
			  .getElementById("container-inmovimiento")
			  .classList.add("formError");
			document
			  .getElementById("container-inmovimiento")
			  .classList.remove("formCorrect");
			alerta.innerHTML = `Debe ingresar un ingreso valido`;
		  }
	  break;
}};

//Listener tecla presionada
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});


