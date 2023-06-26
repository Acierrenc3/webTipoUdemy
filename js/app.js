// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listar = document.querySelector('#lista-cursos');
let articulosCarrito = [];

registrarEventListeners();
function registrarEventListeners() {
    //cuando agregas un curso presionando "Agregar al carrito"
    listar.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito'));

        carritoHTML();
    })


    //Vaciar el Carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos el Array

        limpiarHTML(); //Eliminamos todo el HTML
    })

}




//Funciones

//Funcion agregar curso a través del botón Agregar al Carrito
function agregarCurso(e){ 
    e.preventDefault();


    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    console.log(e.target.classList)
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del Array de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
    }
}

//Lee el contenido del HTML al que hacemos click, y extrae la informacion del curso
function leerDatosCurso(curso) {
    //console.log(curso);

    //Crear un objeto con el contenido del curso Actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento existe en el carrito
const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];

    }else{
    //Agrega elementos al Array de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];


    }

    console.log(articulosCarrito);

    carritoHTML();
} //Fin de Funcion leerCursos

//Muestra el carrito de Compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( (curso) => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `;
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    //Agregar el carrito de compras al localStorage
    sincronizarStorage();


}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}