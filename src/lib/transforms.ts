/** biome-ignore-all lint/performance/useTopLevelRegex: <Inline regex is ok for a regex based library, after all it's not in userland> */
import { addStep } from "../string-transform";

/**
 * Converts all characters in the string to uppercase.
 * @returns API for chaining.
 */
function toUpperCase() {
  return addStep("toUpperCase", (v: string) => v.toUpperCase());
}

/**
 * Converts all characters in the string to lowercase.
 * @returns API for chaining.
 */
function toLowerCase() {
  return addStep("toLowerCase", (v: string) => v.toLowerCase());
}

/**
 * Converts the string to PascalCase (every word capitalized, no delimiters).
 * @returns API for chaining.
 */
function toPascalCase() {
  return addStep("toPascalCase", (v: string) =>
    v
      .replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
      .replace(/[\s_-]+/g, ""),
  );
}

/**
 * Converts the string to snake_case.
 * @returns API for chaining.
 */
function toSnakeCase() {
  return addStep("toSnakeCase", (v: string) =>
    v
      .replace(/\s+/g, "_")
      .replace(/([a-z\d])([A-Z])/g, "$1_$2")
      .replace(/-+/g, "_")
      .replace(/__+/g, "_")
      .toLowerCase(),
  );
}

/**
 * Converts the string to camelCase.
 * @returns API for chaining.
 */
function toCamelCase() {
  return addStep("toCamelCase", (v: string) =>
    v
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
      .replace(/^(.)/, (m) => m.toLowerCase()),
  );
}

/**
 * Trims whitespace from the beginning and end of the string.
 * @returns API for chaining.
 */
function trim() {
  return addStep("trim", (v: string) => v.trim());
}

/**
 * Splits the string into parts using the given separator, then allows you to pick a specific part or join the parts back.
 * @param splitter Separator string or RegExp.
 * @returns Object with takeThatAt and join methods for further chaining.
 */
function split(splitter?: string | RegExp) {
  return {
    /**
     * Picks the part at the given index after splitting.
     * @param index Index of part to select.
     * @returns API for chaining.
     */
    takeThatAt(index: number) {
      return addStep("takeThatAt", (v: string) => {
        const arr = v.split(splitter ?? "");
        if (index < 0 || index >= arr.length) {
          throw new Error("Index out of range");
        }
        return arr[index];
      });
    },
    /**
     * Joins all parts after splitting using the given separator (default is empty string).
     * @param sep String to use between joined parts.
     * @returns API for chaining.
     */
    join(sep = "") {
      return addStep("join", (v: string) => v.split(splitter ?? "").join(sep));
    },
  };
}

/**
 * Converts the string to its hexadecimal character codes.
 * @returns API for chaining.
 */
function toHex() {
  return addStep("toHex", (v: string) =>
    Array.from(v)
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(""),
  );
}

/**
 * Converts the string to its binary character codes.
 * @returns API for chaining.
 */
function toBinary() {
  return addStep("toBinary", (v: string) =>
    Array.from(v)
      .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" "),
  );
}

/**
 * Encodes the string using encodeURIComponent (URL-safe encoding).
 * @returns API for chaining.
 */
function toURLSafe() {
  return addStep("toURLSafe", (v: string) => encodeURIComponent(v));
}

/**
 * Gets the character at the given index in the string.
 * @param index The position of the character to get.
 * @returns API for chaining.
 */
function getCharacterAt(index: number) {
  return addStep("getCharacterAt", (v: string) => v.charAt(index));
}

/**
 * Gets a random character from the string.
 * @returns API for chaining.
 */
function getRandomFrom() {
  return addStep("getRandomFrom", (v: string) =>
    v.charAt(Math.floor(Math.random() * v.length)),
  );
}

/**
 * Removes spaces, digits, or special characters from the string, depending on options.
 * @param opts Sanitization options.
 * @returns API for chaining.
 */
function sanitize(opts?: {
  removeSpaces?: boolean;
  removeDigits?: boolean;
  removeSpecial?: boolean;
}) {
  return addStep("sanitize", (v: string) => {
    let s = v;
    if (opts?.removeSpaces) {
      s = s.replace(/\s+/g, "");
    }
    if (opts?.removeDigits) {
      s = s.replace(/\d+/g, "");
    }
    if (opts?.removeSpecial) {
      s = s.replace(/[^\w\s]/g, "");
    }
    return s;
  });
}

/**
 * Sorts the characters of this string together with another string, producing a new sorted string.
 * @param str Another string to mix in.
 * @returns API for chaining.
 */
function anagram(str: string) {
  return addStep("anagram", (v: string) =>
    [...v, ...str].sort((a, b) => a.localeCompare(b)).join(""),
  );
}

/**
 * Replaces the first occurrence of a substring or pattern with a replacement string.
 * @param search String or RegExp to search for.
 * @param rep Replacement string.
 * @returns API for chaining.
 */
function replace(search: string | RegExp, rep: string) {
  return addStep("replace", (v: string) => v.replace(search, rep));
}

/**
 * Replaces all occurrences of a substring or pattern with a replacement string.
 * @param search String or RegExp to search for.
 * @param rep Replacement string.
 * @returns API for chaining.
 */
function replaceAll(search: string | RegExp, rep: string) {
  return addStep("replaceAll", (v: string) => {
    if (typeof search === "string") {
      return v.split(search).join(rep);
    }
    return v.replace(new RegExp(search, "g"), rep);
  });
}

/**
 * Removes the first occurrence of a substring or pattern from the string.
 * @param what String or RegExp to remove.
 * @returns API for chaining.
 */
function removeFirst(what: string | RegExp) {
  return addStep("removeFirst", (v: string) => v.replace(what, ""));
}

