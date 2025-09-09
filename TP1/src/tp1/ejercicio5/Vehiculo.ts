export abstract class Vehiculo {
    constructor(public marca:string, public modelo:string) {}

    abstract mostrarInfo(): void;
}