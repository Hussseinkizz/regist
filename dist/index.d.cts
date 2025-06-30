/**
 * Regist: Human-friendly, chainable string transformation API.
 * Lazy transformation API, evaluated only on .try().
 * Author: Hussein Kizz.
 *
 * - All transformation methods return the API for chaining.
 * - .try() triggers evaluation of the chain.
 * - If all transformations succeed, .try() returns the final value.
 * - If a transformation throws and a handler is passed to .try(handler), handler is called with (error, step, valueSoFar) and .try() returns null.
 * - If an error occurs and no handler is passed, the error is thrown.
 * - After .try(), further chaining is not allowed.
 */
declare const api$1: {
    customTransform: typeof customTransform;
    try: typeof tryFn$1;
    assertThat: typeof assertThatStart;
    toUpperCase: () => TransformApi;
    toLowerCase: () => TransformApi;
    toPascalCase: () => TransformApi;
    toSnakeCase: () => TransformApi;
    toCamelCase: () => TransformApi;
    trim: () => TransformApi;
    split: (splitter?: string | RegExp) => {
        takeThatAt(index: number): TransformApi;
        join(sep?: string): TransformApi;
    };
    toHex: () => TransformApi;
    toBinary: () => TransformApi;
    toURLSafe: () => TransformApi;
    getCharacterAt: (index: number) => TransformApi;
    getRandomFrom: () => TransformApi;
    sanitize: (opts?: {
        removeSpaces?: boolean;
        removeDigits?: boolean;
        removeSpecial?: boolean;
    }) => TransformApi;
    anagram: (str: string) => TransformApi;
    replace: (search: string | RegExp, rep: string) => TransformApi;
    replaceAll: (search: string | RegExp, rep: string) => TransformApi;
    removeFirst: (what: string | RegExp) => TransformApi;
    removeAll: (what: string | RegExp) => TransformApi;
    add: (prefixOrSuffix: {
        prefix?: string;
        suffix?: string;
    } | string) => TransformApi;
    pad: (len: number, char?: string, where?: "start" | "end" | "both") => TransformApi;
    randomize: () => TransformApi;
    chunk: (size: number, sep?: string) => TransformApi;
    breakToLines: (charactersPerLine: number) => TransformApi;
    extract: (pattern: string | RegExp) => TransformApi;
    extractInRange: (start: number, end: number) => TransformApi;
    extractWhenBetween: (prefix: string, suffix: string) => TransformApi;
    escapeString: () => TransformApi;
    unEscapeString: () => TransformApi;
    toHash: () => TransformApi;
};
type TransformApi = {
    [K in keyof typeof api$1]: (typeof api$1)[K];
};
/**
 * Applies a custom transformation to the value.
 * @param fn Transformation function.
 * @returns API for chaining.
 * @throws If the function does not return a string or throws unless try chained on with a handler passed to it.
 */
declare function customTransform(fn: (val: string) => string): TransformApi;
/**
 * Triggers evaluation of the transformation chain.
 * @param handler Optional error handler (error: Error, step: string, valueSoFar: string) => void
 * @returns {string|null} result string (all succeed), or null (error handled)
 * @example
 * const result = stringTransform("fooBar")
 *   .toUpperCase()
 *   .try(); // returns "FOOBAR"
 *
 * const result2 = stringTransform("fooBar")
 *   .customTransform(() => { throw new Error("Oops!"); })
 *   .try((error, step, valueSoFar) => {
 *     console.error(error, step, valueSoFar);
 *   }); // doesn't throw, passes error to handler and returns null.
 */
declare function tryFn$1(handler?: (error: Error, step: string, valueSoFar: string) => void): string | null;
/**
 * Switches to the assertion chain for further validation.
 * Runs try on the current chain, throws if an error occurs, otherwise switches to assert api.
 * If an error occurs, throws with detailed info from try.
 * @returns assertThat API.
 */
