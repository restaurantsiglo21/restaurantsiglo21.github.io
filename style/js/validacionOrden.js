const form_orden = document.getElementById('form_orden')
const inputs = document.querySelectorAll('#form_orden input')
const alerta = document.getElementById('alerta')

const expresiones = {
	numero: /^\d/, 
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "n_orden":
			validarCampoOrden(expresiones.numero, e.target, e.target.name)
		break;
	}
}

//Funcion validar producto
const validarCampoOrden = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById('n_orden').classList.remove('formError')
		document.getElementById('n_orden').classList.add('formCorrect')
		alerta.innerHTML = ``
	} else {
		document.getElementById('n_orden').classList.add('formError')
		document.getElementById('n_orden').classList.add('formCorrect')
		alerta.innerHTML = `Debe ingresar un ${campo} válido`
	}
}

//Listener tecla presionada
inputs.forEach( (input) => {
	input.addEventListener('keyup',validarFormulario)
	input.addEventListener('blur',validarFormulario)
})

//Listener enviar formulario
form_orden.addEventListener('submit', (e) => {
	e.preventDefault();
})
