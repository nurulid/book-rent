import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.book.deleteMany();

  await prisma.book.createMany({ data: sampleData.books });

  console.log("Database seeded successfully!");
}

main();

// run:
// npx tsx ./db/seed