declare function assertThatStart(): {
    isNot: () => AssertApi;
    customCheck: (fn: (str: string) => boolean) => AssertApi;
    try: (handler?: (error: Error, step: string, valueSoFar: string) => void) => true | false | null;
    stringTransform: () => {
        customTransform: typeof customTransform;
        try: typeof tryFn$1;
        assertThat: typeof assertThatStart;
        toUpperCase: () => TransformApi;
        toLowerCase: () => TransformApi;
        toPascalCase: () => TransformApi;
        toSnakeCase: () => TransformApi;
        toCamelCase: () => TransformApi;
        trim: () => TransformApi;
        split: (splitter?: string | RegExp) => {
            takeThatAt(index: number): TransformApi;
            join(sep?: string): TransformApi;
        };
        toHex: () => TransformApi;
        toBinary: () => TransformApi;
        toURLSafe: () => TransformApi;
        getCharacterAt: (index: number) => TransformApi;
        getRandomFrom: () => TransformApi;
        sanitize: (opts?: {
            removeSpaces?: boolean;
            removeDigits?: boolean;
            removeSpecial?: boolean;
        }) => TransformApi;
        anagram: (str: string) => TransformApi;
        replace: (search: string | RegExp, rep: string) => TransformApi;
        replaceAll: (search: string | RegExp, rep: string) => TransformApi;
        removeFirst: (what: string | RegExp) => TransformApi;
        removeAll: (what: string | RegExp) => TransformApi;
        add: (prefixOrSuffix: {
            prefix?: string;
            suffix?: string;
        } | string) => TransformApi;
        pad: (len: number, char?: string, where?: "start" | "end" | "both") => TransformApi;
        randomize: () => TransformApi;
        chunk: (size: number, sep?: string) => TransformApi;
        breakToLines: (charactersPerLine: number) => TransformApi;
        extract: (pattern: string | RegExp) => TransformApi;
        extractInRange: (start: number, end: number) => TransformApi;
        extractWhenBetween: (prefix: string, suffix: string) => TransformApi;
        escapeString: () => TransformApi;
        unEscapeString: () => TransformApi;
        toHash: () => TransformApi;
    };
    has: (str: string) => AssertApi;
    doesNotHave: (str: string) => AssertApi;
    startsWith: (str: string) => AssertApi;
    endsWith: (str: string) => AssertApi;
    isExactly: (str: string) => AssertApi;
    isAlpha: () => AssertApi;
    isAlphaNumeric: () => AssertApi;
    hasAllUppercase: () => AssertApi;
    hasAllLowercase: () => AssertApi;
    isUpperCase: () => AssertApi;
    isLowerCase: () => AssertApi;
    isDigit: () => AssertApi;
    isNumeric: () => AssertApi;
    isWhitespace: () => AssertApi;
    isEmail: () => AssertApi;
    isUrl: () => AssertApi;
    isUrlSafe: () => AssertApi;
    isPhone: (preset: "UG" | "US" | "DEFAULT") => AssertApi;
    isNumberConvertible: () => AssertApi;
    passesRegex: (regex: RegExp) => AssertApi;
    failsRegex: (regex: RegExp) => AssertApi;
    anyOf: (...values: string[]) => AssertApi;
    lengthIs: (nOrObj: number | {
        min?: number;
        max?: number;
    }) => AssertApi;
    isBetween: (prefix: string, suffix: string) => AssertApi;
    hasNoEmoji: () => AssertApi;
    anagram: (str: string) => AssertApi;
    isPalindrome: () => AssertApi;
    hasUniqueCharacters: () => AssertApi;
    whereValueAt: (idx: number) => {
        is: (val: string) => AssertApi;
    };
    wordCount: () => {
        is: (n: number) => AssertApi;
    };
    isBase64: () => AssertApi;
    isStrongPassword: () => AssertApi;
};
/**
 * Initiates a Regist transformation API for string manipulation.
 *
 * @param stringToTransform The string to transform.
 * @returns An API with transformation methods for chaining.
 *
 * @example
 * stringTransform("foo")
 *   .toUpperCase()
 *   .try();
 * // → "FOO"
 *
 * @example
 * stringTransform(" fooBar ")
 *   .trim()
 *   .toSnakeCase()
 *   .try();
 * // → "foo_bar"
 *
 * @example
 * stringTransform("fooBar")
 *   .customTransform(val => { throw new Error("fail!"); })
 *   .try((err, step, valueSoFar) => {
 *     console.error(err, step, valueSoFar);
 *   }); // handles error and returns null
 */
