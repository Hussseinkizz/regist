# 👾 Regist

Regist is a declarative, type-safe, and human-readable library for string validation and transformation.

## Regist is:

* A declarative, human readable and friendly syntax sugar for regex
* To regex what ORMs are to SQL
* Turns cryptic regex into a nice tool anyone can write and maintain
* Makes you forget about complex slashes, brackets, and endless escaping
* Prevents regex bugs and technical debt in your codebase
* Expresses intent in English-like, readable syntax
* Intuitive and self-explanatory—even for beginners
* Zero regex knowledge required to read and write patterns
* Portable - same design can be implemented in any language that supports regex

## Regist is not:

* A regex engine
* A regex parser
* A schema validation libarary
* Only works with strings

## 📦 Installation

```bash
npm install @regist/regist
```

## 🚀 Usage Examples

### Validation & Assertion

```typescript
import { assertThat } from "regist";

// Strong password (at least 8 chars, uppercase, lowercase, digit, special char)
assertThat("Aa1!aa11").isStrongPassword().try(); // true
assertThat("weakpass").isStrongPassword().try(); // false

// Email and URL validation
assertThat("foo@bar.com").isEmail().try();         // true
assertThat("not-an-email").isEmail().try();        // false
assertThat("https://foo.com").isUrl().try();       // true
assertThat("not a url").isUrl().try();             // false

// Phone validation (US)
assertThat("123-456-7890").isPhone("US").try();    // true
assertThat("notaphone").isPhone("US").try();       // false
```

### Transformation

```typescript
import { stringTransform } from "regist";

stringTransform("  myFileName.TXT  ")
  .trim()
  .toLowerCase()
  .toSnakeCase()
  .try(); // "my_file_name.txt"
```

### Chaining & Interoperability

```typescript
stringTransform("  Hello World!  ")
  .trim()
  .toLowerCase()
  .assertThat()
  .isExactly("hello world!")
  .try(); // true

assertThat("foo")
  .isExactly("foo")
  .stringTransform()
  .toUpperCase()
  .try(); // "FOO"
```

### Algorithm/Leetcode-style Examples

```typescript
// Palindrome check (case/space insensitive)
stringTransform("A man a plan a canal Panama")
  .sanitize({ removeSpaces: true })
  .toLowerCase()
  .assertThat()
  .isPalindrome()
  .try(); // true

// Anagram check
assertThat("listen").anagram("silent").try(); // true
assertThat("foo").anagram("bar").try();       // false

// Quick hashing with djb2 (great for grouping or hash-based problems)
const hash = stringTransform("anagram").toHash().try(); // e.g. "182755666"
// djb2 is a fast, well-known string hash: hash = 5381; for each char: hash = hash * 33 + code

// Example: group words by hash for anagram buckets
const words = ["listen", "silent", "enlist", "foo"];
const buckets = new Map<string, string[]>();
for (const word of words) {
  const h = stringTransform(word).toHash().try();
  buckets.set(h, [...(buckets.get(h) || []), word]);
}
console.log(buckets);
// Words with the same hash are likely anagrams (for small inputs, djb2 is often enough)
```

### Extraction, Splitting, and Joining

```typescript
stringTransform("abc[foo]def").extractWhenBetween("[", "]").try(); // "foo"
stringTransform("abcdef").chunk(2, "-").try();                     // "ab-cd-ef"
stringTransform("a,b,c").split(",").takeThatAt(1).try();           // "b"
stringTransform("a,b,c").split(",").join("-").try();               // "a-b-c"
```

### Custom Logic and Error Handling

```typescript
// Custom check (palindrome)
assertThat("racecar")
  .customCheck(str => str === str.split("").reverse().join(""))
  .try(); // true

// Handle errors gracefully
stringTransform("abc")
  .extract(/\d+/)
  .try((err, step, valueBefore) => {
    // err.message contains "No match found"
    // step === "extract"
    // valueBefore === "abc"
  }); // => null
```

### ♻️ Reusability & Integration

Chains are **reusable**—you can build once, branch, and use in different contexts:

```typescript
const snake = stringTransform("fooBar").toSnakeCase();
snake.try(); // "foo_bar"
snake.toUpperCase().try(); // "FOO_BAR"
```