/**
 * Removes all occurrences of a substring or pattern from the string.
 * @param what String or RegExp to remove.
 * @returns API for chaining.
 */
function removeAll(what: string | RegExp) {
  return addStep("removeAll", (v: string) =>
    typeof what === "string"
      ? v.split(what).join("")
      : v.replace(new RegExp(what, "g"), ""),
  );
}

/**
 * Adds a prefix and/or suffix to the string.
 * @param prefixOrSuffix Prefix/suffix object or string.
 * @returns API for chaining.
 */
function add(prefixOrSuffix: { prefix?: string; suffix?: string } | string) {
  return addStep("add", (v: string) => {
    if (typeof prefixOrSuffix === "string") {
      return prefixOrSuffix + v;
    }
    let result = v;
    if (prefixOrSuffix.prefix) {
      result = prefixOrSuffix.prefix + result;
    }
    if (prefixOrSuffix.suffix) {
      result += prefixOrSuffix.suffix;
    }
    return result;
  });
}

/**
 * Pads the string to the specified length, using the provided character and location.
 * @param len Desired total length.
 * @param char Character to use for padding.
 * @param where Where to pad: 'start', 'end', or 'both'.
 * @returns API for chaining.
 */
function pad(len: number, char = " ", where: "start" | "end" | "both" = "end") {
  return addStep("pad", (v: string) => {
    if (where === "start") {
      return v.padStart(len, char);
    }
    if (where === "end") {
      return v.padEnd(len, char);
    }
    const totalPad = len - v.length;
    if (totalPad > 0) {
      const padStartLen = Math.floor(totalPad / 2);
      const padEndLen = totalPad - padStartLen;
      return char.repeat(padStartLen) + v + char.repeat(padEndLen);
    }
    return v;
  });
}

/**
 * Shuffles the characters in the string randomly.
 * @returns API for chaining.
 */
function randomize() {
  return addStep("randomize", (v: string) =>
    v
      .split("")
      .sort(() => Math.random() - 0.5)
      .join(""),
  );
}

/**
 * Chunks the string into parts of the given size, separated by the given separator.
 * @param size Length of each chunk (how many characters per part).
 * @param sep Separator string to use between chunks (default is '|').
 * @returns API for chaining.
 */
function chunk(size: number, sep = "|") {
  return addStep("chunk", (v: string) => {
    const arr = v.split("");
    const chunks: string[] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size).join(""));
    }
    return chunks.join(sep);
  });
}

/**
 * Breaks the string into lines of a given length, separated by newlines.
 * @param charactersPerLine Number of characters per line.
 * @returns API for chaining.
 */
function breakToLines(charactersPerLine: number) {
  return addStep("breakToLines", (v: string) => {
    let out = "";
    for (let i = 0; i < v.length; i += charactersPerLine) {
      out += v.substring(i, i + charactersPerLine);
      if (i + charactersPerLine < v.length) {
        out += "\n";
      }
    }
    return out;
  });
}

/**
 * Extracts the first match for a pattern.
 * @param pattern Pattern to match (string or RegExp).
 * @returns API for chaining.
 * @throws If no match found.
 */
function extract(pattern: string | RegExp) {
  return addStep("extract", (v: string) => {
    const matches = new RegExp(pattern).exec(v);
    if (!matches) {
      throw new Error("No match found");
    }
    return matches[0];
  });
}

/**
 * Extracts a substring using start and end indexes.
 * @param start Index to start extraction.
 * @param end Index to end extraction (exclusive).
 * @returns API for chaining.
 */
function extractInRange(start: number, end: number) {
  return addStep("extractInRange", (v: string) => v.slice(start, end));
}

/**
 * Extracts the substring between two markers.
 * @param prefix The start marker.
 * @param suffix The end marker.
 * @returns API for chaining.
 * @throws If not found.
 */
function extractWhenBetween(prefix: string, suffix: string) {
  return addStep("extractWhenBetween", (v: string) => {
    const startIdx = v.indexOf(prefix);
    const endIdx = v.indexOf(suffix, startIdx + prefix.length);
    if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
      throw new Error("Not found");
    }
    return v.slice(startIdx + prefix.length, endIdx);
  });
}

/**
 * Escapes regex special characters in the string.
 * @returns API for chaining.
 */
function escapeString() {
  return addStep("escapeString", (v: string) =>
    v.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
  );
}

/**
 * Unescapes regex special characters in the string.
 * @returns API for chaining.
 */
function unEscapeString() {
  return addStep("unEscapeString", (v: string) =>
    v.replace(/\\([-/\\^$*+?.()|[\]{}])/g, "$1"),
  );
}

/**
 * Hashes the string using the djb2 algorithm.
 * @returns API for chaining.
 */
function toHash() {
  return addStep("toHash", (v: string) => {
    let hash = 5381;
    for (let i = 0; i < v.length; i++) {
      // biome-ignore lint/nursery/noBitwiseOperators: <this is ok for djb2 algorithm implementation>
      hash = (hash << 5) + hash + v.charCodeAt(i);
    }
    return hash.toString();
  });
}

export const transforms = {
  toUpperCase,
  toLowerCase,
  toPascalCase,
  toSnakeCase,
  toCamelCase,
  trim,
  split,
  toHex,
  toBinary,
  toURLSafe,
  getCharacterAt,
  getRandomFrom,
  sanitize,
  anagram,
  replace,
  replaceAll,
  removeFirst,
  removeAll,
  add,
  pad,
  randomize,
  chunk,
  breakToLines,
  extract,
  extractInRange,
  extractWhenBetween,
  escapeString,
  unEscapeString,
  toHash,
};
