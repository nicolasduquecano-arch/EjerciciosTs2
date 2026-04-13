
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface Cuenta { 
    titular: string;    
    saldo: number;
}
function preguntar(texto: string): Promise<string> {
    return new Promise(resolve => rl.question(texto, resolve));
}
let cuentas: Cuenta[] = [
    { titular: "Juan", saldo: 1000 },
    { titular: "María", saldo: 2000 },
    { titular: "Pedro", saldo: 1500 }
];
async function main(): Promise<void> {
    let opcion: string;
    do {
        opcion = await preguntar(
            "\n=== CAJERO AUTOMÁTICO ===\n" +
            "1. Ver cuentas\n" +
            "2. Retirar dinero\n" +
            "3. Ver saldo\n" +
            "4. Salir\n"
        );
        switch(opcion) {
            case "1":
                console.log("\nCuentas disponibles:");
                cuentas.forEach(c => {
                    console.log(c.titular, "- Saldo: $", c.saldo);
                });
                break;
            case "2":
                let nombreCuenta: string = await preguntar("Ingrese el nombre del titular: ");
                let cuenta: Cuenta | undefined = cuentas.find(c => c.titular === nombreCuenta);
                if (cuenta) {
                    let monto: string = await preguntar("Ingrese el monto a retirar: ");
                    let montoNumerico: number = parseFloat(monto);
                    if (montoNumerico > 0 && montoNumerico <= cuenta.saldo) {
                        cuenta.saldo -= montoNumerico;
                        console.log("Retiro exitoso. Nuevo saldo: $", cuenta.saldo);
                    } else {
                        console.log("Monto inválido o fondos insuficientes.");
                    }
                } else {
                    console.log("Cuenta no encontrada.");
                }
                break;
            case "3":
                let nombreCuentaSaldo: string = await preguntar("Ingrese el nombre del titular: ");
                let cuentaSaldo: Cuenta | undefined = cuentas.find(c => c.titular === nombreCuentaSaldo);   
                if (cuentaSaldo) {
                    console.log("Saldo de", cuentaSaldo.titular, ": $", cuentaSaldo.saldo);
                } else {
                    console.log("Cuenta no encontrada.");
                }
                break;
            case "4":
                console.log("Saliendo del cajero automático."); 
                break;
            default:
                console.log("Opción inválida. Por favor, intente de nuevo.");
        }
    } while (opcion !== "4");
    rl.close();
}   
main();
