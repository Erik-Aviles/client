// lib/couponService.js (ejemplo en lib, porque maneja "consulta externa")

import { coupons } from "@/utils/general/coupons";


/**
 * Simula una consulta asíncrona a base de datos para buscar un cupón por código.
 * @param {string} code Código del cupón
 * @returns {Promise<object|null>} Devuelve el cupón o null si no existe
 */
export async function findCoupon(code) {
  // Simulación de delay para imitar llamada a API o DB
  await new Promise((resolve) => setTimeout(resolve, 300));

  const normalizedCode = code.trim().toUpperCase();

  // Aquí podrías hacer fetch real a tu backend o DB en producción

  // Por ahora devuelve de la lista simulada
  const coupon = coupons.find((c) => c.code === normalizedCode); 

  return coupon || null;
}
