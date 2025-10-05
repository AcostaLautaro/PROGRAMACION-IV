export type Order = {
  id: number;
  size: "S" | "M" | "L";
  toppings: string[];
  address: string;
  status: "pending" | "delivered" | "cancelled";
  price: number;
};

export class OrdersService {
  private orders: Order[] = [];
  private nextId = 1;

  createOrder(data: Omit<Order, "id" | "status" | "price">): Order {
    const basePrice = { S: 1000, M: 1500, L: 2000 }[data.size];
    const price = basePrice + data.toppings.length * 200;

    const order: Order = {
      id: this.nextId++,
      status: "pending",
      price,
      ...data,
    };

    this.orders.push(order);
    return order;
  }

  getOrderById(id: number) {
  const order = this.orders.find(o => o.id === id);
  if (!order) return null;
  return order;
}

cancelOrder(id: number) {
  const order = this.orders.find(o => o.id === id);
  if (!order) return null;

  if (order.status === "delivered") {
    throw new Error("delivered");
  }

  order.status = "cancelled";
  return order;
}

getOrders(status?: "pending" | "delivered" | "cancelled") {
  if (status) return this.orders.filter(o => o.status === status);
  return this.orders;
}




}

