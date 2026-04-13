
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface Evento {
  nombre: string;
  precio: number;
  vendidos: number;
}

function preguntar(texto: string): Promise<string> {
  return new Promise(resolve => rl.question(texto, resolve));
}

let eventos: Evento[] = [
  { nombre: "Concierto", precio: 120, vendidos: 0 },
  { nombre: "Cine", precio: 30, vendidos: 0 },
  { nombre: "Teatro", precio: 80, vendidos: 0 }
];

async function main(): Promise<void> {

  let opcion: string;

  do {

    opcion = await preguntar(
      "\n=== VENTA DE BOLETERÍA ===\n" +
      "1. Ver eventos\n" +
      "2. Comprar boleta\n" +
      "3. Ver eventos con boletas vendidas\n" +
      "4. Ver total de dinero recaudado\n" +
      "5. Salir\n"
    );

    switch(opcion) {

      case "1":
        console.log("\nEventos disponibles:");
        eventos.forEach(e => {
          console.log(e.nombre, "- $", e.precio);
        });
        break;

      case "2":
        let nombreEvento: string = await preguntar("Ingrese el nombre del evento: ");
        let evento: Evento | undefined = eventos.find(e => e.nombre === nombreEvento);

        if (evento) {
          evento.vendidos += 1;
          console.log("Boleta comprada para:", evento.nombre);
        } else {
          console.log("Evento no encontrado");
        }
        break;

      case "3":
        // filter
        let vendidos: Evento[] = eventos.filter(e => e.vendidos > 0);

        // map
        let lista: string[] = vendidos.map(e => `${e.nombre} - Boletas vendidas: ${e.vendidos}`);

        console.log("Eventos con ventas:");
        console.log(lista);
        break;

      case "4":
        // reduce
        let total: number = eventos.reduce((acc, e) => acc + (e.precio * e.vendidos), 0);

        console.log("Total recaudado: $", total);
        break;

      case "5":
        console.log("Sistema finalizado");
        break;

      default:
        console.log("Opción inválida");
    }

  } while(opcion !== "5");

  rl.close();
}

main();