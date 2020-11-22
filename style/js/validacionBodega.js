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
	  //Validacion producto
    case "nombre_producto":
      if (expresiones.nombre.test(e.target.value)) {
        document
          .getElementById("nombre_producto_container")
          .classList.remove("formError");
        document
          .getElementById("nombre_producto_container")
          .classList.add("formCorrect");
        alerta.innerHTML = ``;
      } else {
        document
          .getElementById("nombre_producto_container")
          .classList.add("formError");
        document
          .getElementById("nombre_producto_container")
          .classList.remove("formCorrect");
        alerta.innerHTML = `Debe ingresar un nombre de producto válido`;
      }
	  break;
	  //Fin validacion producto
	  //-----------------------------------------º-----------------------------------------
	  //Validacion costo
	  case "costo_producto": 
		if (expresiones.numero.test(e.target.value)) {
			document
			  .getElementById("costo_producto_container")
			  .classList.remove("formError");
			document
			  .getElementById("costo_producto_container")
			  .classList.add("formCorrect");
			alerta.innerHTML = ``;
		  } else {
			document
			  .getElementById("costo_producto_container")
			  .classList.add("formError");
			document
			  .getElementById("costo_producto_container")
			  .classList.remove("formCorrect");
			alerta.innerHTML = `Debe ingresar un costo valido`;
		  }
	  break;
	  //Fin validacion costo
	  //-----------------------------------------º-----------------------------------------
	  //Validacion stock
	  case "stock_producto": 
		if (expresiones.numero.test(e.target.value)) {
			document
			  .getElementById("stock_producto_container")
			  .classList.remove("formError");
			document
			  .getElementById("stock_producto_container")
			  .classList.add("formCorrect");
			alerta.innerHTML = ``;
		  } else {
			document
			  .getElementById("stock_producto_container")
			  .classList.add("formError");
			document
			  .getElementById("stock_producto_container")
			  .classList.remove("formCorrect");
			alerta.innerHTML = `Debe ingresar un stock valido`;
		  }
	  break;
	  //Fin validacion stock
	  //-----------------------------------------º-----------------------------------------
	  //Validacion movimiento
	  case "movimiento_producto": 
		if (expresiones.numero.test(e.target.value)) {
			document
			  .getElementById("movimiento_producto_container")
			  .classList.remove("formError");
			document
			  .getElementById("movimiento_producto_container")
			  .classList.add("formCorrect");
			alerta.innerHTML = ``;
		  } else {
			document
			  .getElementById("movimiento_producto_container")
			  .classList.add("formError");
			document
			  .getElementById("movimiento_producto_container")
			  .classList.remove("formCorrect");
			alerta.innerHTML = `Debe ingresar un movimiento valido`;
		  }
	  break;
	  //Fin validacion movimiento
	  //-----------------------------------------º-----------------------------------------
	  //Validacion nombre receta
    case "nombre_receta":
      if (expresiones.nombre.test(e.target.value)) {
        document
          .getElementById("nombre_receta_container")
          .classList.remove("formError");
        document
          .getElementById("nombre_receta_container")
          .classList.add("formCorrect");
        alerta2.innerHTML = ``;
      } else {
        document
          .getElementById("nombre_receta_container")
          .classList.add("formError");
        document
          .getElementById("nombre_receta_container")
          .classList.add("formCorrect");
        alerta2.innerHTML = `Debe ingresar un nombre  de receta válido`;
      }
	  break;
	  //Fin validacion nombre receta
	  //-----------------------------------------º-----------------------------------------
	  //Validacion tiempo preparacion
	  case "preparacion_receta":
		if (expresiones.nombre.test(e.target.value)) {
		  document
			.getElementById("tiempo_receta_container")
			.classList.remove("formError");
		  document
			.getElementById("tiempo_receta_container")
			.classList.add("formCorrect");
		  alerta2.innerHTML = ``;
		} else {
		  document
			.getElementById("tiempo_receta_container")
			.classList.add("formError");
		  document
			.getElementById("tiempo_receta_container")
			.classList.add("formCorrect");
		  alerta2.innerHTML = `Debe ingresar un tiempo de preparacion válido`;
		}
		break;
	  //Fin validacion tiempo preparacion
	  //-----------------------------------------º-----------------------------------------
	  //Validacion precio venta
	  case "precio_receta":
		if (expresiones.nombre.test(e.target.value)) {
		  document
			.getElementById("precio_receta_container")
			.classList.remove("formError");
		  document
			.getElementById("precio_receta_container")
			.classList.add("formCorrect");
		  alerta2.innerHTML = ``;
		} else {
		  document
			.getElementById("precio_receta_container")
			.classList.add("formError");
		  document
			.getElementById("precio_receta_container")
			.classList.add("formCorrect");
		  alerta2.innerHTML = `Debe ingresar un precio venta válido`;
		}
		break;
	  //Fin validacion precio venta
  }
};

//Listener tecla presionada
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

