//Objetos
class Alumno {
    
    constructor(nombre, apellido, nota1, nota2, nota3) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
    }

}
//funciones

// pedir nombre, apellido y notas del alumno
function crearAlumno() {

    let nombre = prompt("ingrese su nombre");
    let apellido = prompt("Ingrese su apellido");

    while (isNaN(nombre) === false || isNaN(apellido) === false) {
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

    console.log(alumnos);
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
const calcularPromedio = (nota1, nota2, nota3) => (nota1 + nota2 + nota3) / 3


//inicio del programa
const alumnos = []

const opciones = "1- Ingresar Alumno, 2- Cambiar Datos, 3- Calcular Nota Final, 0- Salir";
let opcion = parseInt(prompt(opciones));

while(opcionValida(opcion)) {
    
    switch(opcion) {
        case 1:
            crearAlumno();
            break;
        case 2:
        break;

        case 3:
        break;
    }

    opcion = parseInt(prompt(opciones));
}