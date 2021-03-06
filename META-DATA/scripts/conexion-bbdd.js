window.onload = function () {
    cargarClientes();
}

/**
 * Método <code>GET</code>
 */
function cargarClientes() {
    let response = {};
    const ajaxrequest = new XMLHttpRequest();
    var url = "index.php/clientes/";
    ajaxrequest.open("GET", url, true);
    ajaxrequest.onreadystatechange = function () {
        if (ajaxrequest.readyState == 4) {
            if (ajaxrequest.status == 200) {
                //
                response = JSON.parse(ajaxrequest.responseText);
                var clientes = new Array();
                clientes = response.datos;
                var tablaMain = document.getElementById("resp-table-body");
                tablaMain.innerHTML = "";
                //
                for (var i = 0; i < clientes.length; i++) {

                    //
                    let cliente = clientes[i];
                    tablaMain.appendChild(cargarClientes_agregarFila(cliente));
                }
                console.log(`Se procesaron ${clientes.length} clientes !`);
            } else {
                response = JSON.parse(ajaxrequest.responseText);
                console.log("Error al procesar la solicitud \n Estado de la solicitud: " + response.estado + "\n Detalles: " + response.respuesta);
            }
        }
    };
    ajaxrequest.send();
}

/**
 * Método nuevaFilaCliente
 * 
 * @param {string} columna 
 * @param {string} title 
 * @param {string} info 
 * @param {string} valor 
 * @param {string} option 
 * @returns {string} 
 */
function nuevaFilaCliente(columna, title, info, valor, option) {
    var valorHTML = "";
    switch (option) {
        case "opcion":
            valorHTML = `<select style="width: 100%;height: 3vh;" class="selectpicker center-block">${(valor == 1) ? "<option selected='selected' value='true'>SI</option><option value='false'>NO</option>" : "<option selected='selected' value='false'>NO</option><option value='true'>SI</option>"}</select>`;
            break;
        case "opcion-fecha":
            valorHTML = `<select style="width: 100%;height: 3vh;" class="selectpicker center-block">${(valor != null) ? "<option selected='selected' value='true'>SI</option><option>NO</option>" : "<option selected='selected' value='false'>NO</option><option>SI</option>"}</select><input class="" contenteditable="false" ${(valor != null && valor != "0000-00-00") ? "value='" + new Date(valor).toISOString().substring(0, 10) + "'" : ""} style="display:none;" type="date">`;
            break;
        case "opcion-texto":
            valorHTML = `<select style="height: 3vh;" class="selectpicker">${(valor != null) ? "<option selected='selected' value='true'>SI</option><option>NO</option>" : "<option selected='selected' value='false'>NO</option><option>SI</option>"}</select><input class="" contenteditable="false" ${(valor != null) ? "value='" + valor + "' style='display:inline-block;'" : " style='display:none;'"} type="text">`;
            break;
        case "fecha":
            valorHTML = `<input class="datepicker" type="date" ${(valor == null || valor == "0000-00-00") ? "" : "value='" + valor + "'"}>`;
            break;
        default:
            valorHTML = `${(valor == null) ? "-" : valor}`
            break;
    }
    return `<div class="table-body-cell" onclick="setEditable(this)" onblur="nonEditable(this)" columna="${columna}" title="${title}" info="${info}" tipo="${option}">${valorHTML}</div>`;
}

/**
 * Método cargarClientes_agregarFila
 * 
 * @param {object} obj 
 * @returns {string}
 */
