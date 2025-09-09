"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zorro = void 0;
const ClaseAnimal_1 = require("./ClaseAnimal");
class Zorro extends ClaseAnimal_1.Animal {
    especie;
    constructor(nombre, especie) {
        super(nombre);
        this.especie = especie;
    }
    hacerSonido() {
        console.log(`${this.nombre} (${this.especie})  gruñe`);
    }
}
exports.Zorro = Zorro;
//# sourceMappingURL=Zorro.js.map