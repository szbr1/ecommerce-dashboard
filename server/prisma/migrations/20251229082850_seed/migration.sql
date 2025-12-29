/*
  Warnings:

  - The values [COMPELETE] on the enum `DeliveryStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeliveryStatus_new" AS ENUM ('DELIVERED', 'PENDING', 'SHIPPED', 'CANCELLED', 'COMPLETED');
ALTER TABLE "public"."Order" ALTER COLUMN "deliveryStatus" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "deliveryStatus" TYPE "DeliveryStatus_new" USING ("deliveryStatus"::text::"DeliveryStatus_new");
ALTER TYPE "DeliveryStatus" RENAME TO "DeliveryStatus_old";
ALTER TYPE "DeliveryStatus_new" RENAME TO "DeliveryStatus";
DROP TYPE "public"."DeliveryStatus_old";
ALTER TABLE "Order" ALTER COLUMN "deliveryStatus" SET DEFAULT 'PENDING';
COMMIT;
