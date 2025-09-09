"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cuadrado = void 0;
const FiguraGeometrica_1 = require("./FiguraGeometrica");
class Cuadrado extends FiguraGeometrica_1.FiguraGeometrica {
    lado;
    constructor(lado = 0) {
        super("Cuadrado");
        this.lado = lado;
    }
    calcularArea() {
        return this.lado * this.lado;
    }
    mostrarDatos() {
        super.mostrarDatos();
        console.log(`Lado: ${this.lado}`);
    }
}
exports.Cuadrado = Cuadrado;
//# sourceMappingURL=Cuadrado.js.map