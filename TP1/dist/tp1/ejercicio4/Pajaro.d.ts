import { Animal } from "./ClaseAnimal";
import { Volador } from "./Volador";
export declare class Pajaro extends Animal implements Volador {
    private especie;
    constructor(nombre: string, especie: string);
    hacerSonido(): void;
    volar(): void;
}
//# sourceMappingURL=Pajaro.d.ts.map