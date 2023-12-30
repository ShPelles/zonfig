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
    expect(result).instanceOf(z.ZodObject);
  });
});
