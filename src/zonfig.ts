import { z } from "zod";
import EnvReader from "./readers/env-reader";

type ZodObject = z.ZodObject<z.ZodRawShape>;
type Config = Record<string, unknown>;

const reader = new EnvReader();

export function zonfig<T extends ZodObject>(schema: T) {
  const preprocessedSchema = z.preprocess((config) => {
    assertConfigIsObject(config);
    fillConfig<T>(schema, config);
    return config;
  }, schema);
  return preprocessedSchema;
}

function fillConfig<T extends ZodObject>(
  schema: T,
  config: Config,
  path: string[] = [],
) {
  for (const key of Object.keys(schema.shape)) {
    const isNestedSchema = schema.shape[key] instanceof z.ZodObject;
    if (isNestedSchema) {
      fillNestedConfig<T>(schema, config, path, key);
    } else {
      fillConfigValue(config, path, key);
    }
  }
}

function fillNestedConfig<T extends ZodObject>(
  schema: T,
  config: Config,
  path: string[],
  key: string,
) {
  if (!isObject(config[key])) {
    config[key] = {};
  }
  fillConfig(schema.shape[key] as T, config[key] as Config, [...path, key]);
}

function fillConfigValue(config: Config, path: string[], key: string) {
  const value = reader.read([...path, key]);
  const hasValue = value !== undefined;
  if (hasValue) {
    config[key] = value;
  }
}

function assertConfigIsObject(config: unknown): asserts config is Config {
  if (!isObject(config)) {
    throw new Error("config must be an object");
  }
}

function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null;
}
