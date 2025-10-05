import express from "express";
import { z } from "zod";
import ordersRoutes from "./routes/ordersRoutes";

export function makeApp() {
  const app = express();
  app.use(express.json());
  app.use("/orders", ordersRoutes);
  return app;
}
