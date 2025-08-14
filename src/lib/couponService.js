export async function findCoupon(code) {
  try {
    const res = await fetch("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    if (!res.ok)
      return { valid: false, message: data.message || "Error desconocido" };

    return data;
  } catch (error) {
    console.error("Error en fetch findCoupon:", error);
    return { valid: false, message: "Error de red al validar cupón" };
  }
}
