import { Animal } from "./ClaseAnimal";

export class Zorro extends Animal{
    private especie: string;

    constructor(nombre:string, especie:string) {
        super(nombre);
        this.especie = especie;
    }

    hacerSonido(): void {
        console.log(`${this.nombre} (${this.especie})  gruñe`);
    }
}