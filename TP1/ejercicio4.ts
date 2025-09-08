interface Volador{
    volar(): void;
}

abstract class Animal {
    protected nombre:string;

    constructor(nombre:string) {
        this.nombre = nombre;
    }

    abstract hacerSonido(): void;
}

class Pajaro extends Animal implements Volador { //aca el pajaro toma la interface de volador, que es basicamente un contrato que debe de cumplir esta clase
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

class Zorro extends Animal{
    private especie: string;

    constructor(nombre:string, especie:string) {
        super(nombre);
        this.especie = especie;
    }

    hacerSonido(): void {
        console.log(`${this.nombre} (${this.especie})  gruñe`);
    }
}

//cargamos unos animales
const pajaro1 = new Pajaro("Pipo", "hornero");
pajaro1.hacerSonido();
pajaro1.volar();

const zorro1 = new Zorro("Firulais", "Zorro colorado);
zorro1.hacerSonido();
