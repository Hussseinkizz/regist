// src/lib/assertions.ts
function has(str) {
  return addStep("has", (v) => v.includes(str));
}
function doesNotHave(str) {
  return addStep("doesNotHave", (v) => !v.includes(str));
}
function startsWith(str) {
  return addStep("startsWith", (v) => v.startsWith(str));
}
function endsWith(str) {
  return addStep("endsWith", (v) => v.endsWith(str));
}
function isExactly(str) {
  return addStep("isExactly", (v) => v === str);
}
function isAlpha() {
  return addStep("isAlpha", (v) => /^[A-Za-z]+$/.test(v));
}
function isAlphaNumeric() {
  return addStep("isAlphaNumeric", (v) => /^[A-Za-z0-9]+$/.test(v));
}
function hasAllUppercase() {
  return addStep(
    "hasAllUppercase",
    (v) => /^[A-Z]+$/.test(v.replace(/[^A-Za-z]/g, ""))
  );
}
function hasAllLowercase() {
  return addStep(
    "hasAllLowercase",
    (v) => /^[a-z]+$/.test(v.replace(/[^A-Za-z]/g, ""))
  );
}
function isUpperCase() {
  return addStep("isUpperCase", (v) => /[A-Z]/.test(v));
}
function isLowerCase() {
  return addStep("isLowerCase", (v) => /[a-z]/.test(v));
}
function isDigit() {
  return addStep("isDigit", (v) => /^\d+$/.test(v));
}
function isNumeric() {
  return addStep("isNumeric", (v) => !Number.isNaN(Number(v)));
}
function isWhitespace() {
  return addStep("isWhitespace", (v) => /^\s+$/.test(v));
}
function isEmail() {
  return addStep("isEmail", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
}
function isUrl() {
  return addStep(
    "isUrl",
    (v) => /^(https?:\/\/)?([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/.test(v)
  );
}
function isUrlSafe() {
  return addStep("isUrlSafe", (v) => /^[a-zA-Z0-9\-._~]+$/.test(v));
}
function isPhone(preset) {
  return addStep("isPhone", (v) => {
    if (preset === "UG") {
      return /^(\+256|0)7\d{8}$/.test(v);
    }
    if (preset === "US") {
      const digits = v.replace(/\D/g, "");
      return digits.length === 10 || digits.length === 11 && digits.startsWith("1");
    }
    return false;
  });
}
function isNumberConvertible() {
  return addStep("isNumberConvertible", (v) => !Number.isNaN(Number(v)));
}
function passesRegex(regex) {
  return addStep("passesRegex", (v) => regex.test(v));
}
function failsRegex(regex) {
  return addStep("failsRegex", (v) => !regex.test(v));
}
function anyOf(...values) {
  return addStep("anyOf", (v) => values.includes(v));
}
function lengthIs(nOrObj) {
  return addStep("lengthIs", (v) => {
    const len = v.length;
    if (typeof nOrObj === "number") {
      return len === nOrObj;
    }
    let ok = true;
    if (nOrObj.min !== void 0) {
      ok = ok && len >= nOrObj.min;
    }
    if (nOrObj.max !== void 0) {
      ok = ok && len <= nOrObj.max;
    }
    return ok;
  });
}
function isBetween(prefix, suffix) {
  return addStep("isBetween", (v) => {
    const prefixIdx = v.indexOf(prefix);
    const suffixIdx = v.indexOf(suffix, prefixIdx + prefix.length);
    return prefixIdx !== -1 && suffixIdx !== -1 && prefixIdx + prefix.length < suffixIdx;
  });
}
function hasNoEmoji() {
  return addStep("hasNoEmoji", (v) => !/[\u{1F600}-\u{1F64F}]/u.test(v));
}
function anagram(str) {
  const sorted = (s) => s.split("").sort((a, b) => a.localeCompare(b)).join("");
  return addStep("anagram", (v) => sorted(v) === sorted(str));
}
function isPalindrome() {
  return addStep("isPalindrome", (v) => {
    const cleaned = v.replace(/[\W_]/g, "").toLowerCase();
    return cleaned === cleaned.split("").reverse().join("");
  });
}
function hasUniqueCharacters() {
  return addStep("hasUniqueCharacters", (v) => new Set(v).size === v.length);
}
function whereValueAt(idx) {
  return {
    /**
     * Checks if character at index equals value.
     * @param val Value to compare.
     * @returns API for chaining.
     */
    is: (val) => addStep(`whereValueAt(${idx}).is`, (v) => v[idx] === val)
  };
}
function wordCount() {
  return {
    /**
     * Checks if word count matches n.
     * @param n Expected word count.
     * @returns API for chaining.
     */
    is: (n) => addStep(
      "wordCount.is",
      (v) => v.trim().split(/\s+/).filter(Boolean).length === n
    )
  };
}
function isBase64() {
  return addStep(
    "isBase64",
    (v) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(v)
  );
}
function isStrongPassword() {
  return addStep(
    "isStrongPassword",
    (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(v)
  );
}
var assertions = {
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
  isStrongPassword
};

// src/lib/transforms.ts
function toUpperCase() {
  return addStep2("toUpperCase", (v) => v.toUpperCase());
}
function toLowerCase() {
  return addStep2("toLowerCase", (v) => v.toLowerCase());
}
function toPascalCase() {
  return addStep2(
    "toPascalCase",
    (v) => v.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase()).replace(/[\s_-]+/g, "")
  );
}
function toSnakeCase() {
  return addStep2(
    "toSnakeCase",
    (v) => v.replace(/\s+/g, "_").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/-+/g, "_").replace(/__+/g, "_").toLowerCase()
  );
}
function toCamelCase() {
  return addStep2(
    "toCamelCase",
    (v) => v.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : "").replace(/^(.)/, (m) => m.toLowerCase())
  );
}
function trim() {
  return addStep2("trim", (v) => v.trim());
}
function split(splitter) {
  return {
    /**
     * Picks the part at the given index after splitting.
     * @param index Index of part to select.
     * @returns API for chaining.
     */
    takeThatAt(index) {
      return addStep2("takeThatAt", (v) => {
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
      return addStep2("join", (v) => v.split(splitter ?? "").join(sep));
    }
  };
}
function toHex() {
  return addStep2(
    "toHex",
    (v) => Array.from(v).map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join("")
  );
}
function toBinary() {
  return addStep2(
    "toBinary",
    (v) => Array.from(v).map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")
  );
}
function toURLSafe() {
  return addStep2("toURLSafe", (v) => encodeURIComponent(v));
}
function getCharacterAt(index) {
  return addStep2("getCharacterAt", (v) => v.charAt(index));
}
function getRandomFrom() {
  return addStep2(
    "getRandomFrom",
    (v) => v.charAt(Math.floor(Math.random() * v.length))
  );
}
function sanitize(opts) {
  return addStep2("sanitize", (v) => {
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
function anagram2(str) {
  return addStep2(
    "anagram",
    (v) => [...v, ...str].sort((a, b) => a.localeCompare(b)).join("")
  );
}
function replace(search, rep) {
  return addStep2("replace", (v) => v.replace(search, rep));
}
function replaceAll(search, rep) {
  return addStep2("replaceAll", (v) => {
    if (typeof search === "string") {
      return v.split(search).join(rep);
    }
    return v.replace(new RegExp(search, "g"), rep);
  });
}
function removeFirst(what) {
  return addStep2("removeFirst", (v) => v.replace(what, ""));
}
function removeAll(what) {
  return addStep2(
    "removeAll",
    (v) => typeof what === "string" ? v.split(what).join("") : v.replace(new RegExp(what, "g"), "")
  );
}
function add(prefixOrSuffix) {
  return addStep2("add", (v) => {
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
function pad(len, char = " ", where = "end") {
  return addStep2("pad", (v) => {
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
function randomize() {
  return addStep2(
    "randomize",
    (v) => v.split("").sort(() => Math.random() - 0.5).join("")
  );
}
function chunk(size, sep = "|") {
  return addStep2("chunk", (v) => {
    const arr = v.split("");
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size).join(""));
    }
    return chunks.join(sep);
  });
}
function breakToLines(charactersPerLine) {
  return addStep2("breakToLines", (v) => {
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
function extract(pattern) {
  return addStep2("extract", (v) => {
    const matches = new RegExp(pattern).exec(v);
    if (!matches) {
      throw new Error("No match found");
    }
    return matches[0];
  });
}
function extractInRange(start, end) {
  return addStep2("extractInRange", (v) => v.slice(start, end));
}
function extractWhenBetween(prefix, suffix) {
  return addStep2("extractWhenBetween", (v) => {
    const startIdx = v.indexOf(prefix);
    const endIdx = v.indexOf(suffix, startIdx + prefix.length);
    if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
      throw new Error("Not found");
    }
    return v.slice(startIdx + prefix.length, endIdx);
  });
}
function escapeString() {
  return addStep2(
    "escapeString",
    (v) => v.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
  );
}
function unEscapeString() {
  return addStep2(
    "unEscapeString",
    (v) => v.replace(/\\([-/\\^$*+?.()|[\]{}])/g, "$1")
  );
}
function toHash() {
  return addStep2("toHash", (v) => {
    let hash = 5381;
    for (let i = 0; i < v.length; i++) {
      hash = (hash << 5) + hash + v.charCodeAt(i);
    }
    return hash.toString();
  });
}
var transforms = {
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
  anagram: anagram2,
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
  toHash
};

// src/string-transform.ts
var steps = [];
var currentValue = "";
var api = {
  ...transforms,
  customTransform,
  try: tryFn,
  assertThat: assertThatStart
};
function addStep2(name, fn) {
  steps.push({ name, fn });
  return api;
}
function customTransform(fn) {
  return addStep2("customTransform", (v) => {
    let result;
    try {
      result = fn(v);
    } catch (e) {
      throw new Error(`Custom transform function failed: ${e}`);
    }
    if (typeof result !== "string") {
      throw new Error(
        `Custom transform function must return a string, but returned ${JSON.stringify(result)}`
      );
    }
    return result;
  });
}
function handleStepError(err, handler, name, lastStepValue) {
  if (handler) {
    handler(
      err instanceof Error ? err : new Error(String(err)),
      name,
      lastStepValue
    );
    return null;
  }
  throw err;
}
function evaluateStep(fn, valueSoFar) {
  return fn(valueSoFar);
}
function tryFn(handler) {
  let value = currentValue;
  for (const { name, fn } of steps) {
    try {
      value = evaluateStep(fn, value);
    } catch (error) {
      return handleStepError(error, handler, name, value);
    }
  }
  return value;
}
function assertThatStart() {
  let errorInfo = null;
  const result = tryFn((error, step, valueSoFar) => {
    errorInfo = { error, step, valueSoFar };
  });
  if (result === null && errorInfo) {
    const { error, step, valueSoFar } = errorInfo;
    throw new Error(
      `Transformation failed at step "${step}": ${error.message}
Value so far: ${valueSoFar}`
    );
  }
  return assertThat(result);
}
function stringTransform(stringToTransform) {
  steps.length = 0;
  currentValue = stringToTransform;
  return api;
}

// src/assert-that.ts
var steps2 = [];
var _negate = false;
var currentValue2 = "";
var api2 = {
  ...assertions,
  isNot,
  customCheck,
  try: tryFn2,
  stringTransform: stringTransformStart
};
function isNot() {
  _negate = true;
  return api2;
}
function addStep(name, fn) {
  steps2.push({ name, fn });
  return api2;
}
function customCheck(fn) {
  return addStep("customCheck", (v) => {
    let result = null;
    try {
      result = fn(v);
    } catch (e) {
      throw new Error(`Error evaluating predicate: ${e}`);
    }
    if (typeof result !== "boolean") {
      throw new Error("Custom check function must return a boolean");
    }
    return result;
  });
}
function handleStepError2(err, handler, name, lastStepValue) {
  if (handler) {
    handler(
      err instanceof Error ? err : new Error(String(err)),
      name,
      lastStepValue
    );
    return null;
  }
  throw err;
}
function evaluateStep2(fn, valueSoFar, negate) {
  let result = fn(valueSoFar);
  if (negate) {
    result = !result;
    _negate = false;
  }
  return result;
}
function tryFn2(handler) {
  const value = currentValue2;
  const valueSoFar = value;
  for (const { name, fn } of steps2) {
    try {
      const result = evaluateStep2(fn, valueSoFar, _negate);
      if (!result) {
        return false;
      }
    } catch (error) {
      return handleStepError2(error, handler, name, valueSoFar);
    }
  }
  return true;
}
function stringTransformStart() {
  let errorInfo = null;
  const result = tryFn2((error, step, valueSoFar) => {
    errorInfo = { error, step, valueSoFar };
  });
  if (result === null && errorInfo) {
    const { error, step, valueSoFar } = errorInfo;
    throw new Error(
      `Assertion failed at step "${step}": ${error.message}
Value so far: ${valueSoFar}`
    );
  }
  if (!result) {
    throw new Error(`Assertion failed at step "${steps2.pop()?.name}"`);
  }
  return stringTransform(currentValue2);
}
function assertThat(stringToValidate) {
  steps2.length = 0;
  _negate = false;
  currentValue2 = stringToValidate;
  return api2;
}

export { assertThat, stringTransform };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map