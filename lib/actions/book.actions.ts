"use server"

import { PrismaClient } from "@prisma/client";
import { convertToPlainObject } from "../utils";

export async function getLatestBooks() {
  // define prisma client
  const prisma = new PrismaClient();

  // fetch all latest books
  // pake await disini
  // disini we only get 4 latest books dan diurut "desc" by createdAt
  const data = await prisma.book.findMany({
    take: 4,
    orderBy: {createdAt: "desc"}
  })

  // data disini jenisnya Prisma object
  // convert it to regular JS object
  return convertToPlainObject(data);

}