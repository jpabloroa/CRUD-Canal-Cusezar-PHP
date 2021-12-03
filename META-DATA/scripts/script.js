/** */

function openSheet(sheet) {
    var i;
    var x = document.getElementsByClassName("sheet");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(sheet.innerHTML.toLowerCase()).style.display = "block";
}

function openCollapsible(collapsible) {
    var i;
    var x = document.getElementsByClassName("collapsible");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(collapsible.innerHTML.toLowerCase().replace(" ", "_")).style.display = "block";
}

function openBox(box) {
    let background = document.getElementById("app-options");
    background.style.display = "block";
    let element = document.getElementById(`box-${box}`);
    element.style.display = "block";
}

function closeBox(elem) {
    let background = document.getElementById("app-options");
    background.style.display = "none";
    let element = document.getElementById(elem.parentNode.id);
    element.style.display = "none";

}

//function showDeleteOption(this){

//}
/** */

/** */

/**
 * 
 * @param {type} element
 * @returns {undefined}
 */
function filtrarPorProyecto(element, instance) {
    switch (instance) {
        case 1:
            break;
        case 3:
            break;
        default:
            element.innerHTML = "Nuevo";
            element.style.float = "right";
            var array = getObjetosCliente();
            var contactos = {};
            for (var i = 0; i < array.length; i++) {
                if (contactos[array[i].proyectoDeInteres] == null) {
                    contactos[array[i].proyectoDeInteres] = "";
                }
                contactos[array[i].proyectoDeInteres] += array[i].correo + ",<br>";
            }
            var mainBox = document.getElementById("box-contacto");
            mainBox.getElementsByClassName("content")[0].remove();
            var contenidoBox = document.createElement("div");
            contenidoBox.className = "content";
            var listaProyectos = Object.keys(contactos);
            for (var j = 0; j < listaProyectos.length; j++) {
                contenidoBox.innerHTML += `<button style="display:block;width:100%;" onclick="openCollapsible(this)">${listaProyectos[j].toUpperCase()}</button>`;
                var collapsible = document.createElement("div");
                collapsible.id = listaProyectos[j].toLowerCase().replace(" ", "_");
                collapsible.className = "collapsible";
                var captionText = document.createElement("p");
                captionText.contentEditable = "true";
                captionText.innerHTML = `Este es el mensaje para ${listaProyectos[j].toUpperCase()}`;
                var clientList = document.createElement("p");
                clientList.innerHTML += contactos[listaProyectos[j]];

                collapsible.appendChild(clientList);
                collapsible.appendChild(captionText);
                contenidoBox.appendChild(collapsible);
            }
            mainBox.appendChild(contenidoBox);
            break;
    }
}



/** */

/**
 * 
 * @param {type} element
 * @returns {undefined}
 */
function enviarWhatsAppPorProyecto(element) {
    element.innerHTML = "Nuevo";
    element.style.float = "right";
    var array = getObjetosCliente();
    var contactos = {};
    for (var i = 0; i < array.length; i++) {
        if (contactos[array[i].proyectoDeInteres] == null) {
            contactos[array[i].proyectoDeInteres] = "";
        }
        contactos[array[i].proyectoDeInteres] += capitalize(array[i].nombre.split(" ")[0]) + ",57" + array[i].celular + "<br>";
    }
    var mainBox = document.getElementById("box-contacto");
    mainBox.getElementsByClassName("content")[0].remove();
    var contenidoBox = document.createElement("div");
    contenidoBox.className = "content";
    var listaProyectos = Object.keys(contactos);
    for (var j = 0; j < listaProyectos.length; j++) {
        contenidoBox.innerHTML += `<button style="display:block;width:100%;" onclick="openCollapsible(this)">${listaProyectos[j].toUpperCase()}</button>`;
        var collapsible = document.createElement("div");
        collapsible.id = listaProyectos[j].toLowerCase().replace(" ", "_");
        collapsible.className = "collapsible";
        var captionText = document.createElement("p");
        captionText.contentEditable = "true";
        captionText.innerHTML = `Este es el mensaje para ${listaProyectos[j].toUpperCase()}`;
        var clientList = document.createElement("p");
        clientList.innerHTML += contactos[listaProyectos[j]];

        collapsible.appendChild(clientList);
        collapsible.appendChild(captionText);
        contenidoBox.appendChild(collapsible);
    }
    mainBox.appendChild(contenidoBox);
}

