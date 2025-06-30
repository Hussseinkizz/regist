/** biome-ignore-all lint/performance/useTopLevelRegex: <this is ok for testing a regex based library> */
import { describe, expect, it } from "vitest";
import { stringTransform } from "../string-transform";

describe("stringTransform API", () => {
  it("toUpperCase and toLowerCase", () => {
    expect(stringTransform("foo").toUpperCase().try()).toBe("FOO");
    expect(stringTransform("BAR").toLowerCase().try()).toBe("bar");
  });

  it("toPascalCase, toSnakeCase, toCamelCase", () => {
    expect(stringTransform("hello world").toPascalCase().try()).toBe(
      "HelloWorld",
    );
    expect(stringTransform("Hello World-Test").toSnakeCase().try()).toBe(
      "hello_world_test",
    );
    expect(stringTransform("hello_world test-case").toCamelCase().try()).toBe(
      "helloWorldTestCase",
    );
  });

  it("trim", () => {
    expect(stringTransform("  foo  ").trim().try()).toBe("foo");
  });

  it("split/takeThatAt/join", () => {
    expect(stringTransform("a,b,c").split(",").takeThatAt(1).try()).toBe("b");
    expect(stringTransform("a,b,c").split(",").join("-").try()).toBe("a-b-c");
  });

  it("toHex and toBinary", () => {
    expect(stringTransform("Hi").toHex().try()).toBe("4869");
    expect(stringTransform("A").toBinary().try()).toBe("01000001");
  });

  it("toURLSafe", () => {
    expect(stringTransform("hello world!").toURLSafe().try()).toBe(
      "hello%20world!",
    );
  });

  it("getCharacterAt and getRandomFrom", () => {
    expect(stringTransform("abc").getCharacterAt(2).try()).toBe("c");
    const val = stringTransform("xyz").getRandomFrom().try();
    expect(["x", "y", "z"]).toContain(val);
  });

  it("sanitize", () => {
    expect(
      stringTransform("a b c 123!").sanitize({ removeSpaces: true }).try(),
    ).toBe("abc123!");
    expect(
      stringTransform("a b c 123!").sanitize({ removeDigits: true }).try(),
    ).toBe("a b c !");
    expect(
      stringTransform("a b c 123!").sanitize({ removeSpecial: true }).try(),
    ).toBe("a b c 123");
  });

  it("anagram", () => {
    expect(stringTransform("abc").anagram("cab").try()).toBe("aabbcc");
  });

  it("replace, replaceAll, removeFirst, removeAll", () => {
    expect(stringTransform("foo bar foo").replace("foo", "baz").try()).toBe(
      "baz bar foo",
    );
    expect(stringTransform("foo bar foo").replaceAll("foo", "baz").try()).toBe(
      "baz bar baz",
    );
    expect(stringTransform("foo bar foo").removeFirst("foo").try()).toBe(
      " bar foo",
    );
    expect(stringTransform("foo bar foo").removeAll("foo").try()).toBe(" bar ");
    expect(stringTransform("foo1foo2foo3").removeAll(/\d/g).try()).toBe(
      "foofoofoo",
    );
  });

  it("add", () => {
    expect(stringTransform("bar").add("foo").try()).toBe("foobar");
    expect(stringTransform("bar").add({ prefix: "foo" }).try()).toBe("foobar");
    expect(stringTransform("foo").add({ suffix: "bar" }).try()).toBe("foobar");
  });

  it("pad", () => {
    expect(stringTransform("foo").pad(5, "-").try()).toBe("foo--");
    expect(stringTransform("foo").pad(5, "-", "start").try()).toBe("--foo");
    expect(stringTransform("foo").pad(7, "*", "both").try()).toBe("**foo**");
  });

  it("randomize", () => {
    const original = "abcdef";
    const randomized = stringTransform(original).randomize().try();
    expect(randomized).not.toBeNull();
    expect(randomized?.length).toBe(original.length);
    expect(
      [...(randomized ?? "")].sort((a, b) => a.localeCompare(b)).join(""),
    ).toBe([...original].sort((a, b) => a.localeCompare(b)).join(""));
  });

  it("chunk", () => {
    expect(stringTransform("abcdef").chunk(2, "-").try()).toBe("ab-cd-ef");
    expect(stringTransform("abcdef").chunk(3).try()).toBe("abc|def");
  });

  it("breakToLines", () => {
    expect(stringTransform("abcdef").breakToLines(2).try()).toBe("ab\ncd\nef");
  });

  it("extract, extractInRange, extractWhenBetween", () => {
    expect(stringTransform("abc123def").extract(/\d+/).try()).toBe("123");
    expect(stringTransform("abcdef").extractInRange(1, 4).try()).toBe("bcd");
    expect(
      stringTransform("abc[foo]def").extractWhenBetween("[", "]").try(),
    ).toBe("foo");
  });

  it("escapeString and unEscapeString", () => {
    const escaped = stringTransform("a.b*c").escapeString().try();
    expect(escaped).toBe("a\\.b\\*c");
    expect(
      stringTransform(escaped as string)
        .unEscapeString()
        .try(),
    ).toBe("a.b*c");
  });

  it("customTransform", () => {
    expect(
      stringTransform("foo")
        .customTransform((str) => `${str}bar`)
        .try(),
    ).toBe("foobar");
  });

  it("toHash", () => {
    expect(typeof Number(stringTransform("foo").toHash().try())).toBe("number");
  });

  it("try() with error handler", () => {
    let errorCaught = false;
    const result = stringTransform("abc")
      .extract(/\d+/)
      .try((err, step, value) => {
        errorCaught = true;
        expect(err).toBeInstanceOf(Error);
        expect(step).toBe("extract");
        expect(value).toBe("abc");
      });
    expect(errorCaught).toBe(true);
    expect(result).toBeNull();
  });

  it("assertThat chaining", () => {
    expect(
      stringTransform("hello")
        .toUpperCase()
        .assertThat()
        .isExactly("HELLO")
        .try(),
    ).toBe(true);
  });
});
