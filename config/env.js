import z from "zod";

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string(),
  })
  .parse(process.env);
