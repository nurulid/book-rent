import { z } from "zod";

// schema for inserting books or "kontrak input"
// define the type and condition/constraint for key yang boleh/akan diinput (subset dari model Prisma, bukan semua field)
// yang tidak termasuk itu adalah field yang auto-generated atau backend only seperti: id, createdAt, updatedAt
export const insertBookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z.string().min(3, "Slug must be at least 3 characters."),
  author: z.string().min(3, "Author must be at least 3 characters."),
  desc: z.string().min(30, "Description must be at least 30 characters."),
  publish: z.number().int().min(4),
  pages: z.number().int().min(1),
  synopsis: z.string().min(300, "Synopsis must be at least 300 characters."),
  category: z.string().min(3, "Category must be at least 3 characters."),
  genre: z.string().min(3, "Genre must be at least 3 characters."),
  stock: z.number().int().min(0),
  status: z.string().min(3, "Status must be at least 3 characters."),
  condition: z.string().min(3, "Condition must be at least 3 characters."),
});

export type InsertBookInput = z.infer<typeof insertBookSchema>;
