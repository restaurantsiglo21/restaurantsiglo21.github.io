const recetaform = document.getElementById('recetaform')
const inputs = document.querySelectorAll('#recetaform input')
const alerta2 = document.getElementById('alerta2')

const expresiones = {
	nombre: /^[a-zA-Z0-9\_\-\s\.]{0,25}$/,
	numero: /^\d/, 
}

const validarFormularioPlato = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampoPlato(expresiones.nombre, e.target, e.target.name)
		break;
		case "t_preparacion":
			validarCampoPlato(expresiones.numero, e.target, e.target.name)
		break;
		case "precio":
			validarCampoPlato(expresiones.numero, e.target, e.target.name)
		break;
	}
}

//Funcion validar producto
const validarCampoPlato = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`${campo}_receta`).classList.remove('formError')
		document.getElementById(`${campo}_receta`).classList.add('formCorrect')
		alerta2.innerHTML = ``
	} else {
		document.getElementById(`${campo}_receta`).classList.add('formError')
		document.getElementById(`${campo}_receta`).classList.add('formCorrect')
		alerta2.innerHTML = `Debe ingresar un ${campo} válido`
	}
}

//Listener tecla presionada
inputs.forEach( (input) => {
	input.addEventListener('keyup',validarFormularioPlato)
	input.addEventListener('blur',validarFormularioPlato)
})

//Listener enviar formulario
recetaform.addEventListener('submit', (e) => {
	e.preventDefault();
})

//-----------------------------------º-----------------------------------

