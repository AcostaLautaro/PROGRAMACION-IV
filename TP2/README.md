# Trabajo practico 2 - pizzeria API 

### Tecnologias
- TypeScript  
- Express  
- Zod  
- Jest + Supertest (Testing)

---

##  Scripts


npm run dev     # iniciar servidor
npm test        # correr tests + coverage

## Ejemplos CURL
# Crear pedido
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"size":"M","toppings":["jamon","queso"],"address":"Av. Siempre Viva 742"}'

# Obtener pedido por id
curl http://localhost:3000/order/1

# Cancelar pedido
curl -X POST http://localhost:3000/orders/1/cancel

# Listar pedidos cancelados
curl "http://localhost:3000/orders?status=cancelled"

## Endpoints
| Metodo | Ruta                 | Descripcion                         |
| ------ | -------------------- | ----------------------------------- |
| POST   | `/orders`            | Crea un pedido                      |
| GET    | `/order/:id`         | Obtiene un pedido por ID            |
| POST   | `/orders/:id/cancel` | Cancela un pedido pendiente         |
| GET    | `/orders?status`     | Lista pedidos por estado (opcional) |

Reglas de negocio

Tamaño ∈ {S, M, L}

Max. 5 toppings

Precio = base + 200 por topping

No se puede cancelar si el pedido fue entregado

address ≥ 10 caracteres

Error 422 → datos invalidos

Error 409 → cancelar entregado

## Matriz de casos

| ID  | Caso / Descripción         | Input                    | Acción                | Resultado esperado  | Test |
| --- | -------------------------- | ------------------------ | --------------------- | ------------------- | ---- |
| CA1 | Crear pedido válido        | size=M, toppings=[jamon] | POST /orders          | 201 + pedido creado | ✔️   |
| CA2 | Dirección muy corta        | address="corta"          | POST /orders          | 422 error           | ✔️   |
| CA3 | Obtener pedido existente   | id=1                     | GET /order/1          | 200 + JSON pedido   | ✔️   |
| CA4 | Obtener pedido inexistente | id=999                   | GET /order/999        | 404 error           | ✔️   |
| CA5 | Cancelar pedido pendiente  | id=1                     | POST /orders/1/cancel | 200 + cancelled     | ✔️   |
| CA6 | Cancelar pedido entregado  | status=delivered         | POST /orders/1/cancel | 409 error           | ✔️   |
| CA7 | Listar pedidos cancelados  | status=cancelled         | GET /orders?status    | 200 + array         | ✔️   |
| CA8 | Listar todos los pedidos   | sin status               | GET /orders           | 200 + todos         | ✔️   |

## User Stories

1. Crear pedido 

2. Consultar pedido por ID 

3. Cancelar pedido pendiente 

4. Listar pedidos por estado 

## Coverage

98% statements, 100% funcs, 100% lines
Tests unitarios + de integración completos


