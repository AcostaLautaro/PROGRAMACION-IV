import { Perro, Gato } from './Ejercicio1';
import { Cuadrado, Circulo, Triangulo } from './Ejercicio2';

let Perro1: Perro = new Perro("Border Collie");
Perro1.hacerSonido();
Perro1.moverse();

let Gato1: Gato = new Gato("Naranja");
Gato1.hacerSonido();
Gato1.moverse();

const Figura1: Cuadrado = new Cuadrado(5);
Figura1.mostrarDatos();


const Figura2: Circulo = new Circulo(3);
Figura2.mostrarDatos();

const Figura3: Triangulo = new Triangulo(3 , 5);
Figura3.mostrarDatos();
