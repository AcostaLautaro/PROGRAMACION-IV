"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perro = void 0;
class Perro {
    raza;
    constructor(raza = "Mezcla") {
        this.raza = raza;
    }
    hacerSonido() {
        console.log("GUAU!");
    }
    moverse() {
        console.log(`El ${this.raza} camina moviendo la cola`);
    }
}
exports.Perro = Perro;
//# sourceMappingURL=perro.js.map