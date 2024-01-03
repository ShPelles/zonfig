import { describe, expect, test } from "vitest";
import EnvReader from "../../src/readers/env-reader";

describe("EnvReader", () => {
  test("read(key) should return value from env", () => {
    // Arrange
    process.env.TEST001 = "bar";
    // Act
    const reader = new EnvReader();
    const result = reader.read("TEST001");
    // Assert
    expect(result).toBe("bar");
  });
});
