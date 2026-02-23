import { insertBookSchema } from "@/lib/validators";
import z from "zod";

export type Book = z.infer<typeof insertBookSchema> & {
  // extra fields for Book (that not in insertBookSchema)
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
