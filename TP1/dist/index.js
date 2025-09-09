"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perro_1 = require("./tp1/ejercicio1/perro");
const gato_1 = require("./tp1/ejercicio1/gato");
const Cuadrado_1 = require("./tp1/ejercicio2/Cuadrado");
const Circulo_1 = require("./tp1/ejercicio2/Circulo");
const Triangulo_1 = require("./tp1/ejercicio2/Triangulo");
const EmpleadoTiempoCompleto_1 = require("./tp1/ejercicio3/EmpleadoTiempoCompleto");
const EmpleadoMedioTiempo_1 = require("./tp1/ejercicio3/EmpleadoMedioTiempo");
const Pajaro_1 = require("./tp1/ejercicio4/Pajaro");
const Zorro_1 = require("./tp1/ejercicio4/Zorro");
const Auto_1 = require("./tp1/ejercicio5/Auto");
const Moto_1 = require("./tp1/ejercicio5/Moto");
// Cargamos Animales con la INTERFAZ de Animal
let Perro1 = new perro_1.Perro("Border Collie");
Perro1.hacerSonido();
Perro1.moverse();
let Gato1 = new gato_1.Gato("Naranja");
Gato1.hacerSonido();
Gato1.moverse();
//Creamos algunas figuras
const Figura1 = new Cuadrado_1.Cuadrado(5);
Figura1.mostrarDatos();
const Figura2 = new Circulo_1.Circulo(3);
Figura2.mostrarDatos();
const Figura3 = new Triangulo_1.Triangulo(3, 5);
Figura3.mostrarDatos();
//Cargamos unos Empleados
const empleados = [
    new EmpleadoTiempoCompleto_1.EmpleadoTiempoCompleto("Lautaro", 80000),
    new EmpleadoMedioTiempo_1.EmpleadoMedioTiempo("Juan", 60000),
    new EmpleadoTiempoCompleto_1.EmpleadoTiempoCompleto("Gabriel", 90000)
];
empleados.forEach(e => {
    console.log(`${e.nombre} cobra: $${e.calcularSalario()}`);
});
//cargamos unos animales con la CLASE Animal y la INTERFAZ Volador
const pajaro1 = new Pajaro_1.Pajaro("Pipo", "hornero");
pajaro1.hacerSonido();
pajaro1.volar();
const zorro1 = new Zorro_1.Zorro("Firulais", "Zorro colorado");
zorro1.hacerSonido();
//carga de vehiculos
const auto1 = new Auto_1.Auto("Toyota", "Corolla");
const moto1 = new Moto_1.Moto("Motomel", "Blitz"); //ej unicamente, ya que no es electrica 
auto1.mostrarInfo();
moto1.mostrarInfo();
moto1.cargarBateria();
//# sourceMappingURL=index.js.map