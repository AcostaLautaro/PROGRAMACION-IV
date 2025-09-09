import { Perro } from "./tp1/ejercicio1/perro";
import { Gato } from "./tp1/ejercicio1/gato";
import { Cuadrado } from "./tp1/ejercicio2/Cuadrado";
import { Circulo } from "./tp1/ejercicio2/Circulo";
import { Triangulo } from "./tp1/ejercicio2/Triangulo";

let Perro1 = new Perro("Border Collie");
Perro1.hacerSonido();
Perro1.moverse();

let Gato1 = new Gato("Naranja");
Gato1.hacerSonido();
Gato1.moverse();

const Figura1 = new Cuadrado(5);
Figura1.mostrarDatos();
const Figura2 = new Circulo(3);
Figura2.mostrarDatos();
const Figura3 = new Triangulo(3 , 5);
Figura3.mostrarDatos();