function cargarClientes_agregarFila(obj) {
    var cliente = obj;
    var tabla = document.createElement("div");
    tabla.id = `cliente-${cliente.codigoConteo}`;
    tabla.className = "resp-table-row";
    tabla.innerHTML += nuevaFilaCliente("fechaDeCreacion", "Fecha de creación", "Creado en -", cliente.fechaDeCreacion, "texto");
    tabla.innerHTML += nuevaFilaCliente("viable", "Contacto viable", "¿Es viable?", cliente.viable, "opcion");
    tabla.innerHTML += nuevaFilaCliente("nombre", "Nombre del cliente", "El nombre del cliente es -", cliente.nombre, "texto");
    tabla.innerHTML += nuevaFilaCliente("correo", "Correo del cliente", "El correo del cliente es -", cliente.correo, "texto");
    tabla.innerHTML += nuevaFilaCliente("celular", "Celular del cliente", "El celular del cliente es -", cliente.celular, "texto");
    tabla.innerHTML += nuevaFilaCliente("medioPublicitario", "Medio publicitario del cliente", "Cliente se registra en -", cliente.medioPublicitario, "texto");
    tabla.innerHTML += nuevaFilaCliente("zonaBusqueda", "Zona de búsqueda", "Cliente busca en la zona de -", cliente.zonaBusqueda, "texto");
    tabla.innerHTML += nuevaFilaCliente("proyectoDeInteres", "Proyecto de interés", "Cliente interesado en -", cliente.proyectoDeInteres, "texto");
    tabla.innerHTML += nuevaFilaCliente("gestionDesdeSalaDeVentas", "Gestión desde cero S/V", "Gestionado por sala de ventas", cliente.gestionDesdeSalaDeVentas, "opcion");
    tabla.innerHTML += nuevaFilaCliente("habeasData", "Habeas data", "Habeas data", cliente.habeasData, "opcion");
    tabla.innerHTML += nuevaFilaCliente("fechaDeContacto", "Contactado", "El cliente fue contactado el -", cliente.fechaDeContacto, "opcion-fecha");
    tabla.innerHTML += nuevaFilaCliente("fechaDeContactoEfectivo", "Contacto efectivo", "El cliente generó una respuesta en -", cliente.fechaDeContactoEfectivo, "opcion-fecha");
    tabla.innerHTML += nuevaFilaCliente("proyectoCalificado", "Calificado", "El cliente muestra interes en -", cliente.proyectoCalificado, "opcion-texto");
    tabla.innerHTML += nuevaFilaCliente("fechaVisitaAgendada", "Fecha de visita agendada", "El cliente agenda visita para -", cliente.fechaVisitaAgendada, "fecha");
    tabla.innerHTML += nuevaFilaCliente("fechaVisitaEfectiva", "Visita efectiva", "El cliente visitó la sala el día -", cliente.fechaVisitaEfectiva, "opcion-fecha");
    tabla.innerHTML += nuevaFilaCliente("estado", "Estado", "El estado del cliente es -", cliente.estado, "texto");
    tabla.innerHTML += nuevaFilaCliente("asignadoA", "Asignado a", "El cliente es gestionado por -", cliente.asignadoA, "texto");
    return tabla;
}

/*document.addEventListener('contextmenu', function (e) {
    var context_menu = document.getElementById("context-menu-deployable");
    context_menu.style.display = "block";
    context_menu.style.top = `${e.clientY - 10}px`;
    context_menu.style.left = `${e.clientX - 10}px`;
    context_menu.onblur = function () {
        document.getElementById("context-menu-deployable").style.display = "none";
    };
    var element = document.elementFromPoint(e.clientX - 10, e.clientY - 10);
    context_menu.innerHTML = (element.getAttribute("info") == null) ? `No hay información` : element.getAttribute("info").replace("-", element.getAttribute("valor"));
    e.preventDefault();
}, false);*/

/**
 * Método setEditable
 * @param {HTMLElement} el 
 */
function setEditable(el) {
    var element = el;
    var tipoElemento = element.getAttribute("tipo");
    switch (tipoElemento) {
        case "opcion":
            element.contentEditable = "true";
            element.getElementsByTagName("select")[0].onchange = function () {
                element.contentEditable = "false";
                var obj = getClienteFromDiv(element);
                actualizarCliente(obj);
                console.log(` ¡ Actualizado el cliente ${obj.codigoConteo} !${obj.nombre} `);
            };
            break;
        case "opcion-texto":
            element.contentEditable = "true";
            element.getElementsByTagName("select")[0].onchange = function () {
                if (element.getElementsByTagName("select")[0].value) {
                    element.getElementsByTagName("input")[0].style.display = "inline-block";
                    element.getElementsByTagName("input")[0].onchange = function () {
                        var obj = getClienteFromDiv(element);
                        actualizarCliente(obj);
                        console.log(` ¡ Actualizado el cliente ${obj.codigoConteo} !${obj.nombre} `);
                    }
                } else {
                    element.getElementsByTagName("input")[0].style.display = "none";
                    element.contentEditable = "false";
                }
            };
            break;
        case "opcion-fecha":
            element.contentEditable = "true";
            element.getElementsByTagName("select")[0].onchange = function () {
                if (element.getElementsByTagName("select")[0].value || element.getElementsByTagName("select")[0].value == "true") {
                    element.getElementsByTagName("input")[0].value = new Date().toISOString().substring(0, 10);
                    var obj = getClienteFromDiv(element);
                    actualizarCliente(obj);
                    console.log(` ¡ Actualizado el cliente ${obj.codigoConteo} !${obj.nombre} `);
                } else {
                    element.getElementsByTagName("input")[0].style.display = "none";
                    element.contentEditable = "false";
                }
            };
            break;
        case "texto":
            element.contentEditable = "true";
            element.onblur = function () {
                element.contentEditable = "false";
                var obj = getClienteFromDiv(element);
                actualizarCliente(obj);
                console.log(` ¡ Actualizado el cliente ${obj.codigoConteo} !${obj.nombre} `);
            };
            break;
        case "fecha":
            element.contentEditable = "true";
            element.getElementsByTagName("input")[0].onchange = function () {
                element.contentEditable = "false";
                var obj = getClienteFromDiv(element, true);
                actualizarCliente(obj);
                console.log(` ¡ Actualizado el cliente ${obj.codigoConteo} !${obj.nombre} `);
            };
            break;
        default:
            element.contentEditable = "true";
            element.onblur = function () {
                element.contentEditable = "false";
                var obj = getClienteFromDiv(element);
                actualizarCliente(obj);
                console.log(` ¡ Actualizado el cliente ${obj.codigoConteo} !${obj.nombre} `);
            };
            break;
    }
}

