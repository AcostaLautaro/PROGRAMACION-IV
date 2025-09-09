import { Empleado } from "./Empleado";

export class EmpleadoTiempoCompleto extends Empleado {
    calcularSalario(): number{
        return this.salarioBase +20000;
    }
}