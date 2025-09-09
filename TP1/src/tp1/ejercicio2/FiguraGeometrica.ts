export abstract class FiguraGeometrica {
    constructor(protected nombre: string){}
    abstract calcularArea(): number;
    mostrarDatos(): void {
        console.log(`Figura: ${this.nombre}, Area: ${this.calcularArea()}`)
    }
}