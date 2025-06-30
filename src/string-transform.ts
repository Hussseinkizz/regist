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

import { assertThat } from "./assert-that";
import { transforms } from "./lib/transforms";

type Step = { name: string; fn: (value: string) => string };

// working state (module-level, must be reset for each chain)
const steps: Step[] = [];
let currentValue = "";

const api = {
  ...transforms,
  customTransform,
  try: tryFn,
  assertThat: assertThatStart,
};

export type TransformApi = {
  [K in keyof typeof api]: (typeof api)[K];
};

/**
 * Adds a step to the current transformation chain.
 * @param name Name of the transformation step.
 * @param fn Transform function that receives the value and returns a string.
 * @returns API for chaining.
 */
export function addStep(name: string, fn: (value: string) => string) {
  steps.push({ name, fn });
  return api as TransformApi;
}

/**
 * Applies a custom transformation to the value.
 * @param fn Transformation function.
 * @returns API for chaining.
 * @throws If the function does not return a string or throws unless try chained on with a handler passed to it.
 */
function customTransform(fn: (val: string) => string) {
  return addStep("customTransform", (v: string) => {
    let result: string;
    try {
      result = fn(v);
    } catch (e) {
      throw new Error(`Custom transform function failed: ${e}`);
    }
    if (typeof result !== "string") {
      throw new Error(
        `Custom transform function must return a string, but returned ${JSON.stringify(result)}`,
      );
    }
    return result;
  });
}

/**
 * Handles an error thrown during evaluation of a step.
 * @param err The thrown error or value.
 * @param handler Optional error handler (error, step, valueSoFar).
 * @param name The name of the step.
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
 * Evaluates a single transformation step.
 * @param fn The transformation function for the step.
 * @param valueSoFar The string value to transform.
 * @returns The result string.
 */
function evaluateStep(
  fn: (value: string) => string,
  valueSoFar: string,
): string {
  return fn(valueSoFar);
}

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
function tryFn(
  handler?: (error: Error, step: string, valueSoFar: string) => void,
): string | null {
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

/**
 * Switches to the assertion chain for further validation.
 * Runs try on the current chain, throws if an error occurs, otherwise switches to assert api.
 * If an error occurs, throws with detailed info from try.
 * @returns assertThat API.
 */
function assertThatStart() {
  let errorInfo: { error: Error; step: string; valueSoFar: string } | null =
    null;
  const result = tryFn((error, step, valueSoFar) => {
    errorInfo = { error, step, valueSoFar };
  });
  if (result === null && errorInfo) {
    const { error, step, valueSoFar } = errorInfo as {
      error: Error;
      step: string;
      valueSoFar: string;
    };
    throw new Error(
      `Transformation failed at step "${step}": ${error.message}\nValue so far: ${valueSoFar}`,
    );
  }
  return assertThat(result as string);
}

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
export function stringTransform(stringToTransform: string) {
  // reset working state for new transformation chain
  steps.length = 0;
  currentValue = stringToTransform;
  return api;
}
