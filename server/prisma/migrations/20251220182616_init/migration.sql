/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productAtPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- DropIndex
DROP INDEX "Order_createdAt_idx";

-- DropIndex
DROP INDEX "manyUsers_userId_idx";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "productAtPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "name",
ADD COLUMN     "name" "UserRole" NOT NULL;

-- DropEnum
DROP TYPE "userRole";

-- CreateIndex
CREATE UNIQUE INDEX "Contact_profileId_key" ON "Contact"("profileId");

-- CreateIndex
CREATE INDEX "Order_createdAt_userId_idx" ON "Order"("createdAt", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
