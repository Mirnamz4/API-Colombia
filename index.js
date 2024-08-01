let url = "https://api-colombia.com/api/v1/Department"

let newArray = []

fetch(url)
    .then(response => response.json())
    .then(data => obtenerData(data))

function obtenerData(array) {
    newArray = array
    pintarTarjetas(array)
}

let contenedorDepartamentos = document.getElementById("contenedorDepartamentos")

function pintarTarjetas(arreglo) {

    contenedorDepartamentos.innerHTML = ""
    if (arreglo.length == 0) {
        let none = document.createElement('div')
        none.innerHTML = `
        <div class="container notFound d-flex align-items-center">
            <img src="../images/notFound.png" alt="">
            <h4>No encontramos resultados para tu búsqueda.</h4>
        </div>>`
        contenedorDepartamentos.appendChild(none)
    }
    else {
        for (let i = 0; i < arreglo.length; i++) {

            let departamento = document.createElement('div')
            departamento.className = "card tarjetaTamaño col-md-4"
            departamento.innerHTML = `
            
<img src="../images/${arreglo[i].id}.jpg" class="card-img-top h-50 p-2">

    <div class="card-body text-center d-flex row">
        <h5 class="card-title fw-bold"> ${arreglo[i].name} </h5>
        <p class="card-text fw-medium">Superficie: ${arreglo[i].surface}</p>
        <p class="card-text fw-medium">Población: ${arreglo[i].population}</p>
        <div class="d-flex justify-content-between align-self-end">
            <a href="./Modules/details.html?id=${arreglo[i].id}" class="btn btn-primary mx-auto" id="detailsBoton">Details</a>
        </div>
    </div> `
            contenedorDepartamentos.appendChild(departamento)
        }
    }
}


document.getElementById("buscarHome").addEventListener('keyup', x => {
    let arregloFiltradoTxt = filtrarPorTexto(newArray)
    let arregloFilt = filtrarCheck(arregloFiltradoTxt)
    pintarTarjetas(arregloFilt)
})

function filtrarPorTexto(array) {
    let buscadorTexto = document.getElementById("buscarHome").value.toLowerCase()
    let filtrado = array.filter(tarjeta => tarjeta.name.toLowerCase().includes(buscadorTexto))
    return filtrado;
}

document.getElementById("switchHome").addEventListener('change', e => {
    let arregloFilt = filtrarCheck(newArray)
    let arregloFiltradoTxt = filtrarPorTexto(arregloFilt)
    pintarTarjetas(arregloFiltradoTxt);
})

function filtrarCheck(x) {
    let checkboxChecked = document.getElementById("switchHome").checked
    if (checkboxChecked) {
        let arregloPoblacion = x.filter(mayorQue)
        return arregloPoblacion
    }
    else {
        return x
    }

}

function mayorQue(num) {
    return num.population >= 1000000;
}
