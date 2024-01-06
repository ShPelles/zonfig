import { z } from "zod";
import { zonfig } from "../src/zonfig";
import { expect, test, describe } from "vitest";

describe("zonfig()", () => {
  test("should return a ZodObject", () => {
    // Arrange
    const schema = z.object({});
    // Act
    const result = zonfig(schema);
    // Assert
    expect(result.parse).toBeInstanceOf(Function);
  });

  test("should fill in given values", () => {
    // Arrange
    const schema = z.object({
      foo: z.string(),
      bar: z.object({
        baz: z.number(),
      }),
    });

    // Act
    const parser = zonfig(schema);
    const result = parser.parse({ foo: "bar", bar: { baz: 123 } });
    // Assert
    expect(result).toEqual({ foo: "bar", bar: { baz: 123 } });
  });

  test("should fill in values from env", () => {
    // Arrange
    process.env.ZONFIG1 = "bar";
    process.env.ZONFIG2_ZONFIG3 = "123";
    const schema = z.object({
      zonfig1: z.string(),
      zonfig2: z.object({
        zonfig3: z.coerce.number(),
      }),
    });

    // Act
    const parser = zonfig(schema);
    const result = parser.parse({});
    // Assert
    expect(result).toEqual({ zonfig1: "bar", zonfig2: { zonfig3: 123 } });
  });
});
