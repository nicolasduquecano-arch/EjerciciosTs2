
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface Reserva {
    nombre: string;
    fecha: string;
    personas: number;
}
function preguntar(texto: string): Promise<string> {
    return new Promise(resolve => rl.question(texto, resolve));
}
let reservas: Reserva[] = [];
async function main(): Promise<void> {
    let opcion: string;
    do {        
        opcion = await preguntar(   
            "\n=== HOTEL RESERVAS ===\n" +
            "1. Hacer reserva\n" +
            "2. Ver reservas\n" +
            "3. Salir\n"
        );
        switch(opcion) {
            case "1":
                let nombre: string = await preguntar("Ingrese el nombre del cliente: ");
                let fecha: string = await preguntar("Ingrese la fecha de la reserva (YYYY-MM-DD): ");
                let personas: string = await preguntar("Ingrese el número de personas: ");
                reservas.push({
                    nombre: nombre,
                    fecha: fecha,
                    personas: parseInt(personas)
                });
                console.log("Reserva realizada con éxito.");
                break;
            case "2":
                console.log("\nReservas realizadas:");
                reservas.forEach(r => {
                    console.log("Nombre:", r.nombre, "- Fecha:", r.fecha, "- Personas:", r.personas);
                });
                break;
            case "3":
                console.log("Gracias por usar Hotel Reservas!");
                break;
            default:
                console.log("Opción inválida, por favor intente de nuevo.");
        }
    } while (opcion !== "3");
    rl.close();
}
main();