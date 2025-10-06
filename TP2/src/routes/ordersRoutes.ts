import express from "express";
import { z } from "zod";
import { OrdersService } from "../services/ordersService";

const router = express.Router();
const service = new OrdersService();

const createOrderSchema = z.object({
  size: z.enum(["S", "M", "L"]),
  toppings: z.array(z.string()).max(5),
  address: z.string().min(10)
});

router.post("/", (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(422).json({ error: parsed.error.errors });

  const order = service.createOrder(parsed.data);
  res.status(201).json(order);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const order = service.getOrderById(id);

  if (!order) return res.status(404).json({ error: "Pedido no encontrado" });
  res.json(order);
});

router.post("/:id/cancel", (req, res) => {
  const id = Number(req.params.id);
  try {
    const cancelled = service.cancelOrder(id);
    if (!cancelled) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(cancelled);
  } catch (err: any) {
    if (err.message === "delivered") {
      return res.status(409).json({ error: "No se puede cancelar un pedido entregado" });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/", (req, res) => {
  const status = req.query.status as "pending" | "delivered" | "cancelled" | undefined;
  const orders = service.getOrders(status);
  res.json(orders);
});



export default router;
export { service };

