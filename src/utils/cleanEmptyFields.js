// utils/cleanEmptyFields.js
export function cleanEmptyFields(obj) {
  if (Array.isArray(obj)) {
    return obj
      .map(cleanEmptyFields)
      .filter((item) => item !== undefined);
  }
  if (obj !== null && typeof obj === "object") {
    const newObj = {};
    for (const [k, v] of Object.entries(obj)) {
      const cleaned = cleanEmptyFields(v);
      if (
        cleaned !== undefined &&
        cleaned !== null &&
        (typeof cleaned !== "object" ||
          (Array.isArray(cleaned) ? cleaned.length : Object.keys(cleaned).length))
      ) {
        newObj[k] = cleaned;
      }
    }
    return Object.keys(newObj).length ? newObj : undefined;
  }
  return obj;
}
