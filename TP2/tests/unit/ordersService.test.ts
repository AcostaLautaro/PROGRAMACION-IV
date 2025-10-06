import { OrdersService } from "../../src/services/ordersService";

describe("OrdersService", () => {
  it("debe crear un pedido con precio calculado", () => {
    const service = new OrdersService();
    const order = service.createOrder({
      size: "M",
      toppings: ["queso", "jamon"],
      address: "Av. Siempre Viva 742"
    });

    expect(order.price).toBe(1500 + 2 * 200);
    expect(order.status).toBe("pending");
    expect(order.id).toBe(1);
  });
});
