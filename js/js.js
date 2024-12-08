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
        return (this.nota1 + this.nota2 + this.nota3) / 3;
    }

}
//funciones

// pedir nombre, apellido y notas del alumno
function crearAlumno() {

    let nombre = prompt("ingrese su nombre");
    let apellido = prompt("Ingrese su apellido");

    while (!isNaN(nombre) || !isNaN(apellido)) {
        alert("ingrese un nombre y apellido valido")
        nombre = prompt("ingrese su nombre");
        apellido = prompt("Ingrese su apellido");
    }
    const nota1 = parseFloat(prompt("ingrese su nota 1"));
    const nota2 = parseFloat(prompt("ingrese su nota 2"));
    const nota3 = parseFloat(prompt("ingrese su nota 3"));

    

    
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

function obtenerNombreAlumno() {
    let nombreAlumno = prompt("ingrese el nombre del alumno para modificar sus notas");

    let alumnoEncontrado = alumnos.find((el) => {
        return el.nombre.toLowerCase() === nombreAlumno.toLowerCase();
    }
    )

    while(alumnoEncontrado === undefined) {
        alert("Alumno no encontrado");
        nombreAlumno = prompt("ingrese el nombre del alumno para modificar sus notas");
        alumnoEncontrado = alumnos.find((el) => {
            return el.nombre.toLowerCase() === nombreAlumno.toLowerCase();
        }
        )
    }
    return alumnoEncontrado;
}

//cambiar notas alumno
function cambiarNotas() {
    const alumnoEncontrado = obtenerNombreAlumno();

    const nuevaNota1 = parseFloat(prompt("Ingrese nueva nota 1"));
    const nuevaNota2 = parseFloat(prompt("Ingrese nueva nota 2"));
    const nuevaNota3 = parseFloat(prompt("Ingrese nueva nota 3"));

    alumnoEncontrado.nota1 = nuevaNota1;
    alumnoEncontrado.nota2 = nuevaNota2;
    alumnoEncontrado.nota3 = nuevaNota3;

    alert("Notas modificadas");

    renderizarTablaAlumnos();

}
//verificar si la opcion ingresada es valida
function opcionValida(opcionIngresada) {
    while(opcionIngresada < 0 || opcionIngresada > 4) {
        alert("OPCION INVALIDA")
        opcionIngresada = parseInt(prompt(opciones));
    }

    if(opcionIngresada=== 0) {
        alert("SALIR");
        return false;
    }

    return true;
}

// sacar promedio del alumno
function notaFinal() {
    const total = alumnos.reduce((acc, el) => {
        return acc + el.sumaNotas();
    }, 0);
    
    if (total >= 6) {
    alert("Su promedio es " + " " + total.toFixed(2) + " " + " y esta aprobado!")
    }
    else if(total <=5) {
        alert("su promedio es" + total.toFixed(2) + " y no aprobo :(")
    }
}

// RENDERIZAR TABLA DE ALUMNOS

function renderizarTablaAlumnos() {

    tbodyAlumnos.innerHTML = "";

    for ( const alumno of alumnos) {
        tbodyAlumnos.innerHTML = tbodyAlumnos.innerHTML + 
        `
        <tr>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.nota1}</td>
            <td>${alumno.nota2}</td>
            <td>${alumno.nota3}</td>   
        </tr>
        `;
    }
}


//inicio del programa
const tbodyAlumnos = document.getElementById("tbody-alumnos");
const alumnos = [
    new Alumno("Juan", "Pérez", 7, 8, 9),
]

renderizarTablaAlumnos();

const opciones = "1- Ingresar Alumno, 2- Calcular Nota Final, 3- Cambiar Nota, 0- Salir";
let opcion = parseInt(prompt(opciones));


while(opcionValida(opcion)) {
    
    switch(opcion) {
        case 1:
            crearAlumno();
            break;

        case 2:
            notaFinal();
        break;

        case 3:
            cambiarNotas();
        break;
    }

    opcion = parseInt(prompt(opciones));
}


console.log(alumnos);

