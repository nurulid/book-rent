import { describe, expect, it } from "vitest";
import { insertBookSchema } from "./validators";

// Ambil tahun saat ini untuk mengetes batas maksimum field publish (dynamic).
const currentYear = new Date().getFullYear();

// Data dasar yang valid.
// Di setiap test kita akan menimpa (override) field tertentu saja.
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

// "describe" dipakai untuk mengelompokkan test berdasarkan unit yang diuji.
describe("insertBookSchema (simple)", () => {
  it("valid: data normal lolos", () => {
    // ACT: jalankan validasi schema terhadap data input.
    const result = insertBookSchema.safeParse(baseBook);
    // ASSERT: hasil harus valid.
    expect(result.success).toBe(true);
  });

  it("valid: batas minimum lolos", () => {
    // ARRANGE + ACT: pakai data valid, lalu set ke nilai minimum yang diizinkan schema.
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
    // ASSERT: seluruh nilai minimum tetap dianggap valid.
    expect(result.success).toBe(true);
  });

  it("valid: batas maksimum lolos", () => {
    // ARRANGE + ACT: uji nilai maksimum untuk field yang punya batas atas.
    const result = insertBookSchema.safeParse({
      ...baseBook,
      desc: "d".repeat(1000),
      synopsis: "s".repeat(10000),
      publish: currentYear,
    });
    // ASSERT: nilai tepat di batas maksimum harus lolos.
    expect(result.success).toBe(true);
  });

  it("invalid: di bawah minimum gagal", () => {
    // ARRANGE + ACT: set beberapa field ke nilai di bawah minimum.
    const result = insertBookSchema.safeParse({
      ...baseBook,
      title: "ab",
      desc: "d".repeat(29),
      synopsis: "s".repeat(299),
      publish: 1449,
      pages: 0,
      stock: -1,
    });
    // ASSERT: input harus gagal validasi.
    expect(result.success).toBe(false);
  });

  it("invalid: enum di luar daftar gagal", () => {
    // ARRANGE + ACT: isi enum dengan nilai yang tidak ada di schema.
    const result = insertBookSchema.safeParse({
      ...baseBook,
      status: "borrowed",
      condition: "broken",
    });
    // ASSERT: input enum yang tidak terdaftar harus gagal.
    expect(result.success).toBe(false);
  });

  it("contoh gagal: harusnya invalid tapi dipaksa expect true", () => {
    // Ini test edukasi: input invalid sengaja dites dengan ekspektasi yang salah.
    // Tujuannya supaya bisa melihat bentuk output failure dari Vitest.
    const result = insertBookSchema.safeParse({
      ...baseBook,
      title: "ab", // harusnya gagal (min 3)
    });

    // expect(result.success).toBe(true); // ini sengaja salah -> test FAIL
    expect(result.success).toBe(false); // ini sengaja salah -> test FAIL
  });
});
