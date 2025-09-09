export abstract class Empleado {
    constructor(public nombre: string, public salarioBase: number) {}

    abstract calcularSalario(): number;
}