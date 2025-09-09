"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pajaro = void 0;
const ClaseAnimal_1 = require("./ClaseAnimal");
class Pajaro extends ClaseAnimal_1.Animal {
    especie;
    constructor(nombre, especie) {
        super(nombre);
        this.especie = especie;
    }
    hacerSonido() {
        console.log(`${this.nombre} (${this.especie})  pio pio`);
    }
    volar() {
        console.log(`${this.nombre} (${this.especie}) esta volando`);
    }
}
exports.Pajaro = Pajaro;
//# sourceMappingURL=Pajaro.js.map