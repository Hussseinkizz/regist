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

import { assertions } from "./lib/assertions";
import { stringTransform } from "./string-transform";

type Step = { name: string; fn: (value: string) => boolean };

// working state (module-level, must be reset for each assertion chain)
const steps: Step[] = [];
let _negate = false;
let currentValue = "";

const api = {
  ...assertions,
  isNot,
  customCheck,
  try: tryFn,
  stringTransform: stringTransformStart,
};

export type AssertApi = {
  [K in keyof typeof api]: (typeof api)[K];
};

/**
 * Negates the next assertion in the chain.
 * @returns API for chaining.
 */
function isNot() {
  _negate = true;
  return api as AssertApi;
}

/**
 * Adds a step to the current assertion chain.
 * @param name Name of the assertion step.
 * @param fn Predicate function that receives the value and returns boolean.
 * @returns API for chaining.
 */
export function addStep(name: string, fn: (value: string) => boolean) {
  steps.push({ name, fn });
  return api as AssertApi;
}

/**
 * Checks value with a custom predicate function.
 * Predicate must return a boolean, otherwise throws.
 * @param fn Predicate.
 * @returns API for chaining.
 */
function customCheck(fn: (str: string) => boolean) {
  return addStep("customCheck", (v) => {
    let result: unknown = null;
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

/**
 * Handles an error thrown during evaluation of a step.
 * @param err The thrown error or value.
 * @param handler Optional error handler (error, step, valueSoFar).
 * @param name The name of the assertion step.
 * @param lastStepValue The value at the point of failure.
 * @returns null (if a handler was provided).
 * @throws The error, if no handler is provided.
 */
function handleStepError(
  err: unknown,
  handler:
    | ((error: Error, step: string, valueSoFar: string) => void)
    | undefined,
  name: string,
  lastStepValue: string,
): null {
  if (handler) {
    handler(
      err instanceof Error ? err : new Error(String(err)),
      name,
      lastStepValue,
    );
    return null;
  }
  throw err;
}

/**
 * Evaluates a single assertion step.
 * @param fn The predicate function for the step.
 * @param valueSoFar The string value to test.
 * @param negate Whether to negate the result.
 * @returns Boolean result of test (possibly negated).
 */
function evaluateStep(
  fn: (value: string) => boolean,
  valueSoFar: string,
  negate: boolean,
): boolean {
  let result = fn(valueSoFar);
  if (negate) {
    result = !result;
    _negate = false;
  }
  return result;
}

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
function tryFn(
  handler?: (error: Error, step: string, valueSoFar: string) => void,
): true | false | null {
  const value = currentValue;
  const valueSoFar = value;
  for (const { name, fn } of steps) {
    try {
      const result = evaluateStep(fn, valueSoFar, _negate);
      if (!result) {
        return false;
      }
    } catch (error) {
      return handleStepError(error, handler, name, valueSoFar);
    }
  }
  return true;
}

/**
 * Switches to the stringTransform chain for further manipulation.
 * Runs try on the current assertion chain, throws if an error occurs, otherwise switches to stringTransform API.
 * If an error occurs, throws with detailed info from try.
 * @returns stringTransform API.
 */
function stringTransformStart() {
  let errorInfo: { error: Error; step: string; valueSoFar: string } | null =
    null;
  const result = tryFn((error, step, valueSoFar) => {
    errorInfo = { error, step, valueSoFar };
  });
  if (result === null && errorInfo) {
    const { error, step, valueSoFar } = errorInfo;
    throw new Error(
      `Assertion failed at step "${step}": ${(error as Error).message}\nValue so far: ${valueSoFar}`,
    );
  }

  if (!result) {
    throw new Error(`Assertion failed at step "${steps.pop()?.name}"`);
  }

  return stringTransform(currentValue);
}

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
export function assertThat(stringToValidate: string) {
  // reset working state for new assertion chain
  steps.length = 0;
  _negate = false;
  currentValue = stringToValidate;
  return api;
}
