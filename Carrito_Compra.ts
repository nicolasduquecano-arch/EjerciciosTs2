
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface Carrito{
    producto: string;
    precio: number;
    cantidad: number;

}
function preguntar(texto: string): Promise<string> {
    return new Promise(resolve => rl.question(texto, resolve));
}
let carrito: Carrito[] = [];
async function main(): Promise<void> {
    let opcion: string; 
    do {
        opcion = await preguntar(
            "\n=== CARRITO DE COMPRA ===\n" +
            "1. Agregar producto\n" +
            "2. Ver carrito\n" +
            "3. Calcular total\n" +
            "4. Salir\n"
        );
        switch(opcion) {
            case "1":
                let producto: string = await preguntar("Ingrese el nombre del producto: "); 
                let precio: string = await preguntar("Ingrese el precio del producto: ");
                let cantidad: string = await preguntar("Ingrese la cantidad: ");
                carrito.push({
                    producto,
                    precio: parseFloat(precio),
                    cantidad: parseInt(cantidad)
                });
                break;
            case "2":
                console.log("\nProductos en el carrito:"); 
                carrito.forEach(item => {
                    console.log(item.producto, "- Precio: $", item.precio, "- Cantidad:", item.cantidad);
                });
                break;
            case "3":
                let total: number = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
                console.log("Total a pagar: $", total);
                break;
            case "4":
                console.log("Gracias por su compra!");
                break; 
            default:
                console.log("Opción inválida, por favor intente de nuevo.");    
        }
    } while (opcion !== "4");
    rl.close();
}   
main();