/**
 * 
 * @param {type} element
 * @returns {undefined}
 */
function enviarCorreoPorProyecto(element) {
    element.innerHTML = "Nuevo";
    element.style.float = "right";
    var array = getObjetosCliente();
    var contactos = {};
    for (var i = 0; i < array.length; i++) {
        if (contactos[array[i].proyectoDeInteres] == null) {
            contactos[array[i].proyectoDeInteres] = "";
        }
        contactos[array[i].proyectoDeInteres] += array[i].correo + ",<br>";
    }
    var mainBox = document.getElementById("box-contacto");
    mainBox.getElementsByClassName("content")[0].remove();
    var contenidoBox = document.createElement("div");
    contenidoBox.className = "content";
    var listaProyectos = Object.keys(contactos);
    for (var j = 0; j < listaProyectos.length; j++) {
        contenidoBox.innerHTML += `<button style="display:block;width:100%;" onclick="openCollapsible(this)">${listaProyectos[j].toUpperCase()}</button>`;
        var collapsible = document.createElement("div");
        collapsible.id = listaProyectos[j].toLowerCase().replace(" ", "_");
        collapsible.className = "collapsible";
        var captionText = document.createElement("p");
        captionText.contentEditable = "true";
        captionText.innerHTML = `Este es el mensaje para ${listaProyectos[j].toUpperCase()}`;
        var clientList = document.createElement("p");
        clientList.innerHTML += contactos[listaProyectos[j]];

        collapsible.appendChild(clientList);
        collapsible.appendChild(captionText);
        contenidoBox.appendChild(collapsible);
    }
    mainBox.appendChild(contenidoBox);
}

function getObjetosCliente() {
    var respuesta = [];
    var columnas = document.getElementById("resp-table-body").getElementsByClassName("resp-table-row");
    for (var j = 0; j < columnas.length; j++) {
        let row = columnas[j];
        var array = row.getElementsByClassName("table-body-cell");
        let obj = {};
        for (var i = 0; i < array.length; i++) {
            if (array[i].getElementsByTagName("input").length > 0) {
                obj[array[i].getAttribute("columna")] = new Date(array[i].getElementsByTagName("input")[0].value);
            } else if (array[i].getElementsByTagName("select").length > 0) {
                obj[array[i].getAttribute("columna")] = (array[i].getElementsByTagName("select")[0].value == "SI");
            } else {
                obj[array[i].getAttribute("columna")] = array[i].innerHTML;
            }
        }
        obj.codigoConteo = row.id.split("-")[1];
        respuesta.push(obj);
    }
    return respuesta;
}

function filtro() {

}

function nav_button(action) {
    var accion = action.toLowerCase();
    switch (accion) {
        case "insertar":
            insertar();
            break;
        case "whatsapp":
            break;
        case "correo":
            break;
    }
}



function buscarPorColumna() {
    var formData, column, filter, table, tr, td, i, txtValue;
    formData = new FormData(document.getElementById("formulario-buscar"));
    switch (formData.get("columna")) {
        case "Nombre":
            column = 2;
            break;
        case "Correo":
            column = 3;
            break;
        case "Celular":
            column = 4;
            break;
        case "Fecha de visita":
            column = 16;
            break;
    }
    console.log(column);
    filter = formData.get("valor").toUpperCase();
    table = document.getElementById("tabla-clientes");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[column];
        if (td) {
            txtValue = td.textContent || td.innerText;
            console.log(txtValue);
            var letter = txtValue.toUpperCase().indexOf(filter);
            console.log(letter);
            if (letter > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function insertar(tipo) {
    switch (tipo.toLowerCase()) {
        case "csv":

            break;
        case "json":
            break;
        case "":
            break;
    }
}

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