/**
 * Método getClienteFromDiv
 * @param {HTMLElement} element 
 * @returns 
 */
function getClienteFromDiv(element) {
    var array = element.parentNode.getElementsByClassName("table-body-cell");
    let obj = {};
    for (var i = 0; i < array.length; i++) {
        if (array[i].getElementsByTagName("select").length > 0) {
            if (array[i].getAttribute("tipo") == "opcion") {
                obj[array[i].getAttribute("columna")] = (array[i].getElementsByTagName("select")[0].value == "true") ? 1 : 0;
            } else if (array[i].getAttribute("tipo") == "opcion-fecha") {
                obj[array[i].getAttribute("columna")] = (array[i].getElementsByTagName("input")[0].value == "") ? null : array[i].getElementsByTagName("input")[0].value;
            } else if (array[i].getAttribute("tipo") == "opcion-texto") {
                obj[array[i].getAttribute("columna")] = (array[i].getElementsByTagName("input")[0].value == "" || array[i].getElementsByTagName("input")[0].value == "-") ? null : array[i].getElementsByTagName("input")[0].value.toUpperCase();
            }
        } else if (array[i].getAttribute("tipo") == "fecha") {
            if (array[i].getElementsByTagName("input")[0].value == "") {
                obj[array[i].getAttribute("columna")] = null;
            } else {
                var fecha = new Date(array[i].getElementsByTagName("input")[0].value).toISOString();
                obj[array[i].getAttribute("columna")] = fecha.toLocaleString("es-CO").substring(0, 10);
            }
        } else {
            obj[array[i].getAttribute("columna")] = (array[i].innerHTML == "-") ? null : array[i].innerHTML;
        }
    }
    obj.codigoConteo = element.parentNode.id.split("-")[1];
    console.log(obj);
    return obj;
}

/**
 * Método <code>POST</code>
 * 
 * @param {string} formato
 * @param {string} valor 
 */
function insertarCliente(formato, valor) {
    var array = [];
    switch (formato) {
        case "json":
            break;
        case "xlsx":
            var xlsx = valor;
            for (var i = 0; i < xlsx.length; i++) {
                let objeto = {};
                objeto.nombre = xlsx[i].NOMBRE;
                objeto.correo = xlsx[i].CORREO;
                objeto.celular = xlsx[i].CELULAR;
                objeto.medioPublicitario = xlsx[i].MEDIO;
                objeto.proyectoDeInteres = xlsx[i].PROYECTO;
                array.push(objeto);
            }
            break;
        default:
            break;
    }
    let object = array;
    const ajaxrequest = new XMLHttpRequest();
    var url = "index.php/clientes/";
    ajaxrequest.open("POST", url, true);
    ajaxrequest.onreadystatechange = function () {
        if (ajaxrequest.readyState == 4) {
            let response = {};
            if (ajaxrequest.status == 200) {
                //
                response = JSON.parse(ajaxrequest.responseText);
                console.log(` ¡ Se insertaron ${array.length} clientes! `);
                console.log(`Respuesta servidor: ${response.respuesta} \n Estado de la solicitud: ${response.estado} \n Información solicitud: ${response.info} `);
                cargarClientes();
            } else {
                response = JSON.parse(ajaxrequest.responseText);
                console.log(`Respuesta servidor: ${response.respuesta} \n Estado de la solicitud: ${response.estado} \n Información solicitud: ${response.info} `);
            }
        }
    };
    ajaxrequest.setRequestHeader("Content-Type", "application/json");
    ajaxrequest.send(JSON.stringify(object));
}

/** */

/**
 * Método actualizarCliente
 * @param {Object} object 
 */
function actualizarCliente(object) {

    const ajaxrequest = new XMLHttpRequest();
    var url = `index.php/clientes/${object.codigoConteo} `;
    ajaxrequest.open("PUT", url, true);
    ajaxrequest.onreadystatechange = function () {
        if (ajaxrequest.readyState == 4) {
            let response = {};
            if (ajaxrequest.status == 200) {
                //
                response = JSON.parse(ajaxrequest.responseText);
                console.log(`Respuesta servidor: ${response.respuesta} \n Estado de la solicitud: ${response.estado} \n Información solicitud: ${response.info} `);
            } else {
                response = JSON.parse(ajaxrequest.responseText);
                console.log(`Respuesta servidor: ${response.respuesta} \n Estado de la solicitud: ${response.estado} \n Información solicitud: ${response.info} `);
            }
        }
    };
    ajaxrequest.setRequestHeader("Content-Type", "application/json");
    ajaxrequest.send(JSON.stringify(object));
}