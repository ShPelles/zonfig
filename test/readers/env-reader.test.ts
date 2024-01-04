import { describe, expect, test } from "vitest";
import EnvReader from "../../src/readers/env-reader";

describe("EnvReader", () => {
  describe("read(path)", () => {
    test("should works with single path key", () => {
      // Arrange
      process.env.TEST001 = "bar";
      // Act
      const reader = new EnvReader();
      const result = reader.read(["TEST001"]);
      // Assert
      expect(result).toBe("bar");
    });

    test("should works with multiple path keys", () => {
      // Arrange
      process.env.TEST_002 = "foo";
      // Act
      const reader = new EnvReader();
      const result = reader.read(["TEST", "002"]);
      // Assert
      expect(result).toBe("foo");
    });
  });
});
