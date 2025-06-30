/** biome-ignore-all lint/performance/useTopLevelRegex: <this is ok for testing a regex based library> */
import { describe, expect, it } from "vitest";
import { assertThat } from "../assert-that";

describe("assertThat API (with .try())", () => {
  it("has()", () => {
    expect(assertThat("hello world").has("world").try()).toBe(true);
    expect(assertThat("hello world").has("foo").try()).toBe(false);
  });

  it("doesNotHave()", () => {
    expect(assertThat("hello world").doesNotHave("foo").try()).toBe(true);
    expect(assertThat("hello world").doesNotHave("world").try()).toBe(false);
  });

  it("startsWith()", () => {
    expect(assertThat("hello").startsWith("he").try()).toBe(true);
    expect(assertThat("hello").startsWith("lo").try()).toBe(false);
  });

  it("endsWith()", () => {
    expect(assertThat("hello").endsWith("lo").try()).toBe(true);
    expect(assertThat("hello").endsWith("he").try()).toBe(false);
  });

  it("isExactly()", () => {
    expect(assertThat("foo").isExactly("foo").try()).toBe(true);
    expect(assertThat("foo").isExactly("bar").try()).toBe(false);
  });

  it("isNot()", () => {
    expect(assertThat("foo").isNot().isExactly("bar").try()).toBe(true);
    expect(assertThat("foo").isNot().isExactly("foo").try()).toBe(false);
  });

  it("isAlpha()", () => {
    expect(assertThat("abcXYZ").isAlpha().try()).toBe(true);
    expect(assertThat("abc123").isAlpha().try()).toBe(false);
  });

  it("isAlphaNumeric()", () => {
    expect(assertThat("abc123XYZ").isAlphaNumeric().try()).toBe(true);
    expect(assertThat("abc123!").isAlphaNumeric().try()).toBe(false);
  });

  it("hasAllUppercase()", () => {
    expect(assertThat("FOO").hasAllUppercase().try()).toBe(true);
    expect(assertThat("Foo").hasAllUppercase().try()).toBe(false);
  });

  it("allLowercase()", () => {
    expect(assertThat("bar").hasAllLowercase().try()).toBe(true);
    expect(assertThat("Bar").hasAllLowercase().try()).toBe(false);
  });

  it("isUpperCase()", () => {
    expect(assertThat("fooBAR").isUpperCase().try()).toBe(true);
    expect(assertThat("foobar").isUpperCase().try()).toBe(false);
  });

  it("isLowerCase()", () => {
    expect(assertThat("FOObar").isLowerCase().try()).toBe(true);
    expect(assertThat("FOO").isLowerCase().try()).toBe(false);
  });

  it("isDigit()", () => {
    expect(assertThat("12345").isDigit().try()).toBe(true);
    expect(assertThat("123a5").isDigit().try()).toBe(false);
  });

  it("isNumeric()", () => {
    expect(assertThat("42").isNumeric().try()).toBe(true);
    expect(assertThat("42.5").isNumeric().try()).toBe(true);
    expect(assertThat("foo").isNumeric().try()).toBe(false);
  });

  it("isWhitespace()", () => {
    expect(assertThat("   \t\n").isWhitespace().try()).toBe(true);
    expect(assertThat("  a ").isWhitespace().try()).toBe(false);
  });

  it("isEmail()", () => {
    expect(assertThat("foo@bar.com").isEmail().try()).toBe(true);
    expect(assertThat("foo@bar").isEmail().try()).toBe(false);
  });

  it("isUrl()", () => {
    expect(assertThat("https://foo.com").isUrl().try()).toBe(true);
    expect(assertThat("foo.com").isUrl().try()).toBe(true);
    expect(assertThat("not a url").isUrl().try()).toBe(false);
  });

  it("isUrlSafe()", () => {
    expect(assertThat("abc-_.~").isUrlSafe().try()).toBe(true);
    expect(assertThat("abc?/").isUrlSafe().try()).toBe(false);
  });

  it("isPhone() with US preset", () => {
    expect(assertThat("123-456-7890").isPhone("US").try()).toBe(true);
    expect(assertThat("(123) 456-7890").isPhone("US").try()).toBe(true);
    expect(assertThat("+11234567890").isPhone("US").try()).toBe(true);
    expect(assertThat("1234567").isPhone("US").try()).toBe(false);
  });

  it("isPhone() with UG preset", () => {
    expect(assertThat("+256712345678").isPhone("UG").try()).toBe(true);
    expect(assertThat("0712345678").isPhone("UG").try()).toBe(true);
    expect(assertThat("12345678").isPhone("UG").try()).toBe(false);
  });

  it("isNumberConvertible()", () => {
    expect(assertThat("123.45").isNumberConvertible().try()).toBe(true);
    expect(assertThat("abc").isNumberConvertible().try()).toBe(false);
  });

  it("passesRegex()", () => {
    expect(assertThat("abc123").passesRegex(/\d{3}/).try()).toBe(true);
    expect(assertThat("abc").passesRegex(/\d+/).try()).toBe(false);
  });

  it("failsRegex()", () => {
    expect(assertThat("abc").failsRegex(/\d+/).try()).toBe(true);
    expect(assertThat("abc123").failsRegex(/\d+/).try()).toBe(false);
  });

  it("anyOf()", () => {
    expect(assertThat("foo").anyOf("bar", "foo", "baz").try()).toBe(true);
    expect(assertThat("qux").anyOf("bar", "foo", "baz").try()).toBe(false);
  });

  it("lengthIs()", () => {
    expect(assertThat("foo").lengthIs(3).try()).toBe(true);
    expect(assertThat("foo").lengthIs(2).try()).toBe(false);
    expect(assertThat("foobar").lengthIs({ min: 3, max: 6 }).try()).toBe(true);
    expect(assertThat("fo").lengthIs({ min: 3 }).try()).toBe(false);
    expect(assertThat("foobar").lengthIs({ max: 5 }).try()).toBe(false);
  });

  it("isBetween()", () => {
    expect(assertThat("hello").isBetween("e", "o").try()).toBe(true); // "ll" is between
    expect(assertThat("hello").isBetween("o", "e").try()).toBe(false);
    expect(assertThat("hello").isBetween("h", "h").try()).toBe(false);
  });

  it("hasNoEmoji()", () => {
    expect(assertThat("hello").hasNoEmoji().try()).toBe(true);
    expect(assertThat("hello😄").hasNoEmoji().try()).toBe(false);
  });

  it("anagram()", () => {
    expect(assertThat("listen").anagram("silent").try()).toBe(true);
    expect(assertThat("foo").anagram("bar").try()).toBe(false);
  });

  it("isPalindrome()", () => {
    expect(assertThat("Racecar").isPalindrome().try()).toBe(true);
    expect(assertThat("hello").isPalindrome().try()).toBe(false);
  });

  it("hasUniqueCharacters()", () => {
    expect(assertThat("abc").hasUniqueCharacters().try()).toBe(true);
    expect(assertThat("aabc").hasUniqueCharacters().try()).toBe(false);
  });

  it("whereValueAt()", () => {
    expect(assertThat("hello").whereValueAt(1).is("e").try()).toBe(true);
    expect(assertThat("hello").whereValueAt(1).is("a").try()).toBe(false);
  });

  it("wordCount()", () => {
    expect(assertThat("foo bar baz").wordCount().is(3).try()).toBe(true);
    expect(assertThat("foo bar").wordCount().is(3).try()).toBe(false);
  });

  it("isBase64()", () => {
    expect(assertThat("SGVsbG8gd29ybGQ=").isBase64().try()).toBe(true);
    expect(assertThat("not base64").isBase64().try()).toBe(false);
  });

  it("isStrongPassword()", () => {
    expect(assertThat("Aa1!aa11").isStrongPassword().try()).toBe(true);
    expect(assertThat("weakpass").isStrongPassword().try()).toBe(false);
  });

  it("customCheck() returns false", () => {
    expect(
      assertThat("love")
        .customCheck((str) => str === str.split("").reverse().join(""))
        .isExactly("love")
        .try(),
    ).toBe(false);
  });

  it("customCheck() returns true", () => {
    expect(
      assertThat("love")
        .customCheck((str) => str === str.split("").join(""))
        .isExactly("love")
        .try(),
    ).toBe(true);
  });

  it("customCheck() throws error and calls handler", () => {
    let called = false;
    const result = assertThat("love")
      .customCheck(() => {
        throw new Error("fail!");
      })
      .try((err, step, val) => {
        called = true;
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toMatch(/fail/);
        expect(step).toBe("customCheck");
        expect(val).toBe("love");
      });
    expect(called).toBe(true);
    expect(result).toBeNull();
  });

  it("customCheck() throws error if predicate does not return boolean", () => {
    expect(() =>
      assertThat("love")
        // biome-ignore lint/suspicious/noExplicitAny: <this is fine for testing>
        .customCheck(() => "not a boolean" as any)
        .try(),
    ).toThrow("Custom check function must return a boolean");
  });

  it("throws for a customCheck that throws if no handler is passed", () => {
    expect(() =>
      assertThat("love")
        .customCheck(() => {
          throw new Error("bad");
        })
        .try(),
    ).toThrow("bad");
  });

  it("isNot() works", () => {
    expect(assertThat("foobar").isNot().has("baz").try()).toBe(true);
    expect(assertThat("foobar").isNot().has("foo").try()).toBe(false);
  });

  it("whereValueAt and wordCount chaining", () => {
    expect(
      assertThat("hello").whereValueAt(0).is("h").wordCount().is(1).try(),
    ).toBe(true);
  });

  it("stringTransform chaining", () => {
    const result = assertThat("foo")
      .isExactly("foo")
      .stringTransform()
      .toUpperCase()
      .try();
    expect(result).toBe("FOO");
  });
});
