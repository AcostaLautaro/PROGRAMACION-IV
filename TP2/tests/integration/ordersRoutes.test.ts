import { service as ordersService } from "../../src/routes/ordersRoutes";
import request from "supertest";
import { makeApp } from "../../src/app";


const app = makeApp();

describe("POST /orders", () => {
  it("debe crear un pedido válido", async () => {
    const res = await request(app)
      .post("/orders")
      .send({
        size: "S",
        toppings: ["jamon"],
        address: "Calle Falsa 1234"
      });

    expect(res.status).toBe(201);
    expect(res.body.price).toBe(1000 + 200);
  });

  it("debe fallar si la dirección es muy corta", async () => {
    const res = await request(app)
      .post("/orders")
      .send({
        size: "S",
        toppings: [],
        address: "corta"
      });

    expect(res.status).toBe(422);
  });
});

describe("GET /order/:id", () => {
  it("debe devolver el pedido por id", async () => {
    const createRes = await request(app)
      .post("/orders")
      .send({
        size: "M",
        toppings: ["jamon", "queso"],
        address: "Av. Siempre Viva 742"
      });

    const orderId = createRes.body.id;

    const getRes = await request(app).get(`/orders/${orderId}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(orderId);
    expect(getRes.body.size).toBe("M");
  });

  it("debe devolver 404 si el pedido no existe", async () => {
    const res = await request(app).get("/orders/999");
    expect(res.status).toBe(404);
  });
});

describe("POST /orders/:id/cancel", () => {
  it("debe cancelar un pedido pendiente", async () => {
    const createRes = await request(app)
      .post("/orders")
      .send({
        size: "M",
        toppings: ["jamon"],
        address: "Av. Siempre Viva 742"
      });

    const id = createRes.body.id;

    const cancelRes = await request(app).post(`/orders/${id}/cancel`);
    expect(cancelRes.status).toBe(200);
    expect(cancelRes.body.status).toBe("cancelled");
  });

  it("debe devolver 409 si el pedido ya fue entregado", async () => {
  const createRes = await request(app)
    .post("/orders")
    .send({
      size: "L",
      toppings: ["jamon", "queso"],
      address: "Av. Rivadavia 1000"
    });

  const id = createRes.body.id;

  // marcamos como entregado en la instancia real
  const order = ordersService.getOrderById(id);
  if (order) order.status = "delivered";

  const res = await request(app).post(`/orders/${id}/cancel`);
  expect(res.status).toBe(409);
});

describe("GET /orders?status", () => {
  it("debe listar pedidos filtrados por estado", async () => {
    // Creamos 2 pedidos
    const p1 = await request(app).post("/orders").send({
      size: "S",
      toppings: ["jamon"],
      address: "Av. 1"
    });
    const p2 = await request(app).post("/orders").send({
      size: "M",
      toppings: ["queso"],
      address: "Av. 2"
    });

    // Cancelamos el primero
    await request(app).post(`/orders/${p1.body.id}/cancel`);

    // Obtenemos solo los cancelados
    const res = await request(app).get("/orders?status=cancelled");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every((o: any) => o.status === "cancelled")).toBe(true);
  });

  it("debe devolver todos si no se pasa status", async () => {
    const res = await request(app).get("/orders");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});




});
