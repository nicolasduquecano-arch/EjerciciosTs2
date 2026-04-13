
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface Turnos {
    numero: number;
    turno: string;
}
function preguntar(texto: string): Promise<string> {
    return new Promise(resolve => rl.question(texto, resolve));
}
let turnos: Turnos[] = [
    { numero: 1, turno: "Juan" },
    { numero: 2, turno: "María" },
    { numero: 3, turno: "Pedro" }
];
async function main(): Promise<void> {
    let opcion: string;
    do {
        opcion = await preguntar(
            "\n=== DIGITURNO ===\n" +
            "1. Ver turnos\n" +
            "2. Agregar turno\n" +
            "3. Salir\n"
        );
        switch(opcion) {
            case "1":
                console.log("\nTurnos disponibles:");
                turnos.forEach(t => {
                    console.log("Número:", t.numero, "- Turno:", t.turno);
                });
                break;
            case "2":   
                let nombreTurno: string = await preguntar("Ingrese el nombre del turno: ");
                const ultimoTurno = turnos[turnos.length - 1];
                let nuevoNumero: number = ultimoTurno ? ultimoTurno.numero + 1 : 1;
                turnos.push({ numero: nuevoNumero, turno: nombreTurno });
                console.log("Turno agregado. Número:", nuevoNumero, "- Turno:", nombreTurno);
                break;
            case "3":
                console.log("Gracias por usar Digiturno!");
                break;
            default:
                console.log("Opción inválida, por favor intente de nuevo.");
        }
    } while (opcion !== "3");
    rl.close();
}   
main();