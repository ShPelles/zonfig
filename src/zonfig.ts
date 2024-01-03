import { z } from "zod";
import EnvReader from "./readers/env-reader";

const reader = new EnvReader();

export function zonfig<T extends z.ZodObject<z.ZodRawShape>>(schema: T) {
  const preprocessedSchema = z.preprocess((data) => {
    if (!isObject(data)) {
      throw new Error("data must be an object");
    }

    for (const key of Object.keys(schema.shape)) {
      const value = reader.read(key);
      const hasValue = value !== undefined;
      if (hasValue) {
        data[key] = value;
      }
    }

    return data;
  }, schema);
  return preprocessedSchema;
}

function isObject(data: unknown): data is Record<string, unknown> {
  return typeof data === "object" && data !== null;
}
