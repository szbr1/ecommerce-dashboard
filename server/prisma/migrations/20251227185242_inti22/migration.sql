-- CreateTable
CREATE TABLE "StoreCounts" (
    "id" SERIAL NOT NULL,
    "totalProducts" INTEGER NOT NULL,
    "totalOrders" INTEGER NOT NULL,
    "totalPositiveReviews" INTEGER NOT NULL,
    "totalFollowers" INTEGER NOT NULL,

    CONSTRAINT "StoreCounts_pkey" PRIMARY KEY ("id")
);
