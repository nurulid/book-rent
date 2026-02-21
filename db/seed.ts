import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

const prisma = new PrismaClient();

// main function
async function main() {
  // kenapa ini di wrap dengan $transaction?
  // untuk mencegah tabel kosong jika salah satu query (deleteMany dan createMany) gagal berjalan
  // Semua query berhasil -> commit (disimpan semua)
  // Salah satu query gagal -> rollback (dibatalkan semua)
  // Tanpa $transaction: kalau delete sukses tapi create gagal, tabel jadi kosong.
  // Dengan $transaction: kalau create gagal, hasil delete ikut dibatalkan, jadi data lama tetap aman.
  await prisma.$transaction([
    prisma.book.deleteMany(),
    prisma.book.createMany({ data: sampleData.books }),
  ]);

  console.log("Database seeded successfully!");
}

// pola umum menjalankan script async di Node/TypeScript
//
// run seed main function
main()
  // jika error tampilkan pesan error dan stop code
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  })
  // jika berhasil ataupun gagal/error close connection Prisma ke database
  .finally(async () => {
    await prisma.$disconnect();
  });

//
// run:
// npx tsx ./db/seed
//

// code di atas sama juga dengan code ini
// ini versi pake try catch
//
// async function main() {
//   try {
//     await prisma.$transaction([
//       prisma.book.deleteMany(),
//       prisma.book.createMany({ data: sampleData.books }),
//     ]);
//     console.log("Database seeded successfully!");
//   } catch (error) {
//     console.error("Database seed failed:", error);
//     process.exitCode = 1;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();


// penggunaan code `await prisma.$disconnect()`
// Pakai `await prisma.$disconnect()` saat kamu menjalankan Prisma di **script sekali jalan** (short-lived process), misalnya:

// 1. Seed script (`db/seed.ts`)
// 2. Migration helper/custom CLI script
// 3. Cron/job terpisah yang selesai lalu exit
// 4. Test teardown (setelah integration test selesai)

// Tujuannya: nutup koneksi DB supaya process bisa exit bersih dan tidak ada koneksi menggantung.

// Tidak perlu dipanggil per request di app Next.js/API server yang long-running, karena koneksi dikelola lifecycle aplikasi. Di konteks itu, disconnect biasanya hanya saat shutdown process (jika memang di-handle).
