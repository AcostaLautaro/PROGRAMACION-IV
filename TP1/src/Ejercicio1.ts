export interface Animal {
    raza: string;
    hacerSonido(): void;
    moverse(): void;
}

export class Perro implements Animal {

    constructor(public raza = "Mezcla"){}
    hacerSonido(): void {
        console.log("GUAU!");
    }
    moverse(): void{
        console.log(`El ${this.raza} camina moviendo la cola`);
    }

}

export class Gato implements Animal {
    constructor(public raza = "Michu"){}
    hacerSonido(): void {
        console.log("MIAU");
    }
    moverse(): void {
        console.log(`El gato ${this.raza} camina agazapado hacia un ratón`);
    }
}

let Perro1: Perro = new Perro("Border Collie");
Perro1.hacerSonido();
Perro1.moverse();

let Gato1: Gato = new Gato("Naranja");
Gato1.hacerSonido();
Gato1.moverse();