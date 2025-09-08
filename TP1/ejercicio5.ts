abstract class Vehiculo {
    constructor(public marca:string, public modelo:string) {}

    abstract mostrarInfo(): void;
}

interface Electrico {
    cargarBateria(): void;
}

class Auto extends Vehiculo {
    mostrarInfo(): void {
        console.log(`Auto ${this.marca} ${this.modelo}`);
    }
}

class Moto extends Vehiculo implements Electrico {
    mostrarInfo(): void {
        console.log(`Moto ${this.marca} ${this.modelo}`);
    }

    cargarBateria(): void {
        console.log(`La moto electrica ${this.marca} se cargo por completo`);
    }
}

//carga de vehiculos
const auto1 = new Auto("Toyota", "Corolla");
const moto1 = new Moto("Motomel", "Blitz"); //ej unicamente, ya que no es electrica 

auto1.mostrarInfo();
moto1.mostrarInfo();
moto1.cargarBateria();
