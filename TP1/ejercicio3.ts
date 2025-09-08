abstract class Empleado {
    constructor(public nombre: string, public salarioBase: number) {}

    abstract calcularSalario(): number;
}

class EmpleadoTiempoCompleto extends Empleado {
    calcularSalario(): number{
        return this.salarioBase +20000;
    }
}

class EmpleadoMedioTiempo extends Empleado {
    calcularSalario(): number {
        return this.salarioBase * 0.5;
    }
}

//probamos un par de empleados con un arreglo
const empleados: Empleado[] = [
    new EmpleadoTiempoCompleto("Lautaro", 80000),
    new EmpleadoMedioTiempo("Juan", 60000),
    new EmpleadoTiempoCompleto("Gabriel",90000)
];

empleados.forEach(e =>{
    console.log(`${e.nombre} cobra: $${e.calcularSalario()}`);
});
