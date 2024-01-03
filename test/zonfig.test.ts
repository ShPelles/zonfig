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
    const schema = z.object({ foo: z.string() });
    const parser = zonfig(schema);
    // Act
    const result = parser.parse({ foo: "bar" });
    // Assert
    expect(result).toEqual({ foo: "bar" });
  });

  test("should fill in values from env", () => {
    // Arrange
    process.env.TEST001 = "bar";
    const schema = z.object({ TEST001: z.string() });
    const parser = zonfig(schema);
    // Act
    const result = parser.parse({});
    // Assert
    expect(result).toEqual({ TEST001: "bar" });
  });
});
