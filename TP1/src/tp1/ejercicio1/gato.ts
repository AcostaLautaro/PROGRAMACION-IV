import { Animal } from "./Animal";

export class Gato implements Animal {
    constructor(public raza = "Michu"){}
    hacerSonido(): void {
        console.log("MIAU");
    }
    moverse(): void {
        console.log(`El gato ${this.raza} camina agazapado hacia un ratón`);
    }
}