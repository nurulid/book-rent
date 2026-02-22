"use server";

import { prisma } from "../prisma";

// 1) Server action untuk ambil 4 buku terbaru
export async function getLatestBooks() {
  return prisma.book.findMany({
    take: 4, // 2) Batasi hasil hanya 4 data
    orderBy: [{ createdAt: "desc" }, { id: "desc" }], // 3) Urutkan terbaru dulu, id jadi tie-breaker kalau createdAt sama
  });
}

// get book slug for book details
// using findFirst
export async function getBookBySlug(slug: string) {
  return prisma.book.findFirst({
    where: { slug: slug },
  });
}
