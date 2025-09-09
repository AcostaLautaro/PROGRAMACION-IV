import { Animal } from "./Animal";
export class Perro implements Animal {

    constructor(public raza = "Mezcla"){}
    hacerSonido(): void {
        console.log("GUAU!");
    }
    moverse(): void{
        console.log(`El ${this.raza} camina moviendo la cola`);
    }

}