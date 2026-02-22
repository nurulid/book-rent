import { describe, expect, it } from "vitest";
import { insertBookSchema } from "./validators";

const currentYear = new Date().getFullYear();

const baseBook = {
  title: "Belajar TypeScript",
  slug: "belajar-typescript",
  author: "Nurul",
  desc: "d".repeat(30),
  publish: 2020,
  pages: 100,
  synopsis: "s".repeat(300),
  category: "Tech",
  genre: "Coding",
  status: "available",
  condition: "new",
};

describe("insertBookSchema (simple)", () => {
  it("valid: data normal lolos", () => {
    const result = insertBookSchema.safeParse(baseBook);
    expect(result.success).toBe(true);
  });

  it("valid: batas minimum lolos", () => {
    const result = insertBookSchema.safeParse({
      ...baseBook,
      title: "abc",
      slug: "abc",
      author: "abc",
      category: "abc",
      genre: "abc",
      desc: "d".repeat(30),
      synopsis: "s".repeat(300),
      publish: 1450,
      pages: 1,
      stock: 0,
    });
    expect(result.success).toBe(true);
  });

  it("valid: batas maksimum lolos", () => {
    const result = insertBookSchema.safeParse({
      ...baseBook,
      desc: "d".repeat(1000),
      synopsis: "s".repeat(10000),
      publish: currentYear,
    });
    expect(result.success).toBe(true);
  });

  it("invalid: di bawah minimum gagal", () => {
    const result = insertBookSchema.safeParse({
      ...baseBook,
      title: "ab",
      desc: "d".repeat(29),
      synopsis: "s".repeat(299),
      publish: 1449,
      pages: 0,
      stock: -1,
    });
    expect(result.success).toBe(false);
  });

  it("invalid: enum di luar daftar gagal", () => {
    const result = insertBookSchema.safeParse({
      ...baseBook,
      status: "borrowed",
      condition: "broken",
    });
    expect(result.success).toBe(false);
  });
});
