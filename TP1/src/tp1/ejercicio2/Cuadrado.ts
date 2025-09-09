import { FiguraGeometrica } from "./FiguraGeometrica";

export class Cuadrado extends FiguraGeometrica {
    constructor(private lado = 0){
        super("Cuadrado");
    }

    calcularArea(): number {
        return this.lado * this.lado;
    }

    override mostrarDatos(): void {
        super.mostrarDatos();
        console.log(`Lado: ${this.lado}`);
    }
}