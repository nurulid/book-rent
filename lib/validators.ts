import { z } from "zod";

// schema for inserting books or "kontrak input"
// define the type and condition/constraint for key yang boleh/akan diinput (subset dari model Prisma, bukan semua field)
// yang tidak termasuk itu adalah field yang auto-generated atau backend only seperti: id, createdAt, updatedAt
// notes:
// Jika input datang dari form HTML (textarea + input), field angka biasanya berupa string, pakai z.coerce.number() untuk mengubah nilai input apapun yang diberikan menjadi tipe data number
// hindari input kosong spasi dengan menambahakan trim()
// untuk nilai tanpa decimal pakai number().int()
export const insertBookSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters."),
  slug: z.string().trim().min(3, "Slug must be at least 3 characters."),
  author: z.string().trim().min(3, "Author must be at least 3 characters."),
  desc: z.string().trim().min(30, "Description must be at least 30 characters.").max(1000), // hindari input kosong spasi dengan menambahakan trim()
  publish: z.coerce.number().int().min(1450).max(new Date().getFullYear()), //buku modern saja, min(1450) (era printing press)
  pages: z.coerce.number().int().min(1),
  synopsis: z.string().trim().min(300, "Synopsis must be at least 300 characters.").max(10000),
  category: z.string().trim().min(3, "Category must be at least 3 characters."),
  genre: z.string().trim().min(3, "Genre must be at least 3 characters."),
  stock: z.coerce.number().int().min(0).optional(),
  condition: z.enum(["new", "good", "fair"]),
});
