"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tecnico = exports.Persona = void 0;
class Persona {
    nombre;
    constructor(nombre) {
        this.nombre = nombre;
    }
}
exports.Persona = Persona;
class Tecnico extends Persona {
    constructor(nombre) {
        super(nombre);
    }
}
exports.Tecnico = Tecnico;
//# sourceMappingURL=persona.js.map