Regist works well with other libraries (like [zod](https://zod.dev)):

```typescript
import { z } from "zod";
import { assertThat } from "regist";

const usernameSchema = z.string().refine(
  val => assertThat(val).isAlphaNumeric().lengthIs({ min: 3, max: 20 }).try()
);

usernameSchema.parse("user123"); // passes
usernameSchema.parse("!@#");     // throws ZodError
```

## 🧭 Core Principles

### Human-First, Declarative Design

- **Readable:** Your string logic should look like what you mean—no more regex puzzles.
- **Declarative:** Describe your intent, not mechanics.

### Two APIs: Assertion & Transformation

- **Assertion API (`assertThat`):** Validate strings. Chain checks, get `true`/`false` or handle errors with `.try(handler)`.
- **Transformation API (`stringTransform`):** Mutate or convert strings. Chain transformations, run with `.try()` or handle errors with `.try(handler)`.

### Chaining, Interoperability, and Reusability

- **Fully chainable and composable:** Every method returns the API for further chaining.
- **Interoperable:** Freely switch between assertion and transform chains with `.assertThat()` or `.stringTransform()`.
- **Reusable:** Chains are lazy; build once, branch or reuse as many times as needed before calling `.try()`.

### Lazy Evaluation

- No work is done until `.try()` is called. Enables safe, reusable, and predictable logic.

### Type Safety & Portability

- TypeScript-first for type safety and autocompletion.
- Fully tested, each method using vitest
- Core ideas and API are portable—adapt to any language.

### Clear Error Handling

- Both APIs support `.try(handler)`.
- If any step fails, your handler receives `(error, stepName, valueAtFailure)`.
- If no handler is passed, errors are thrown.


## 📝 API Reference

### Assertion API (`assertThat`)

| Method                       | Description                                                                     | Regex Equivalent / Typical Regex                            |
| ---------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `.has(str)`                  | Checks if value contains substring                                              | `str.includes("X")` or `/X/`                                |
| `.doesNotHave(str)`          | Checks if value does NOT contain substring                                      | `!str.includes("X")` or `/X/.test(str) === false`           |
| `.startsWith(str)`           | Checks if value starts with substring                                           | `/^X/`                                                      |
| `.endsWith(str)`             | Checks if value ends with substring                                             | `/X$/`                                                      |
| `.isExactly(str)`            | Checks for exact match                                                          | `/^X$/` or `str === "X"`                                    |
| `.isNot()`                   | Negates the next operation in the chain                                         | `!(...)`                                                    |
| `.isAlpha()`                 | All characters are letters                                                      | `/^[A-Za-z]+$/`                                             |
| `.isAlphaNumeric()`          | All characters are letters or digits                                            | `/^[A-Za-z0-9]+$/`                                          |
| `.hasAllUppercase()`         | All letters are uppercase                                                       | `/^[A-Z]+$/`                                                |
| `.hasAllLowercase()`         | All letters are lowercase                                                       | `/^[a-z]+$/`                                                |
| `.isUpperCase()`             | Value contains at least one uppercase letter                                    | `/[A-Z]/`                                                   |
| `.isLowerCase()`             | Value contains at least one lowercase letter                                    | `/[a-z]/`                                                   |
| `.isDigit()`                 | All characters are digits                                                       | `/^\d+$/`                                                   |
| `.isNumeric()`               | String is number-convertible                                                    | `/^-?\d+(\.\d+)?$/`                                         |
| `.isWhitespace()`            | All characters are whitespace                                                   | `/^\s+$/`                                                   |
| `.isEmail()`                 | Valid email address                                                             | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`                              |
| `.isUrl()`                   | Valid URL                                                                       | `/^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/` (approx)    |
| `.isUrlSafe()`               | Only URL-safe characters                                                        | `/^[A-Za-z0-9\-._~]+$/`                                     |
| `.isPhone(preset)`           | Valid phone number (with country preset e.g. 'US', 'UG')                        | Varies (e.g. `/^\d{3}-\d{3}-\d{4}$/` for US)                |
| `.isNumberConvertible()`     | Can be safely converted to number                                               | `/^-?\d+(\.\d+)?$/`                                         |
| `.passesRegex(regex)`        | Custom regex match                                                              | Custom regex                                                |
| `.failsRegex(regex)`         | Custom regex non-match                                                          | Negated custom regex                                        |
| `.anyOf(...values)`          | Value is equal to any of provided values                                        | `/^(X                                                       | Y                                      | Z)$/` |
| `.lengthIs(n                 | {min,max})`                                                                     | Length equals or is in range                                | `str.length === N` or `/^.{min,max}$/` |
| `.isBetween(start, end)`     | Substring between two markers exists                                            | `/(?<=start).*?(?=end)/`                                    |
| `.hasNoEmoji()`              | Value contains no emoji                                                         | `/[\p{Emoji}]/u` (negated)                                  |
| `.anagram(str)`              | Is an anagram of provided string                                                | none                                                        |
| `.isPalindrome()`            | Is a palindrome                                                                 | none                                                        |
| `.hasUniqueCharacters()`     | All characters are unique                                                       | none                                                        |
| `.whereValueAt(idx).is(val)` | Character at index matches value                                                | `str[idx] === "X"`                                          |
| `.wordCount()`               | Number of words                                                                 | `str.trim().split(/\s+/).length`                            |
| `.isBase64()`                | Valid base64 string                                                             | `/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==             | [A-Za-z0-9+\/]{3}=)?$/`                |
| `.isStrongPassword()`        | Meets strong password criteria (min 8 chars, upper, lower, digit, special char) | `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/` |
| `.customCheck(fn)`           | Use a custom predicate (must return boolean)                                    | none                                                        |
| `.stringTransform()`         | Switch to a transformation chain with the current value                         | none                                                        |
| `.try(handler?)`             | Runs the chain, returns `true`/`false`, or calls handler on error               | none                                                        |

### Transformation API (`stringTransform`)

| Method                                  | Description                                                         | Regex Equivalent / Typical Regex |
| --------------------------------------- | ------------------------------------------------------------------- | -------------------------------- |
| `.toUpperCase()`                        | Uppercase the string                                                | none                             |
| `.toLowerCase()`                        | Lowercase the string                                                | none                             |
| `.toPascalCase()`                       | PascalCase                                                          | none                             |
| `.toSnakeCase()`                        | snake_case                                                          | none                             |
| `.toCamelCase()`                        | camelCase                                                           | none                             |
| `.trim()`                               | Trim whitespace                                                     | `/^\s+                           | \s+$/g` |
| `.split(separator).takeThatAt(idx)`     | Split and pick item at index                                        | `str.split(sep)[idx]`            |
| `.split(separator).join(sep)`           | Split and join with separator                                       | `str.split(sep).join(sep2)`      |
| `.getCharacterAt(idx)`                  | Character at index                                                  | `str[idx]`                       |
| `.getRandomFrom()`                      | Random character                                                    | none                             |
| `.replace(search, rep)`                 | Replace first occurrence                                            | `str.replace(...)`               |
| `.replaceAll(search, rep)`              | Replace all occurrences                                             | `str.replaceAll(...)` or `/g`    |
| `.removeFirst(search)`                  | Remove first occurrence                                             | `str.replace(...)`               |
| `.removeAll(search)`                    | Remove all occurrences                                              | `str.replaceAll(...)` or `/g`    |
| `.add(prefix                            | {prefix, suffix})`                                                  | Add prefix/suffix                | none    |
| `.pad(len, char, where)`                | Pad to length (start/end/both)                                      | none                             |
| `.randomize()`                          | Shuffle characters                                                  | none                             |
| `.chunk(size, sep?)`                    | Split into chunks of given length, joined by sep (default `         | `)                               | none    |
| `.breakToLines(lineLen)`                | Wrap into lines                                                     | none                             |
| `.extract(pattern)`                     | Extract match                                                       | `.match(regex)`                  |
| `.extractInRange(start, end)`           | Extract substring by index                                          | `str.slice(start, end)`          |
| `.extractWhenBetween(prefix, suffix)`   | Extract substring between two markers                               | `/(?<=prefix).*?(?=suffix)/`     |
| `.toHex()`                              | To hexadecimal                                                      | none                             |
| `.toBinary()`                           | To binary                                                           | none                             |
| `.toURLSafe()`                          | Percent-encode for URLs                                             | `encodeURIComponent(str)`        |
| `.toHash()`                             | Hash string using the djb2 algorithm (fast, non-cryptographic hash) | none                             |
| `.customTransform(fn)`                  | Custom string-to-string transform                                   | none                             |
| `.sanitize(opts)`                       | Remove spaces, digits, or specials as specified                     | `/\s+/g`, `/\d+/g`, `/[^\w]/g`   |
| `.escapeString()` / `.unEscapeString()` | Escape/unescape regex specials                                      | none                             |
| `.assertThat()`                         | Switch to assertion API                                             | none                             |
| `.try(handler?)`                        | Runs the transform chain, returns result or calls handler on error  | none                             |


## 🧠 Philosophy

- **Human-first:** Code should read like you think. Explicit, natural, and clear—even when negating.
- **Type-safe and robust:** Full TypeScript, catching errors before runtime.
- **Tested and trusted:** Every feature covered by tests—production ready.
- **Lazy and composable:** Nothing runs until `.try()`. Build, branch, and share chains as needed.
- **Bidirectional chaining:** Switch between assertion and transform logic without friction.
- **Real-world ready:** All the common string checks (email, phone, URL, emoji, etc.), plus leetcode-style utils, are built-in.
- **Reusable and portable:** Compose once, use everywhere, or implement Regist in any language that speaks regex.
- **Zero dependencies:** No bloat, just TypeScript/JavaScript and RegExp.

## 📝 Contributing

Pull requests and suggestions are welcome! Please open issues for bugs or feature requests.

> Ps: This is still a work in progress, so expect changes and improvements over time and yeah am not a regex expert, wish I was, so if you find any bugs or have suggestions, please let me know at end of the day this project is meant to make this approachable for everyone.

## 📄 License

MIT License
