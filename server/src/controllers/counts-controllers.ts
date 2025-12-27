import prisma from "@/lib/db";
import { Request, Response } from "express";

export const getStoreCounts = async (req: Request, res: Response) => {
  try {
    const counts = await prisma.$transaction(async (tx) => {
      const [orders, reviews, products, followers] = await Promise.all([
        tx.order.count({
          where: {
            orderItems: {
              some: { storeId: 1 }, // TODO
            },
          },
        }),
        tx.review.count({
          where: {
            product: { storeId: 1 }, // TODO
            stars: { gte: 4 },
          },
        }),
        tx.product.count({
          where: { storeId: 1 }, // TODO
        }),
        tx.follower.count({
          where: { storeId: 1 }, // TODO
        }),
      ]);

      return tx.storeCounts.create({
        data: {
          totalFollowers: followers,
          totalOrders: orders,
          totalPositiveReviews: reviews,
          totalProducts: products,
        },
      });
    });

    res.status(200).json(counts);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to get store counts' });
  }
};