declare function stringTransform(stringToTransform: string): {
    customTransform: typeof customTransform;
    try: typeof tryFn$1;
    assertThat: typeof assertThatStart;
    toUpperCase: () => TransformApi;
    toLowerCase: () => TransformApi;
    toPascalCase: () => TransformApi;
    toSnakeCase: () => TransformApi;
    toCamelCase: () => TransformApi;
    trim: () => TransformApi;
    split: (splitter?: string | RegExp) => {
        takeThatAt(index: number): TransformApi;
        join(sep?: string): TransformApi;
    };
    toHex: () => TransformApi;
    toBinary: () => TransformApi;
    toURLSafe: () => TransformApi;
    getCharacterAt: (index: number) => TransformApi;
    getRandomFrom: () => TransformApi;
    sanitize: (opts?: {
        removeSpaces?: boolean;
        removeDigits?: boolean;
        removeSpecial?: boolean;
    }) => TransformApi;
    anagram: (str: string) => TransformApi;
    replace: (search: string | RegExp, rep: string) => TransformApi;
    replaceAll: (search: string | RegExp, rep: string) => TransformApi;
    removeFirst: (what: string | RegExp) => TransformApi;
    removeAll: (what: string | RegExp) => TransformApi;
    add: (prefixOrSuffix: {
        prefix?: string;
        suffix?: string;
    } | string) => TransformApi;
    pad: (len: number, char?: string, where?: "start" | "end" | "both") => TransformApi;
    randomize: () => TransformApi;
    chunk: (size: number, sep?: string) => TransformApi;
    breakToLines: (charactersPerLine: number) => TransformApi;
    extract: (pattern: string | RegExp) => TransformApi;
    extractInRange: (start: number, end: number) => TransformApi;
    extractWhenBetween: (prefix: string, suffix: string) => TransformApi;
    escapeString: () => TransformApi;
    unEscapeString: () => TransformApi;
    toHash: () => TransformApi;
};

/**
 * Regist: Human-friendly, chainable string assertion API.
 * Lazy assertion API, evaluated only on .try().
 * Author: Hussein Kizz.
 *
 * - All assertion methods return the API for chaining.
 * - .try() triggers evaluation of the chain.
 * - If all assertions pass, .try() returns true.
 * - If an assertion fails, .try() returns false.
 * - If an error occurs and a handler is passed to .try(handler), handler is called with (error, step, valueSoFar) and .try() returns null.
 * - If an error occurs and no handler is passed, the error is thrown.
 * - After .try(), further chaining is not allowed.
 */
declare const api: {
    isNot: typeof isNot;
    customCheck: typeof customCheck;
    try: typeof tryFn;
    stringTransform: typeof stringTransformStart;
    has: (str: string) => AssertApi;
    doesNotHave: (str: string) => AssertApi;
    startsWith: (str: string) => AssertApi;
    endsWith: (str: string) => AssertApi;
    isExactly: (str: string) => AssertApi;
    isAlpha: () => AssertApi;
    isAlphaNumeric: () => AssertApi;
    hasAllUppercase: () => AssertApi;
    hasAllLowercase: () => AssertApi;
    isUpperCase: () => AssertApi;
    isLowerCase: () => AssertApi;
    isDigit: () => AssertApi;
    isNumeric: () => AssertApi;
    isWhitespace: () => AssertApi;
    isEmail: () => AssertApi;
    isUrl: () => AssertApi;
    isUrlSafe: () => AssertApi;
    isPhone: (preset: "UG" | "US" | "DEFAULT") => AssertApi;
    isNumberConvertible: () => AssertApi;
    passesRegex: (regex: RegExp) => AssertApi;
    failsRegex: (regex: RegExp) => AssertApi;
    anyOf: (...values: string[]) => AssertApi;
    lengthIs: (nOrObj: number | {
        min?: number;
        max?: number;
    }) => AssertApi;
    isBetween: (prefix: string, suffix: string) => AssertApi;
    hasNoEmoji: () => AssertApi;
    anagram: (str: string) => AssertApi;
    isPalindrome: () => AssertApi;
    hasUniqueCharacters: () => AssertApi;
    whereValueAt: (idx: number) => {
        is: (val: string) => AssertApi;
    };
    wordCount: () => {
        is: (n: number) => AssertApi;
    };
    isBase64: () => AssertApi;
    isStrongPassword: () => AssertApi;
};
type AssertApi = {
    [K in keyof typeof api]: (typeof api)[K];
};
/**
 * Negates the next assertion in the chain.
 * @returns API for chaining.
 */
