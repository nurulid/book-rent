-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('available', 'limited');

-- CreateEnum
CREATE TYPE "BookCondition" AS ENUM ('new', 'good', 'fair');

-- CreateTable
CREATE TABLE "Book" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "publish" INTEGER NOT NULL,
    "pages" INTEGER NOT NULL,
    "synopsis" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "status" "BookStatus" NOT NULL,
    "condition" "BookCondition" NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_slug_key" ON "Book"("slug");
