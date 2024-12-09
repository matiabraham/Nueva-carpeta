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

//ver si el alumno  ya esta cargado
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
    renderizarTablaAlumnos();

}

// RENDERIZAR TABLA DE ALUMNOS

function renderizarTablaAlumnos() {

    tbodyAlumnos.innerHTML = "";

    for ( const alumno of alumnos) {

        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        const tdApellido = document.createElement("td");
        const tdNota1 = document.createElement("td");
        const tdNota2 = document.createElement("td");
        const tdNota3 = document.createElement("td");

        //calcular si el alumno aprobo o desaprobo
        const promedio = alumno.sumaNotas();
        let estado;
            if (promedio >= 6) {
        estado = "Aprobado";
} else {
        estado = "Desaprobado";
}
        const tdPromedio = document.createElement("td");
        const tdEstado = document.createElement("td");

        tdNombre.innerText = `${alumno.nombre}`;
        tdApellido.innerText = `${alumno.apellido}`;
        tdNota1.innerText = "";
        tdNota2.innerText = "";
        tdNota3.innerText = "";
        tdPromedio.innerText = `${promedio.toFixed(2)}`;
        tdEstado.innerText = `${estado}`;




        const spanNota1 = document.createElement("span");
        spanNota1.innerText = `${alumno.nota1}`;
        spanNota1.addEventListener("click", () => {
            //cambiar nota 1
            const inputNota1 = document.createElement("input");
            inputNota1.type = "text";
            inputNota1.value = alumno.nota1;
            
            inputNota1.addEventListener("change", () => {
                alumno.nota1 = inputNota1.value;
                renderizarTablaAlumnos();
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
                alumno.nota2 = inputNota2.value;
                renderizarTablaAlumnos();
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
                alumno.nota3 = inputNota3.value;
                renderizarTablaAlumnos();
            })
            // agregar input al td
            tdNota3.append(inputNota3);

            //ocultar span
            spanNota3.classList.add("ocultar-span");
            
        })
        tdNota1.append(spanNota1);
        tdNota2.append(spanNota2);
        tdNota3.append(spanNota3);
        tr.append(tdNombre,tdApellido,tdNota1,tdNota2,tdNota3,tdPromedio,tdEstado,);
        tbodyAlumnos.append(tr);
    }
}

//inicio del programa
const formAgregarAlumno = document.getElementById("form-agregar-alumno");
const tbodyAlumnos = document.getElementById("tbody-alumnos");
const alumnos = [
    //alumno de prueba
    new Alumno("matias", "abraham", 7, 8, 9),
]

renderizarTablaAlumnos();

formAgregarAlumno.addEventListener("submit", crearAlumno);