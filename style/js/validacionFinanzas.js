const movimiento_form = document.getElementById('movimiento_form')
const inputs = document.querySelectorAll('#movimiento_form input')
const alerta = document.getElementById('alerta')

const expresiones = {
    nombre: /^[a-zA-Z0-9\_\-\s\.]{0,25}$/,
	numero: /^\d/, 
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "detalle":
			validarCampoFinanzas(expresiones.nombre, e.target, e.target.name)
		break;
		case "ingreso":
			validarCampoFinanzas(expresiones.numero, e.target, e.target.name)
		break;
		case "egreso":
			validarCampoFinanzas(expresiones.numero, e.target, e.target.name)
		break;
	}
}

//Funcion validar producto
const validarCampoFinanzas = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`${campo}_movimiento`).classList.remove('formError')
		document.getElementById(`${campo}_movimiento`).classList.add('formCorrect')
		alerta.innerHTML = ``
	} else {
		document.getElementById(`${campo}_movimiento`).classList.add('formError')
		document.getElementById(`${campo}_movimiento`).classList.add('formCorrect')
		alerta.innerHTML = `Debe ingresar un ${campo} válido`
	}
}

//Listener tecla presionada
inputs.forEach( (input) => {
	input.addEventListener('keyup',validarFormulario)
	input.addEventListener('blur',validarFormulario)
})

//Listener enviar formulario
movimiento_form.addEventListener('submit', (e) => {
	e.preventDefault();
})