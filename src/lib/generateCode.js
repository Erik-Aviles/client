function stableHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 10000).toString().padStart(4, "0");
}

function generateCouponCode(item1, item2) {
  const formattedItem1 =
    item1?.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() || "ITEM";

  let formattedItem2 = "000000"; // valor por defecto

  if (/^\d{4}-\d{2}-\d{2}$/.test(item2)) {
    const [year, month, day] = item2.split("-").map(Number);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      formattedItem2 = `${year.toString().slice(-2)}${month
        .toString()
        .padStart(2, "0")}${day.toString().padStart(2, "0")}`;
    }
  }

  const suffix = stableHash(`${formattedItem1}${formattedItem2}`);

  return `${formattedItem1}-${formattedItem2}@${suffix}`;
}

/**
 * Genera un código único y estable para proveedores o personas relacionadas a una empresa.
 * El código solo cambia si cambian los datos base.
 *
 * @param {string} nameCompany - Nombre de la empresa
 * @param {string} namePerson - Nombre completo de la persona
 * @param {string|number} idDocument - Documento de identificación
 * @param {string} role - Rol de la persona (ej: SUPPLIER, CUSTOMER, etc.)
 * @returns {string} Código único en formato: {COMP}-{ROLE}{PERS}-{ID}{HASH}
 */
function generatePersonCode(nameCompany, namePerson, idDocument, role = "person") {
  if (!nameCompany || !namePerson || !idDocument) {
    throw new Error("Faltan datos para generar el código del proveedor");
  }

  // Formatear nombre de la empresa (primeras 2 letras de cada palabra)
  const formattedCompany = nameCompany
    .split(" ")
    .filter(Boolean)
    .map((word) =>
      word.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 2)
    )
    .join("")
    .slice(0, 4);

  // Iniciales de la persona (1 letra por palabra)
  const formattedPerson = namePerson
    .split(" ")
    .filter(Boolean)
    .map((word) =>
      word.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 1)
    )
    .join("")
    .slice(0, 3);

  // Últimos 4 caracteres del documento
  const formattedId = String(idDocument)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-4)
    .toUpperCase();

  // Rol (primeras 3 letras)
  const formattedRole = role
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 3);

  // Generar hash determinístico simple (djb2)
  const strToHash = `${nameCompany}${namePerson}${idDocument}${role}`;
  let hash = 5381;
  for (let i = 0; i < strToHash.length; i++) {
    hash = (hash * 33) ^ strToHash.charCodeAt(i);
  }
  const shortHash = (hash >>> 0).toString(16).slice(0, 4).toUpperCase();

  // Construcción final del código
  return `${formattedCompany}-${formattedRole}${formattedPerson}-${formattedId}${shortHash}`;
}

function generateUniqueProductCode(nameCompany, productName, numberLength = 4) {
  if (!productName || !nameCompany) return "";

  const formattedCompany = nameCompany
    .split(" ")
    .filter(Boolean)
    .map((word) =>
      word
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 1)
    )
    .join("");

  let prefix = productName.trim().slice(0, 3).toUpperCase();
  if (prefix.length < 3) prefix = prefix.padEnd(3, "X");

  const randomNumber = Math.floor(Math.random() * Math.pow(10, numberLength))
    .toString()
    .padStart(numberLength, "0");

  return `${formattedCompany}${prefix}${randomNumber}`;
}

export { generatePersonCode, generateCouponCode, generateUniqueProductCode };
