
let url = "https://api-colombia.com/api/v1/Department"
let url2 = "https://api-colombia.com/api/v1/City"
let url3 = "https://api-colombia.com/api/v1/NaturalArea"
const urlS = new URLSearchParams(window.location.search);
let idArreglo = urlS.get('id')

fetch(url)
    .then(response => response.json())
    .then(data => pintar(data))

fetch(url2)
    .then(response => response.json())
    .then(data => obtenerCiudades(data))
    .catch(e => console.log(e))

fetch(url3)
    .then(response => response.json())
    .then(data => obtenerAreas(data))
    .catch(e => console.log(e))

let ciudadesArray = []
let areas = []
let contenedorAreas = document.getElementById("contenedorAreas")
let contenedorCiudades = document.getElementById("contenedorCiudades")

function obtenerAreas(array) {

    let areasDuplicadas = array.filter(data => data.departmentId == idArreglo)
    areasDuplicadas.forEach(elemento => {
        if (!areas.includes(elemento.name)) {
            areas.push(elemento.name)
        }
    });
    console.log(areas);
    pintarAreas(areas);
}

function obtenerCiudades(array) {
    let nuevoArreglo = array.filter(data => data.departmentId == idArreglo)
    ciudadesArray = nuevoArreglo
    pintarCiudades(nuevoArreglo)
}

function pintar(tarj) {
    let posicion = tarj.find(num => num.id == idArreglo)
    let contenedorDinamico = document.getElementById("tarjetaDinamica")
    contenedorDinamico.innerHTML = `
          <div class="card-body text-center textoTarjeta" >
              <h1 class="card-title pb-3 fw-bolder text-danger">${posicion.name}</h1>
              <p class="card-text  fw-medium justificar fs-5">${posicion.description}</p>
              <p class="card-text  fw-medium fs-6">Municipios: ${posicion.municipalities}</p>
              <p class="card-text fw-medium fs-6">Población: ${posicion.population}</p>
              <p class="card-text fw-medium fs-6 text-secondary">Superficie: ${posicion.surface}</p>
        </div> 
        `
}

function pintarCiudades(arreglo) {
    contenedorCiudades.innerHTML = ""

    if (arreglo.length == 0) {
        let none = document.createElement('div')
        none.innerHTML = `
        <div class="container notFound d-flex align-items-center">
            <img src="../images/notFound.png" alt="">
            <h4>No encontramos resultados para tu búsqueda.</h4>
        </div>>`
        contenedorCiudades.appendChild(none)
    }
    else {

        for (let i = 0; i < arreglo.length; i++) {

            let ciudad = document.createElement('div')
            ciudad.className = "card tarjetaTamaño col-md-4"
            ciudad.innerHTML = `
        <img src="../images/${idArreglo}.jpg " class="card-img-top h-50 p-2">
    <div class="card-body text-center d-flex row">
        <h5 class="card-title fs-3 fw-bold"> ${arreglo[i].name} </h5>
    </div> `
            contenedorCiudades.appendChild(ciudad)
        }
    }
}

function pintarAreas(array) {
    contenedorAreas.innerHTML = ""

    if (array.length == 0) {
        let none = document.createElement('div')
        none.innerHTML = `
        <div class="container notFound d-flex align-items-center">
            <img src="../images/notFound.png" alt="">
            <h4>No encontramos resultados para tu búsqueda.</h4>
        </div>>`
        contenedorAreas.appendChild(none)
    }
    else {
        for (let i = 0; i < array.length; i++) {
            let area = document.createElement('div')
            area.className = "card tarjetaTamaño col-md-4"
            area.innerHTML = `
            <img src="../images/area.jpg" class="card-img-top h-50 p-2">
    <div class="card-body text-center d-flex row">
        <h5 class="card-title fs-3 fw-bold"> ${array[i]} </h5>
    </div> `
            contenedorAreas.appendChild(area)
        }
    }
}

function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

document.getElementById("buscarDetails").addEventListener('keyup', e => {
    filtrarPorTexto(ciudadesArray)
    filtrarTexto(areas)
})

document.getElementById("btnCiudades").addEventListener('change', e => {
    let botonCiudad = document.getElementById("btnCiudades").checked
    if (botonCiudad) {
        document.getElementById("ciudadH1").classList.remove('text-decoration-line-through')
        filtrarPorTexto(ciudadesArray)
    }
    else {
        contenedorCiudades.innerHTML = ""
        document.getElementById("ciudadH1").classList.add('text-decoration-line-through')
    }
})

document.getElementById("btnAreas").addEventListener('change', x => {
    let botonArea = document.getElementById("btnAreas").checked
    if (botonArea) {
        document.getElementById("areaH1").classList.remove('text-decoration-line-through')
        filtrarTexto(areas)
    }
    else {
        document.getElementById("areaH1").classList.add('text-decoration-line-through')
        contenedorAreas.innerHTML = ""
    }
})

function filtrarPorTexto(array) {
    let botonCiudad = document.getElementById("btnCiudades").checked
    let buscarDetails = eliminarDiacriticos(document.getElementById("buscarDetails").value.toLowerCase())

    if (botonCiudad) {
        let buscados = array.filter(tarjeta => eliminarDiacriticos(tarjeta.name.toLowerCase()).includes(buscarDetails))
        pintarCiudades(buscados)
    }
    else {
        contenedorCiudades.innerHTML = ""
    }

}
function filtrarTexto(array) {
    let botonArea = document.getElementById("btnAreas").checked
    if (botonArea) {
        let buscarDetails = eliminarDiacriticos(document.getElementById("buscarDetails").value.toLowerCase())
        let buscados = array.filter(tarjeta => eliminarDiacriticos(tarjeta.toLowerCase()).includes(buscarDetails))
        pintarAreas(buscados)
    }
    else {
        contenedorAreas.innerHTML = ""
    }

}
