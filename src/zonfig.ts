import { z } from "zod";
import EnvReader from "./readers/env-reader";

const reader = new EnvReader();

export function zonfig<T extends z.ZodObject<z.ZodRawShape>>(schema: T) {
  const preprocessedSchema = z.preprocess((config) => {
    if (!isObject(config)) {
      throw new Error("config must be an object");
    }

    fillConfig<T>(schema, config);
    return config;
  }, schema);
  return preprocessedSchema;
}

function fillConfig<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  config: Record<string, unknown>,
  path: string[] = [],
) {
  for (const key of Object.keys(schema.shape)) {
    if (schema.shape[key] instanceof z.ZodObject) {
      if (!isObject(config[key])) {
        config[key] = {};
      }
      fillConfig(
        schema.shape[key] as T,
        config[key] as Record<string, unknown>,
        [...path, key],
      );
      continue;
    }

    const value = reader.read([...path, key]);
    const hasValue = value !== undefined;
    if (hasValue) {
      config[key] = value;
    }
  }
}

function isObject(data: unknown): data is Record<string, unknown> {
  return typeof data === "object" && data !== null;
}
