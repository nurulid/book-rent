"use server";

import { prisma } from "../prisma";

// 1) Server action untuk ambil 4 buku terbaru
export async function getAvailableBooks() {
  return prisma.book.findMany({
    //take: 4, // 2) Batasi hasil hanya 4 data
    orderBy: [{ createdAt: "desc" }, { id: "desc" }], // 3) Urutkan terbaru dulu, id jadi tie-breaker kalau createdAt sama
    where: {
      stock: {
        gt: 0,
      },
      // gt = > (greater then)
      // gte = >= (greater then or equal)
      // lt = < (less then)
      // lte = <= (less then or equal)
    },
  });
}

// get book slug for book details
// using findFirst
export async function getBookBySlug(slug: string) {
  return prisma.book.findFirst({
    where: { slug: slug },
  });
}
