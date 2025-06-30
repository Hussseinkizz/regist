/** biome-ignore-all lint/performance/useTopLevelRegex: <Inline regex is ok for a regex based library, after all it's not in userland> */
import { addStep } from "../assert-that";

type PhonePreset = "UG" | "US" | "DEFAULT";

/**
 * Checks if value contains substring `str`.
 * @param str The substring to look for.
 * @returns API for chaining.
 */
function has(str: string) {
  return addStep("has", (v) => v.includes(str));
}

/**
 * Checks if value does NOT contain substring `str`.
 * @param str The substring to exclude.
 * @returns API for chaining.
 */
function doesNotHave(str: string) {
  return addStep("doesNotHave", (v) => !v.includes(str));
}

/**
 * Checks if value starts with substring `str`.
 * @param str The prefix to check.
 * @returns API for chaining.
 */
function startsWith(str: string) {
  return addStep("startsWith", (v) => v.startsWith(str));
}

/**
 * Checks if value ends with substring `str`.
 * @param str The suffix to check.
 * @returns API for chaining.
 */
function endsWith(str: string) {
  return addStep("endsWith", (v) => v.endsWith(str));
}

/**
 * Checks for exact string match.
 * @param str The value to match exactly.
 * @returns API for chaining.
 */
function isExactly(str: string) {
  return addStep("isExactly", (v) => v === str);
}

/**
 * Checks if all characters are letters (A-Z, a-z).
 * @returns API for chaining.
 */
function isAlpha() {
  return addStep("isAlpha", (v) => /^[A-Za-z]+$/.test(v));
}

/**
 * Checks if all characters are letters or digits (A-Z, a-z, 0-9).
 * @returns API for chaining.
 */
function isAlphaNumeric() {
  return addStep("isAlphaNumeric", (v) => /^[A-Za-z0-9]+$/.test(v));
}

/**
 * Checks if all letters are uppercase.
 * @returns API for chaining.
 */
function hasAllUppercase() {
  return addStep("hasAllUppercase", (v) =>
    /^[A-Z]+$/.test(v.replace(/[^A-Za-z]/g, "")),
  );
}

/**
 * Checks if all letters are lowercase.
 * @returns API for chaining.
 */
function hasAllLowercase() {
  return addStep("hasAllLowercase", (v) =>
    /^[a-z]+$/.test(v.replace(/[^A-Za-z]/g, "")),
  );
}

/**
 * Checks if value contains at least one uppercase letter.
 * @returns API for chaining.
 */
function isUpperCase() {
  return addStep("isUpperCase", (v) => /[A-Z]/.test(v));
}

/**
 * Checks if value contains at least one lowercase letter.
 * @returns API for chaining.
 */
function isLowerCase() {
  return addStep("isLowerCase", (v) => /[a-z]/.test(v));
}

/**
 * Checks if all characters are digits.
 * @returns API for chaining.
 */
function isDigit() {
  return addStep("isDigit", (v) => /^\d+$/.test(v));
}

/**
 * Checks if string is number-convertible (parseable as number).
 * @returns API for chaining.
 */
function isNumeric() {
  return addStep("isNumeric", (v) => !Number.isNaN(Number(v)));
}

/**
 * Checks if all characters are whitespace.
 * @returns API for chaining.
 */
function isWhitespace() {
  return addStep("isWhitespace", (v) => /^\s+$/.test(v));
}

/**
 * Checks if the value is a valid email address.
 * @returns API for chaining.
 */
