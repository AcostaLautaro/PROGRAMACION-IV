import { Vehiculo } from "./Vehiculo";
import { Electrico } from "./InterfazElectrico";

export class Moto extends Vehiculo implements Electrico {
    mostrarInfo(): void {
        console.log(`Moto ${this.marca} ${this.modelo}`);
    }

    cargarBateria(): void {
        console.log(`La moto electrica ${this.marca} se cargo por completo`);
    }
}