"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gato = void 0;
class Gato {
    raza;
    constructor(raza = "Michu") {
        this.raza = raza;
    }
    hacerSonido() {
        console.log("MIAU");
    }
    moverse() {
        console.log(`El gato ${this.raza} camina agazapado hacia un ratón`);
    }
}
exports.Gato = Gato;
//# sourceMappingURL=gato.js.map