import { FiguraGeometrica } from "./FiguraGeometrica";

export class Triangulo extends FiguraGeometrica {
    constructor(private base = 0, private altura = 0){
        super("Triangulo");
    }

    calcularArea(): number {
        return (this.base * this.altura) / 2;
    }

    override mostrarDatos(): void {
        super.mostrarDatos();
        console.log(`Base: ${this.base}, Altura: ${this.altura}`);
    }
}