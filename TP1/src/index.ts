import { Perro } from "./tp1/ejercicio1/perro";
import { Gato } from "./tp1/ejercicio1/gato";
import { Cuadrado } from "./tp1/ejercicio2/Cuadrado";
import { Circulo } from "./tp1/ejercicio2/Circulo";
import { Triangulo } from "./tp1/ejercicio2/Triangulo";
import { Empleado } from "./tp1/ejercicio3/Empleado";
import { EmpleadoTiempoCompleto } from "./tp1/ejercicio3/EmpleadoTiempoCompleto";
import { EmpleadoMedioTiempo } from "./tp1/ejercicio3/EmpleadoMedioTiempo";
import { Pajaro } from "./tp1/ejercicio4/Pajaro";
import { Zorro } from "./tp1/ejercicio4/Zorro";
import { Auto } from "./tp1/ejercicio5/Auto";
import { Moto } from "./tp1/ejercicio5/Moto";

// Cargamos Animales con la INTERFAZ de Animal
let Perro1 = new Perro("Border Collie");
Perro1.hacerSonido();
Perro1.moverse();

let Gato1 = new Gato("Naranja");
Gato1.hacerSonido();
Gato1.moverse();

//Creamos algunas figuras
const Figura1 = new Cuadrado(5);
Figura1.mostrarDatos();
const Figura2 = new Circulo(3);
Figura2.mostrarDatos();
const Figura3 = new Triangulo(3 , 5);
Figura3.mostrarDatos();

//Cargamos unos Empleados
const empleados: Empleado[] = [
    new EmpleadoTiempoCompleto("Lautaro", 80000),
    new EmpleadoMedioTiempo("Juan", 60000),
    new EmpleadoTiempoCompleto("Gabriel",90000)
];

empleados.forEach(e =>{
    console.log(`${e.nombre} cobra: $${e.calcularSalario()}`);
});

//cargamos unos animales con la CLASE Animal y la INTERFAZ Volador
const pajaro1 = new Pajaro("Pipo", "hornero");
pajaro1.hacerSonido();
pajaro1.volar();

const zorro1 = new Zorro("Firulais", "Zorro colorado");
zorro1.hacerSonido();

//carga de vehiculos
const auto1 = new Auto("Toyota", "Corolla");
const moto1 = new Moto("Motomel", "Blitz"); //ej unicamente, ya que no es electrica 

auto1.mostrarInfo();
moto1.mostrarInfo();
moto1.cargarBateria();