function isEmail() {
  return addStep("isEmail", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
}

/**
 * Checks if the value is a valid HTTP/HTTPS URL.
 * @returns API for chaining.
 */
function isUrl() {
  return addStep("isUrl", (v) =>
    /^(https?:\/\/)?([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/.test(v),
  );
}

/**
 * Checks if value contains only URL-safe characters.
 * @returns API for chaining.
 */
function isUrlSafe() {
  return addStep("isUrlSafe", (v) => /^[a-zA-Z0-9\-._~]+$/.test(v));
}

/**
 * Checks if value is a valid phone number for a given preset.
 * @param preset "UG" for Uganda, "US" for United States, "DEFAULT" for generic.
 * @returns API for chaining.
 */
function isPhone(preset: PhonePreset) {
  return addStep("isPhone", (v) => {
    if (preset === "UG") {
      return /^(\+256|0)7\d{8}$/.test(v);
    }
    if (preset === "US") {
      const digits = v.replace(/\D/g, "");
      return (
        digits.length === 10 || (digits.length === 11 && digits.startsWith("1"))
      );
    }
    return false;
  });
}

/**
 * Checks if value is convertible to number.
 * @returns API for chaining.
 */
function isNumberConvertible() {
  return addStep("isNumberConvertible", (v) => !Number.isNaN(Number(v)));
}

/**
 * Checks value with a custom regular expression.
 * @param regex Regular expression to test.
 * @returns API for chaining.
 */
function passesRegex(regex: RegExp) {
  return addStep("passesRegex", (v) => regex.test(v));
}

/**
 * Checks that value does NOT match the provided regex.
 * @param regex Regular expression to test.
 * @returns API for chaining.
 */
function failsRegex(regex: RegExp) {
  return addStep("failsRegex", (v) => !regex.test(v));
}

/**
 * Checks if value is exactly equal to any of the provided values.
 * @param values List of values to match.
 * @returns API for chaining.
 */
function anyOf(...values: string[]) {
  return addStep("anyOf", (v) => values.includes(v));
}

/**
 * Checks that value's length equals n, or is within {min, max} bounds.
 * @param nOrObj Number or object with min/max.
 * @returns API for chaining.
 */
function lengthIs(nOrObj: number | { min?: number; max?: number }) {
  return addStep("lengthIs", (v) => {
    const len = v.length;
    if (typeof nOrObj === "number") {
      return len === nOrObj;
    }
    let ok = true;
    if (nOrObj.min !== undefined) {
      ok = ok && len >= nOrObj.min;
    }
    if (nOrObj.max !== undefined) {
      ok = ok && len <= nOrObj.max;
    }
    return ok;
  });
}

/**
 * Checks if a substring exists between two markers (prefix and suffix).
 * Returns true if there is a substring between prefix and suffix.
 * @param prefix Prefix string.
 * @param suffix Suffix string.
 * @returns API for chaining.
 */
function isBetween(prefix: string, suffix: string) {
  return addStep("isBetween", (v) => {
    const prefixIdx = v.indexOf(prefix);
    const suffixIdx = v.indexOf(suffix, prefixIdx + prefix.length);
    return (
      prefixIdx !== -1 &&
      suffixIdx !== -1 &&
      prefixIdx + prefix.length < suffixIdx
    );
  });
}

/**
 * Checks if value has no emoji characters.
 * @returns API for chaining.
 */
function hasNoEmoji() {
  return addStep("hasNoEmoji", (v) => !/[\u{1F600}-\u{1F64F}]/u.test(v));
}

/**
 * Checks if value is an anagram of the given string.
 * @param str The string to compare as an anagram.
 * @returns API for chaining.
 */
function anagram(str: string) {
  const sorted = (s: string) =>
    s
      .split("")
      .sort((a, b) => a.localeCompare(b))
      .join("");
  return addStep("anagram", (v) => sorted(v) === sorted(str));
}

/**
 * Checks if value is a palindrome (ignoring spaces and case).
 * @returns API for chaining.
 */
function isPalindrome() {
  return addStep("isPalindrome", (v) => {
    const cleaned = v.replace(/[\W_]/g, "").toLowerCase();
    return cleaned === cleaned.split("").reverse().join("");
  });
}

/**
 * Checks if all characters in value are unique.
 * @returns API for chaining.
 */
function hasUniqueCharacters() {
  return addStep("hasUniqueCharacters", (v) => new Set(v).size === v.length);
}

/**
 * Checks value at position `idx` against supplied value.
 * @param idx Index to check.
 * @returns Object with .is(value) assertion for chaining.
 */
function whereValueAt(idx: number) {
  return {
    /**
     * Checks if character at index equals value.
     * @param val Value to compare.
     * @returns API for chaining.
     */
    is: (val: string) =>
      addStep(`whereValueAt(${idx}).is`, (v) => v[idx] === val),
  };
}

/**
 * Returns an API for word count checks.
 * @returns Object with .is(count) assertion for chaining.
 */
function wordCount() {
  return {
    /**
     * Checks if word count matches n.
     * @param n Expected word count.
     * @returns API for chaining.
     */
    is: (n: number) =>
      addStep(
        "wordCount.is",
        (v) => v.trim().split(/\s+/).filter(Boolean).length === n,
      ),
  };
}

/**
 * Checks if value is valid Base64.
 * @returns API for chaining.
 */
function isBase64() {
  return addStep("isBase64", (v) =>
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(v),
  );
}

/**
 * Checks if value meets strong password criteria.
 * At least 8 chars, uppercase, lowercase, number, and special.
 * @returns API for chaining.
 */
function isStrongPassword() {
  return addStep("isStrongPassword", (v) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(v),
  );
}

export const assertions = {
  has,
  doesNotHave,
  startsWith,
  endsWith,
  isExactly,
  isAlpha,
  isAlphaNumeric,
  hasAllUppercase,
  hasAllLowercase,
  isUpperCase,
  isLowerCase,
  isDigit,
  isNumeric,
  isWhitespace,
  isEmail,
  isUrl,
  isUrlSafe,
  isPhone,
  isNumberConvertible,
  passesRegex,
  failsRegex,
  anyOf,
  lengthIs,
  isBetween,
  hasNoEmoji,
  anagram,
  isPalindrome,
  hasUniqueCharacters,
  whereValueAt,
  wordCount,
  isBase64,
  isStrongPassword,
};

// add "hasSameEditDistance"
