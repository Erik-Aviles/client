import { normalizeText, removePluralEnding, removeStopWords } from "@/utils/formats/normalized";

export function HighlightMatches({ text, search }) {
  if (!text || typeof text !== "string") return text;

  // ⛔️ Ignorar si es URL

  if (!search || search.length < 3) return text;

  const cleanSearch = removeStopWords(normalizeText(search));
  const searchParts = cleanSearch
    .split(" ")
    .map((part) => removePluralEnding(part))
    .filter(Boolean);

  if (searchParts.length === 0) return text;

  const regex = new RegExp(`(${searchParts.join("|")})`, "gi");

  return (
    <>
      {text.split(regex).map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-yellow-200 text-black px-1 rounded dark:bg-amber-600/30 dark:text-white"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}
