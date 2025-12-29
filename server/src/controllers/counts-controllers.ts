import prisma from '@/lib/db';
import { Request, Response } from 'express';

export const getStoreCounts = async (req: Request, res: Response) => {
  try {
    const counts = await prisma.$transaction(async tx => {
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
          totalFollowers: followers ? followers : 0,
          totalOrders: orders ? orders : 0,
          totalPositiveReviews: reviews ? reviews : 0,
          totalProducts: products ? products : 0,
        },
      });
    });

    res.status(200).json(counts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get store counts' });
  }
};

export const getPaymentPageCounts = async (req: Request, res: Response) => {
  try {
    const result = await prisma.$transaction(async tx => {
      const [TotalSales, ReturnSales, FailedSale, UnpaidSales] =
        await Promise.all([
          tx.order.aggregate({
            where: {
              orderItems: {
                some: {
                  storeId: 1, // Todo
                },
              },
            },
            _sum: {
              amount: true,
            },
          }),

          // Return Sales
          tx.order.aggregate({
            where: {
              orderItems: {
                some: {
                  storeId: 1, // Todo
                },
              },
              paymentStatus: 'RETURN',
            },
            _sum: {
              amount: true,
            },
          }),

          // Failed Sales
          tx.order.aggregate({
            where: {
              orderItems: {
                some: {
                  storeId: 1, // Todo
                },
              },
              paymentStatus: 'FAILED',
            },
            _sum: {
              amount: true,
            },
          }),

          // Unpaid Sales
          tx.order.aggregate({
            where: {
              orderItems: {
                some: {
                  storeId: 1, // Todo
                },
              },
              paymentStatus: 'UNPAID',
            },
            _sum: {
              amount: true,
            },
          }),
        ]);

      return {
        TotalSales:
          TotalSales._sum.amount !== null ? TotalSales._sum.amount : 0,
        FailedSales:
          FailedSale._sum.amount !== null ? FailedSale._sum.amount : 0,
        ReturnSales:
          ReturnSales._sum.amount !== null ? ReturnSales._sum.amount : 0,
        UnpaidSales:
          UnpaidSales._sum.amount !== null ? UnpaidSales._sum.amount : 0,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json('Payment count featch failed caused by server error');
  }
};
