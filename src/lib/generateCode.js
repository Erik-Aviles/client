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

  const randomSuffix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `${formattedItem1}-${formattedItem2}@${randomSuffix}`;
}

function generatePersonCode(
  nameCompany,
  namePerson,
  idDocument,
  role = "person"
) {
  const formattedCompany = nameCompany
    ?.split(" ")
    .filter(Boolean)
    .map((word) =>
      word
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 2)
    )
    .join("");

  const formattedPerson = namePerson
    ?.split(" ")
    .filter(Boolean)
    .map((word) =>
      word
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 1)
    )
    .join("");

  const formattedId = String(idDocument)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-4)
    .toUpperCase();

  const formattedRole = role
    ?.replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 3);

  const randomSuffix = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(4, "0");

  return `${formattedCompany}-${formattedRole}${formattedPerson}${randomSuffix}${formattedId}`;
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
