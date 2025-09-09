import { Animal } from "./ClaseAnimal";
import { Volador } from "./Volador";

export class Pajaro extends Animal implements Volador { //aca el pajaro toma la interface de volador, que es basicamente un contrato que debe de cumplir esta clase
    private especie: string;

    constructor(nombre:string, especie:string) {
        super(nombre);
        this.especie = especie;
    }

    hacerSonido(): void {
        console.log(`${this.nombre} (${this.especie})  pio pio`);
    }

    volar(): void {
        console.log(`${this.nombre} (${this.especie}) esta volando`);
    }
}