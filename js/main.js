//Objetos
class Alumno {
    
    constructor(nombre, apellido, nota1, nota2, nota3) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
    }

    sumaNotas() {
        return (parseFloat(this.nota1) + parseFloat(this.nota2) + parseFloat(this.nota3)) / 3;
    }    

}
//funciones

function obtenerDeLS() {
    const alumnosJSON = localStorage.getItem("alumnos");
    return (JSON.parse(alumnosJSON) ?? [
        new Alumno("matias", "abraham", 7, 8, 9) // Alumno de prueba
    ]).map(data => new Alumno(data.nombre, data.apellido, data.nota1, data.nota2, data.nota3));
}



function guardarEnLS() {
    const alumnosJSON = JSON.stringify(alumnos);

    localStorage.setItem("alumnos", alumnosJSON);
}
//ver si el alumno ya esta cargado
function alumnoExiste(nombre, apellido) {
    return alumnos.some(alumno => 
        alumno.nombre.toLowerCase() === nombre.toLowerCase() && 
        alumno.apellido.toLowerCase() === apellido.toLowerCase()
    );
} 


// pedir nombre, apellido y notas del alumno
function crearAlumno(e) {
    e.preventDefault();
    // Inputs
    const inputNombreAlumno = document.getElementById("nombre-alumno");
    const inputApellidoAlumno = document.getElementById("apellido-alumno");
    const inputNota1 = document.getElementById("nota1");
    const inputNota2 = document.getElementById("nota2");
    const inputNota3 = document.getElementById("nota3");

    let nombre = inputNombreAlumno.value;
    let apellido = inputApellidoAlumno.value;

    //validar nombre y apellido
    if (!nombre || !apellido || !isNaN(nombre) || !isNaN(apellido)) {
        alert("Ingrese Nombre y Apellido valido");
        return;
    }

    //chequear si el alumno ya esta cargado
    if (alumnoExiste(nombre, apellido)) {
        alert("El alumno ya está cargado");
        return;
    }

    const nota1 = parseFloat(inputNota1.value);
    const nota2 = parseFloat(inputNota2.value);
    const nota3 = parseFloat(inputNota3.value);

    //limpiar inputs
    inputNombreAlumno.value = "";
    inputApellidoAlumno.value = "";
    inputNota1.value = "";
    inputNota2.value = "";
    inputNota3.value = "";
    

    //chequear que las notas sean numeros validos
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        alert("Por favor, ingrese notas válidas");
        return;
    }
    

    
    //avisarle al usuario que se cargaron los datos
    alert("datos cargados")

    // crear alumno
    const nuevoAlumno = new Alumno(
        nombre,
        apellido,
        nota1,
        nota2,
        nota3,
    );

    // agregar alumno al array
    alumnos.push(nuevoAlumno);

    //GUARDAR EN LS
    guardarEnLS();

    renderizarTablaAlumnos();

}

//  ELIMINAR ALUMNO 
function eliminarAlumno(indice) {
    alumnos.splice(indice, 1);
    renderizarTablaAlumnos(); 

    //GUARDAR EN LS
    guardarEnLS();
}

// RENDERIZAR TABLA DE ALUMNOS

function renderizarTablaAlumnos() {

    tbodyAlumnos.innerHTML = "";

    for ( const [indice, alumno] of alumnos.entries()) {

        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        const tdApellido = document.createElement("td");
        const tdNota1 = document.createElement("td");
        const tdNota2 = document.createElement("td");
        const tdNota3 = document.createElement("td");

        //calcular si el alumno aprobo o desaprobo
        const promedio = alumno.sumaNotas();
        let estado = promedio >= 6 ? "Aprobado" : "Desaprobado";

        const tdPromedio = document.createElement("td");
        const tdEstado = document.createElement("td");
        const tdBotonEliminar = document.createElement("td");

        tdNombre.innerText = `${alumno.nombre}`;
        tdApellido.innerText = `${alumno.apellido}`;
        tdNota1.innerText = "";
        tdNota2.innerText = "";
        tdNota3.innerText = "";
        tdPromedio.innerText = `${promedio.toFixed(2)}`;
        tdEstado.innerText = `${estado}`;

        // Crear botón de eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        // Agregar una clase al botón
        botonEliminar.classList.add("boton-eliminar");
        botonEliminar.addEventListener("click", () => eliminarAlumno(indice));

        tdBotonEliminar.appendChild(botonEliminar);



        const spanNota1 = document.createElement("span");
        spanNota1.innerText = `${alumno.nota1}`;
        spanNota1.addEventListener("click", () => {
            //cambiar nota 1
            const inputNota1 = document.createElement("input");
            inputNota1.type = "text";
            inputNota1.value = parseFloat(alumno.nota1);
            
            inputNota1.addEventListener("change", () => {
                alumno.nota1 = parseFloat(inputNota1.value);
                renderizarTablaAlumnos();

                //GUARDAR EN LS
                guardarEnLS();
            })

            // agregar input al td
            tdNota1.append(inputNota1);

            //ocultar span
            spanNota1.classList.add("ocultar-span");
        })


        const spanNota2 = document.createElement("span");
        spanNota2.innerText = `${alumno.nota2}`;
        spanNota2.addEventListener("click", () => {
            //cambiar nota 2
            const inputNota2 = document.createElement("input");
            inputNota2.type = "text";
            inputNota2.value = alumno.nota2;
            
            inputNota2.addEventListener("change", () => {
                alumno.nota2 = parseFloat(inputNota2.value);
                renderizarTablaAlumnos();

                //GUARDAR EN LS
                guardarEnLS();
            })
            // agregar input al td
            tdNota2.append(inputNota2);

            //ocultar span
            spanNota2.classList.add("ocultar-span");
        })
        const spanNota3 = document.createElement("span");
        spanNota3.innerText = `${alumno.nota3}`;
        spanNota3.addEventListener("click", () => {
            //cambiar nota 3
            const inputNota3 = document.createElement("input");
            inputNota3.type = "text";
            inputNota3.value = alumno.nota3;
            
            inputNota3.addEventListener("change", () => {
                alumno.nota3 = parseFloat(inputNota3.value);
                renderizarTablaAlumnos();

                //GUARDAR EN LS
                guardarEnLS();
            })
            // agregar input al td
            tdNota3.append(inputNota3);

            //ocultar span
            spanNota3.classList.add("ocultar-span");
            
        })
        tdNota1.append(spanNota1);
        tdNota2.append(spanNota2);
        tdNota3.append(spanNota3);
        tr.append(tdNombre,tdApellido,tdNota1,tdNota2,tdNota3,tdPromedio,tdEstado, tdBotonEliminar);
        tbodyAlumnos.append(tr);
    }
}


//filtrar alumnos por nombre

const inputFiltrarNombre = document.getElementById("filtrar-nombre");

inputFiltrarNombre.addEventListener("input", function () {
    const textoFiltro = inputFiltrarNombre.value.toLowerCase();
    const filas = tbodyAlumnos.getElementsByTagName("tr");

    for (const fila of filas) {
        const nombreCelda = fila.cells[0].textContent.toLowerCase();
        if (nombreCelda.includes(textoFiltro)) {
            fila.style.display = ""; 
        } else {
            fila.style.display = "none"; 
        }
    }
});



//inicio del programa
const formAgregarAlumno = document.getElementById("form-agregar-alumno");
const tbodyAlumnos = document.getElementById("tbody-alumnos");
let alumnos = obtenerDeLS();

renderizarTablaAlumnos();

formAgregarAlumno.addEventListener("submit", crearAlumno);