```md
# TEORÍA - Trabajo Práctico 2

### 1. Ciclo Rojo → Verde → Refactor
Es la base del TDD. Primero se escribe un test que falla (rojo), luego la minima implementacion para que pase (verde), y finalmente se mejora el codigo manteniendo los tests en verde (refactor). Los pasos pequeños reducen errores y facilitan entender el progreso.

---

### 2. Tipos de tests
- **Unitarios:** prueban funciones o servicios aislados.  
- **Integración:** prueban la interacción entre módulos (por ejemplo, endpoints HTTP con Supertest).  
- **E2E:** prueban todo el flujo completo como lo haría un usuario real.

---

### 3. Dobles de prueba
Simulan dependencias.  
- **Mock:** reemplazo que simula comportamiento y verifica llamadas.  
- **Stub:** devuelve datos fijos.  
- **Spy:** observa llamadas reales sin reemplazar la funcion.  
Usar mocks/stubs cuando dependencias externas harían los tests lentos o inestables.

---

### 4. Separar app y server
Permite testear sin iniciar el servidor real.  
Ejemplo:
```ts
// app.ts
export function makeApp() {
  const app = express();
  app.use(routes);
  return app;
}

Y en test:
import request from "supertest";
import { makeApp } from "../src/app";
request(makeApp()).get("/orders");

5. Zod: parse vs safeParse

parse() lanza excepción si falla.

safeParse() devuelve {success, data/error}.
En Express conviene safeParse para manejar errores con 422 sin romper la app.

6. Reglas de dominio con tests unitarios

Ejemplos:

No cancelar pedido entregado.

Calcular precio según tamaño y toppings.

7. Malos olores en tests

Nombres poco descriptivos.

Código duplicado en setup.

Asserts débiles o mocks frágiles.

8. Trazabilidad CA ↔ Tests

Relacionar cada caso con su test.

Caso	Test
CA5 Cancelar pedido pendiente	ordersRoutes.test.ts → “debe cancelar un pedido pendiente”
CA6 Cancelar pedido entregado	ordersRoutes.test.ts → “debe devolver 409…”
9. Por qué no buscar 100% cobertura

Podroa incentivar tests superficiales o forzados. Lo importante es cubrir logica critica, no lineas triviales.

10. Helpers/Builders en tests

Funciones que facilitan crear datos repetidos.
Ejemplo:
function makeOrderData(size="M") {
  return { size, toppings:["queso"], address:"Av. Siempre Viva 742" };
}

Permite escribir tests más limpios.

---



