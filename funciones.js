import { eliminar, getData, obtener, save, update, verificarExistente} from "./firebase.js"

let id = 0
//addEventListener me permite capturar un evento 
document.getElementById('btnGuardar').addEventListener('click', async () => {
    valida();
    if (document.querySelectorAll('.is-invalid').length == 0) {
        
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const league = {
                'campeon': document.getElementById('campeon').value,
                'genero': document.querySelector('input[name="genero"]:checked').value,
                'posicion': document.querySelector('input[name="posicion"]:checked').value,
                'especie': document.getElementById('especie').value,
                'recurso': document.getElementById('recurso').value,
                'tipoGama': document.getElementById('tipoGama').value,
                'region': document.getElementById('region').value,
                'lanzamiento': document.getElementById('lanzamiento').value
                
            }
            const Existe = await verificarExistente(league.campeon);
            if (Existe) {
                Swal.fire({
                    title: "Error",
                    text: "El Campeon ya existe en la colección",
                    icon: "error"
                });
                return; // Detener el proceso de guardar el registro
            }
            save(league)
            limpiar()
        }else{
            const league = {
                'campeon': document.getElementById('campeon').value,
                'genero': document.querySelector('input[name="genero"]:checked').value,
                'posicion': document.querySelector('input[name="posicion"]:checked').value,
                'especie': document.getElementById('especie').value,
                'recurso': document.getElementById('recurso').value,
                'tipoGama': document.getElementById('tipoGama').value,
                'region': document.getElementById('region').value,
                'lanzamiento': document.getElementById('lanzamiento').value
            }
            //se invoca la función para actualizar
            update(id,league)
            limpiar()
            //volver al estado inciial la variable de i 
            id = 0
        }
    }
})
//DOMEventLister es un evento que se ejecuta cuando se recarga la página 
window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        //se recorre la colección y se crear el item doc para mostrar los datos
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.campeon}</td>
            <td>${item.genero}</td>
            <td>${item.posicion}</td>
            <td>${item.especie}</td>
            <td>${item.recurso}</td>
            <td>${item.tipoGama}</td>
            <td>${item.region}</td>
            <td>${item.lanzamiento}</td>
            <td nowrap>
                <button class="btn btn-outline-primary" id="${doc.id}">Editar</button>
                <button class="btn btn-outline-warning" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botón y eliminar
        document.querySelectorAll('.btn-outline-warning').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //añadir sweetalert para confirmar la eliminación
                        eliminar(btn.id)
                    }
                })
            })
        })

        //seleccionar el documento
        document.querySelectorAll('.btn-outline-primary').forEach( btn => {
            //async indica que necesitamos un await para esperar a que la función responda
            btn.addEventListener('click',async() =>{
                limpiar()
                //invocar función para buscar el documento por su id
                const doc = await obtener(btn.id)
                //obtener los valores del documento
                const d = doc.data()
                //asignar los valores a los input
                document.getElementById('campeon').value = d.campeon
                if (d.genero === 'Masculino') {
                    document.getElementById('masculino').checked = true;
                } else if (d.genero === 'Femenino') {
                    document.getElementById('femenino').checked = true;
                }
                if (d.posicion === 'Top') {
                    document.getElementById('top').checked = true;
                } else if (d.posicion === 'Jungle') {
                    document.getElementById('jungle').checked = true;
                } else if (d.posicion === 'Mid') {
                    document.getElementById('mid').checked = true;
                } else if (d.posicion === 'ADC') {
                    document.getElementById('adc').checked = true;
                } else if (d.posicion === 'Support') {
                    document.getElementById('support').checked = true;
                }                
                document.getElementById('especie').value = d.especie
                document.getElementById('recurso').value = d.recurso
                document.getElementById('tipoGama').value = d.tipoGama
                document.getElementById('region').value = d.region
                document.getElementById('lanzamiento').value = d.lanzamiento
                //modificar el valor del botón 
                
                document.getElementById('btnGuardar').value = 'Modificar'
                
                //asignar el id del documento a nuestra variable
                id = btn.id

            })
        })

    })
})