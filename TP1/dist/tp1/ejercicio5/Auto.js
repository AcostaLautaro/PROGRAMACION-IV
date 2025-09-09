"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
const Vehiculo_1 = require("./Vehiculo");
class Auto extends Vehiculo_1.Vehiculo {
    mostrarInfo() {
        console.log(`Auto ${this.marca} ${this.modelo}`);
    }
}
exports.Auto = Auto;
//# sourceMappingURL=Auto.js.map