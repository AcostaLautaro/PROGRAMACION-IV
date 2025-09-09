"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circulo = void 0;
const FiguraGeometrica_1 = require("./FiguraGeometrica");
class Circulo extends FiguraGeometrica_1.FiguraGeometrica {
    radio;
    constructor(radio = 0) {
        super("Circulo");
        this.radio = radio;
    }
    calcularArea() {
        return this.radio * this.radio * 3.141592;
    }
    mostrarDatos() {
        super.mostrarDatos();
        console.log(`Radio: ${this.radio}`);
    }
}
exports.Circulo = Circulo;
//# sourceMappingURL=Circulo.js.map