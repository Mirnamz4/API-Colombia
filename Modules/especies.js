let url = "https://api-colombia.com//api/v1/InvasiveSpecie"

fetch(url)
    .then(response => response.json())
    .then(data => pintar(data))

let tbody = document.getElementById("cuerpoTabla")

function pintar(array) {
    console.log(array);
    for (let i = 0; i < array.length; i++) {
        let tabla = document.createElement('tr')
        tabla.className = array[i].riskLevel == 1 ? "tablaModificar background1" : "tablaModificar background2"
        tabla.innerHTML = `
                    <th class="p-1 nombresTabla text-center" scope="row">${array[i].name} </th>
                    <td class="p-1 nombresTabla text-center">${array[i].scientificName}</td>
                    <td class="p-2 justificar">${array[i].impact}</td>
                    <td class="p-1 justificar">${array[i].manage}</td>
                    <td class="p-2 text-center">${array[i].riskLevel}</td>
                    <td class="p-1 imagenEspecie"><img src=" ${array[i].urlImage}"></td>
            `
        tbody.appendChild(tabla)
    }
}