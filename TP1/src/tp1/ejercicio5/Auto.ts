import { Vehiculo } from "./Vehiculo";

export class Auto extends Vehiculo {
    mostrarInfo(): void {
        console.log(`Auto ${this.marca} ${this.modelo}`);
    }
}