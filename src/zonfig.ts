import { z } from "zod";

export function zonfig<T extends z.ZodObject<z.ZodRawShape>>(schema: T) {
  const preprocessedSchema = z.preprocess((data) => {
    if (!isObject(data)) {
      throw new Error("data must be an object");
    }

    for (const key of Object.keys(schema.shape)) {
      const upperKey = key.toUpperCase();
      if (process.env[upperKey] !== undefined) {
        data[key] = process.env[upperKey];
      }
    }

    return data;
  }, schema);
  return preprocessedSchema;
}

function isObject(data: unknown): data is Record<string, unknown> {
  return typeof data === "object" && data !== null;
}
