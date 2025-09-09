"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moto = void 0;
const Vehiculo_1 = require("./Vehiculo");
class Moto extends Vehiculo_1.Vehiculo {
    mostrarInfo() {
        console.log(`Moto ${this.marca} ${this.modelo}`);
    }
    cargarBateria() {
        console.log(`La moto electrica ${this.marca} se cargo por completo`);
    }
}
exports.Moto = Moto;
//# sourceMappingURL=Moto.js.map