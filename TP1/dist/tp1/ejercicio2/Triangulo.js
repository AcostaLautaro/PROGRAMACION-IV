"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangulo = void 0;
const FiguraGeometrica_1 = require("./FiguraGeometrica");
class Triangulo extends FiguraGeometrica_1.FiguraGeometrica {
    base;
    altura;
    constructor(base = 0, altura = 0) {
        super("Triangulo");
        this.base = base;
        this.altura = altura;
    }
    calcularArea() {
        return (this.base * this.altura) / 2;
    }
    mostrarDatos() {
        super.mostrarDatos();
        console.log(`Base: ${this.base}, Altura: ${this.altura}`);
    }
}
exports.Triangulo = Triangulo;
//# sourceMappingURL=Triangulo.js.map