-- CreateEnum
CREATE TYPE "SegmentType" AS ENUM ('LESSON', 'TEST');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');

-- AlterTable
ALTER TABLE "Segment" ADD COLUMN     "color" VARCHAR(7),
ADD COLUMN     "content" TEXT,
ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'BEGINNER',
ADD COLUMN     "duration" VARCHAR(32),
ADD COLUMN     "icon" VARCHAR(32),
ADD COLUMN     "questions" JSONB,
ADD COLUMN     "type" "SegmentType" NOT NULL DEFAULT 'LESSON';
