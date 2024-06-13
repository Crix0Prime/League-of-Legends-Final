const valida = () => {
    //querySelectoAll permite acceder a una lista de elementos HTML según un criterio
    //forEach permite recorrer una lista
    document.querySelectorAll('.form-control,.form-select').forEach(item => {
        verificar(item.id)
    })
    //llamar a la función validaRadio
    validaRadio('posicion')
    validaRadio('genero')
}
const validaRadio = (name) => {
    // ` literal string y sirve para concatenar variables con texto (${}) altGr+} + espacio
    const radio = document.querySelector(`input[name="${name}"]:checked`)
    const div = document.getElementById(`e-${name}`)
    const all = document.querySelectorAll(`input[name="${name}"]`)
    //verifica si algún elemento del radio no está seleccioando
    if (!radio) {
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
        all.forEach(item => {
            item.classList.add('is-invalid')
        })
    }
    else {
        div.innerHTML = ''
        all.forEach(item => {
            item.classList.remove('is-invalid')
            item.classList.add('is-valid')
        })
    }
}       
const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'lanzamiento') {
            if (!validarFecha(input.value)) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">La fecha de Lanzamiento no puede ser superior a la fecha de hoy</span>';
            }
        }
    }
    
}
const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control,.form-select,.form-check-input').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById(`e-${item.name}`).innerHTML = ''
        document.getElementById('btnGuardar').value = 'Guardar'
    })
}

function validarFecha(fecha) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Ajustar a medianoche para comparar solo fechas

    const fechaIngresada = new Date(fecha);

    // Verificar si la fecha ingresada es válida
    if (isNaN(fechaIngresada.getTime())) {
        return false; // La fecha ingresada no es válida
    }

    return fechaIngresada <= hoy;
}