import { PrismaClient } from "@prisma/client";

// prisma client dibikin singleton untuk mencegah terlalu banyak koneksi DB (karena tidak new PrismaClient() tiap request).

// 1) Kita buat tipe untuk menyimpan prisma instance di globalThis
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 2) Pakai instance yang sudah ada kalau tersedia, kalau belum buat baru
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 3) Di development, simpan ke global supaya tidak bikin instance baru saat hot reload
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
