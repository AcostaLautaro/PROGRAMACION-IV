"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiguraGeometrica = void 0;
class FiguraGeometrica {
    nombre;
    constructor(nombre) {
        this.nombre = nombre;
    }
    mostrarDatos() {
        console.log(`Figura: ${this.nombre}, Area: ${this.calcularArea()}`);
    }
}
exports.FiguraGeometrica = FiguraGeometrica;
//# sourceMappingURL=FiguraGeometrica.js.map