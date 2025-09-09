"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoTiempoCompleto = void 0;
const Empleado_1 = require("./Empleado");
class EmpleadoTiempoCompleto extends Empleado_1.Empleado {
    calcularSalario() {
        return this.salarioBase + 20000;
    }
}
exports.EmpleadoTiempoCompleto = EmpleadoTiempoCompleto;
//# sourceMappingURL=EmpleadoTiempoCompleto.js.map