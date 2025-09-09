import { FiguraGeometrica } from "./FiguraGeometrica";

export class Circulo extends FiguraGeometrica {
    constructor(private radio = 0 ){
        super("Circulo");
    }
    
    calcularArea(): number {
        return this.radio * this.radio * 3.141592;
    }

    override mostrarDatos(): void {
        super.mostrarDatos();
        console.log(`Radio: ${this.radio}`);
    }
}