declare function isNot(): AssertApi;
/**
 * Checks value with a custom predicate function.
 * Predicate must return a boolean, otherwise throws.
 * @param fn Predicate.
 * @returns API for chaining.
 */
declare function customCheck(fn: (str: string) => boolean): AssertApi;
/**
 * Triggers evaluation of the assertion chain.
 * @param handler Optional error handler (error: Error, step: string, valueSoFar: string) => void
 * @returns {boolean|null} true (all pass), false (assertion failed), or null (error handled)
 * @example
 * const result = assertThat("fooBar")
 *   .has("Bar")
 *   .isAlpha()
 *   .try(); // throws if any error happens and returns null.
 *
 * const result2 = assertThat("fooBar")
 *   .customCheck(() => { throw new Error("Oops!"); })
 *   .try((error, step, valueSoFar) => {
 *     console.error(error, step, valueSoFar);
 *   }); // doesn't throw, passes error to handler and returns null.
 */
declare function tryFn(handler?: (error: Error, step: string, valueSoFar: string) => void): true | false | null;
/**
 * Switches to the stringTransform chain for further manipulation.
 * Runs try on the current assertion chain, throws if an error occurs, otherwise switches to stringTransform API.
 * If an error occurs, throws with detailed info from try.
 * @returns stringTransform API.
 */
declare function stringTransformStart(): {
    customTransform: (fn: (val: string) => string) => TransformApi;
    try: (handler?: (error: Error, step: string, valueSoFar: string) => void) => string | null;
    assertThat: () => {
        isNot: typeof isNot;
        customCheck: typeof customCheck;
        try: typeof tryFn;
        stringTransform: typeof stringTransformStart;
        has: (str: string) => AssertApi;
        doesNotHave: (str: string) => AssertApi;
        startsWith: (str: string) => AssertApi;
        endsWith: (str: string) => AssertApi;
        isExactly: (str: string) => AssertApi;
        isAlpha: () => AssertApi;
        isAlphaNumeric: () => AssertApi;
        hasAllUppercase: () => AssertApi;
        hasAllLowercase: () => AssertApi;
        isUpperCase: () => AssertApi;
        isLowerCase: () => AssertApi;
        isDigit: () => AssertApi;
        isNumeric: () => AssertApi;
        isWhitespace: () => AssertApi;
        isEmail: () => AssertApi;
        isUrl: () => AssertApi;
        isUrlSafe: () => AssertApi;
        isPhone: (preset: "UG" | "US" | "DEFAULT") => AssertApi;
        isNumberConvertible: () => AssertApi;
        passesRegex: (regex: RegExp) => AssertApi;
        failsRegex: (regex: RegExp) => AssertApi;
        anyOf: (...values: string[]) => AssertApi;
        lengthIs: (nOrObj: number | {
            min?: number;
            max?: number;
        }) => AssertApi;
        isBetween: (prefix: string, suffix: string) => AssertApi;
        hasNoEmoji: () => AssertApi;
        anagram: (str: string) => AssertApi;
        isPalindrome: () => AssertApi;
        hasUniqueCharacters: () => AssertApi;
        whereValueAt: (idx: number) => {
            is: (val: string) => AssertApi;
        };
        wordCount: () => {
            is: (n: number) => AssertApi;
        };
        isBase64: () => AssertApi;
        isStrongPassword: () => AssertApi;
    };
    toUpperCase: () => TransformApi;
    toLowerCase: () => TransformApi;
    toPascalCase: () => TransformApi;
    toSnakeCase: () => TransformApi;
    toCamelCase: () => TransformApi;
    trim: () => TransformApi;
    split: (splitter?: string | RegExp) => {
        takeThatAt(index: number): TransformApi;
        join(sep?: string): TransformApi;
    };
    toHex: () => TransformApi;
    toBinary: () => TransformApi;
    toURLSafe: () => TransformApi;
    getCharacterAt: (index: number) => TransformApi;
    getRandomFrom: () => TransformApi;
    sanitize: (opts?: {
        removeSpaces?: boolean;
        removeDigits?: boolean;
        removeSpecial?: boolean;
    }) => TransformApi;
    anagram: (str: string) => TransformApi;
    replace: (search: string | RegExp, rep: string) => TransformApi;
    replaceAll: (search: string | RegExp, rep: string) => TransformApi;
    removeFirst: (what: string | RegExp) => TransformApi;
    removeAll: (what: string | RegExp) => TransformApi;
    add: (prefixOrSuffix: {
        prefix?: string;
        suffix?: string;
    } | string) => TransformApi;
    pad: (len: number, char?: string, where?: "start" | "end" | "both") => TransformApi;
    randomize: () => TransformApi;
    chunk: (size: number, sep?: string) => TransformApi;
    breakToLines: (charactersPerLine: number) => TransformApi;
    extract: (pattern: string | RegExp) => TransformApi;
    extractInRange: (start: number, end: number) => TransformApi;
    extractWhenBetween: (prefix: string, suffix: string) => TransformApi;
    escapeString: () => TransformApi;
    unEscapeString: () => TransformApi;
    toHash: () => TransformApi;
};
/**
 * Initiates a Regist assertion API for string validation.
 *
 * @param stringToValidate The string to validate.
 * @returns An API with assertion methods for chaining.
 *
 * @example
 * assertThat("foo").has("oo").isNot().isExactly("bar").try();
 * // → false
 *
 * @example
 * assertThat('fooBar')
 *   .has('Bar')
 *   .isAlpha()
 *   .try((error, step, valueSoFar) => {
 *     console.error(error, step, valueSoFar);
 *   }); // handles error and returns null
 *
 * @example
 * assertThat('fooBar')
 *   .has('foo')
 *   .stringTransform()
 *   .toUpperCase()
 *   .try();
 * // → "FOOBAR"
 */
