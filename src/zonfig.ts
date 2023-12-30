import { z } from "zod";

export function zonfig<T extends z.ZodObject<z.ZodRawShape>>(schema: T): T {
  return schema;
}
