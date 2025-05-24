
import { PrismaClient } from "../generated/prisma/client.js";

const globalForPrisma = globalThis;

const db = globalForPrisma.prisma || new PrismaClient({
  log: ["query"], // Opcional: puedes quitar esto si no quieres logs
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db; // Corregido: asigna db a global
}

export default db;