declare function assertThat(stringToValidate: string): {
    isNot: typeof isNot;
    customCheck: typeof customCheck;
    try: typeof tryFn;
    stringTransform: typeof stringTransformStart;
    has: (str: string) => AssertApi;
    doesNotHave: (str: string) => AssertApi;
    startsWith: (str: string) => AssertApi;
    endsWith: (str: string) => AssertApi;
    isExactly: (str: string) => AssertApi;
    isAlpha: () => AssertApi;
    isAlphaNumeric: () => AssertApi;
    hasAllUppercase: () => AssertApi;
    hasAllLowercase: () => AssertApi;
    isUpperCase: () => AssertApi;
    isLowerCase: () => AssertApi;
    isDigit: () => AssertApi;
    isNumeric: () => AssertApi;
    isWhitespace: () => AssertApi;
    isEmail: () => AssertApi;
    isUrl: () => AssertApi;
    isUrlSafe: () => AssertApi;
    isPhone: (preset: "UG" | "US" | "DEFAULT") => AssertApi;
    isNumberConvertible: () => AssertApi;
    passesRegex: (regex: RegExp) => AssertApi;
    failsRegex: (regex: RegExp) => AssertApi;
    anyOf: (...values: string[]) => AssertApi;
    lengthIs: (nOrObj: number | {
        min?: number;
        max?: number;
    }) => AssertApi;
    isBetween: (prefix: string, suffix: string) => AssertApi;
    hasNoEmoji: () => AssertApi;
    anagram: (str: string) => AssertApi;
    isPalindrome: () => AssertApi;
    hasUniqueCharacters: () => AssertApi;
    whereValueAt: (idx: number) => {
        is: (val: string) => AssertApi;
    };
    wordCount: () => {
        is: (n: number) => AssertApi;
    };
    isBase64: () => AssertApi;
    isStrongPassword: () => AssertApi;
};

export { type AssertApi, type TransformApi, assertThat, stringTransform };
