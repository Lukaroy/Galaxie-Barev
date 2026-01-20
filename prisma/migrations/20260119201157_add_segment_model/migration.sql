/*
  Warnings:

  - The values [MODERATOR] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Moodboard" DROP CONSTRAINT "Moodboard_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_moodboardId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostLike";

-- CreateTable
CREATE TABLE "Segment" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Segment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryPin" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "GalleryPin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryPinLike" (
    "id" SERIAL NOT NULL,
    "pinId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GalleryPinLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Segment_slug_key" ON "Segment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "GalleryPinLike_pinId_userId_key" ON "GalleryPinLike"("pinId", "userId");

-- AddForeignKey
ALTER TABLE "GalleryPin" ADD CONSTRAINT "GalleryPin_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryPinLike" ADD CONSTRAINT "GalleryPinLike_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "GalleryPin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryPinLike" ADD CONSTRAINT "GalleryPinLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
