abstract class FiguraGeometrica {
    constructor(protected nombre: string){}
    abstract calcularArea(): number;
    mostrarDatos(): void {
        console.log(`Figura: ${this.nombre}, Area: ${this.calcularArea()}`)
    }
}
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

const Figura1: Cuadrado = new Cuadrado(5);
Figura1.mostrarDatos();
const Figura2: Circulo = new Circulo(3);
Figura2.mostrarDatos();
const Figura3: Triangulo = new Triangulo(3 , 5);
Figura3.mostrarDatos();