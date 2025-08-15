import { z } from "zod";

export const conversionSchema = z.object({
  from: z.string().length(3, "Currency source invalid"),
  to: z.string().length(3, "Currency cible invalid"),
  amount: z.number().positive("The amount should be greater than 0"),
});
