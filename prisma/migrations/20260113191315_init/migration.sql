-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" VARCHAR(64),
    "lastName" VARCHAR(64),
    "userName" VARCHAR(32) NOT NULL,
    "birthday" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Font" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "category" VARCHAR(32) NOT NULL,
    "url" TEXT NOT NULL,
    "tips" TEXT,

    CONSTRAINT "Font_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Palette" (
    "id" SERIAL NOT NULL,
    "mainColor" VARCHAR(7) NOT NULL,
    "mixinColors" TEXT[],
    "tags" TEXT[],
    "description" TEXT,

    CONSTRAINT "Palette_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ElementType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementAttribute" (
    "elementTypeId" INTEGER NOT NULL,
    "attributeId" INTEGER NOT NULL,

    CONSTRAINT "ElementAttribute_pkey" PRIMARY KEY ("elementTypeId","attributeId")
);

-- CreateTable
CREATE TABLE "Element" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "coordsX" INTEGER NOT NULL,
    "coordsY" INTEGER NOT NULL,
    "opacity" INTEGER NOT NULL DEFAULT 100,
    "rotation" INTEGER NOT NULL DEFAULT 0,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "layer" INTEGER NOT NULL DEFAULT 0,
    "elementTypeId" INTEGER NOT NULL,
    "moodboardId" INTEGER NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementValue" (
    "elementId" INTEGER NOT NULL,
    "attributeId" INTEGER NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "ElementValue_pkey" PRIMARY KEY ("elementId","attributeId")
);

-- CreateTable
CREATE TABLE "Moodboard" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Moodboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "moodboardId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostLike" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "PostLike_postId_userId_key" ON "PostLike"("postId", "userId");

-- AddForeignKey
ALTER TABLE "ElementAttribute" ADD CONSTRAINT "ElementAttribute_elementTypeId_fkey" FOREIGN KEY ("elementTypeId") REFERENCES "ElementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementAttribute" ADD CONSTRAINT "ElementAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_elementTypeId_fkey" FOREIGN KEY ("elementTypeId") REFERENCES "ElementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_moodboardId_fkey" FOREIGN KEY ("moodboardId") REFERENCES "Moodboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementValue" ADD CONSTRAINT "ElementValue_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementValue" ADD CONSTRAINT "ElementValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moodboard" ADD CONSTRAINT "Moodboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_moodboardId_fkey" FOREIGN KEY ("moodboardId") REFERENCES "Moodboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
