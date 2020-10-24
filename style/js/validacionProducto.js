
const productoform = document.getElementById('productoform')
const inputs = document.querySelectorAll('#productoform input')
const alerta = document.getElementById('alerta')

const expresiones = {
	nombre: /^[a-zA-Z0-9\_\-\s\.]{0,25}$/,
	numero: /^\d/,  
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampoProducto(expresiones.nombre, e.target, e.target.name)
		break;
		case "costo":
			validarCampoProducto(expresiones.numero, e.target, e.target.name)
		break;
		case "stock":
			validarCampoProducto(expresiones.numero, e.target, e.target.name)
		break;
		case "movimiento":
			validarCampoProducto(expresiones.numero, e.target, e.target.name)
		break;
	}
}

//Funcion validar producto
const validarCampoProducto = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`${campo}_producto`).classList.remove('formError')
		document.getElementById(`${campo}_producto`).classList.add('formCorrect')
		alerta.innerHTML = ``
	} else {
		document.getElementById(`${campo}_producto`).classList.add('formError')
		document.getElementById(`${campo}_producto`).classList.add('formCorrect')
		alerta.innerHTML = `Debe ingresar un ${campo} válido`
	}
}

//Listener tecla presionada
inputs.forEach( (input) => {
	input.addEventListener('keyup',validarFormulario)
	input.addEventListener('blur',validarFormulario)
})

//Listener enviar formulario
productoform.addEventListener('submit', (e) => {
	e.preventDefault();
})

////-----------------------------------º-----------------------------------////
// REVISAR
// const recetaform = document.getElementById('recetaform')
// const inputs = document.querySelectorAll('#recetaform input')
// const alerta2 = document.getElementById('alerta2')

// const expresiones = {
// 	nombre: /^[a-zA-Z0-9\_\-\s\.]{0,25}$/,
// 	numero: /^[0-9]{1,3}?(.)[0-9]{1,3}$/, 
// }

// const validarFormularioPlato = (e) => {
// 	switch (e.target.name) {
// 		case "nombre":
// 			validarCampoPlato(expresiones.nombre, e.target, e.target.name)
// 		break;
// 		case "t_preparacion":
// 			validarCampoPlato(expresiones.numero, e.target, e.target.name)
// 		break;
// 		case "precio":
// 			validarCampoPlato(expresiones.numero, e.target, e.target.name)
// 		break;
// 	}
// }

// //Funcion validar plato
// const validarCampoPlato = (expresion, input, campo) => {
// 	if (expresion.test(input.value)) {
// 		document.getElementById(`${campo}_receta`).classList.remove('formError')
// 		document.getElementById(`${campo}_receta`).classList.add('formCorrect')
// 		alerta2.innerHTML = ``
// 	} else {
// 		document.getElementById(`${campo}_receta`).classList.add('formError')
// 		document.getElementById(`${campo}_receta`).classList.add('formCorrect')
// 		alerta2.innerHTML = `Debe ingresar un ${campo} válido`
// 	}
// }

// //Listener tecla presionada
// inputs.forEach( (input) => {
// 	input.addEventListener('keyup',validarFormularioPlato)
// 	input.addEventListener('blur',validarFormularioPlato)
// })

// //Listener enviar formulario
// recetaform.addEventListener('submit', (e) => {
// 	e.preventDefault();
// })
