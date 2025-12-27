/*
  Warnings:

  - You are about to drop the column `description` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Store` table. All the data in the column will be lost.
  - Added the required column `stars` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Store_name_idx";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "stars" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "name";

-- CreateTable
CREATE TABLE "StoreProfile" (
    "storeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "banner" TEXT,
    "brandshoot" TEXT,
    "brandshootProduct1" TEXT,
    "brandshootProduct2" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StoreProfile_storeId_key" ON "StoreProfile"("storeId");

-- AddForeignKey
ALTER TABLE "StoreProfile" ADD CONSTRAINT "StoreProfile_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
