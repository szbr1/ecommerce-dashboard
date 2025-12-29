import prisma from '@/lib/db';
import type { Request, Response } from 'express';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, addressId } = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        message: 'userId, storeId and addressId are required',
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        addressId,
      },
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error('CREATE ORDER ERROR:', error);
    return res.status(500).json({
      message: 'Failed to create order',
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error('DELETE ORDER ERROR:', error);
    return res.status(500).json({
      message: 'Failed to delete order',
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { trackingId, orderId } = req.body;
  try {
    if (!trackingId || !orderId) {
      return res.status(400).json('All Fields required.');
    }
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        trackingId,
      },
    });

    return res.status(200).json(order);
  } catch (error) {
    console.error('TOTAL ORDERS ERROR:', error);
    return res.status(500).json({
      message: 'failed to update order: server issue',
    });
  }
};

export const getTotalOrdersCount = async (req: Request, res: Response) => {
  try {
    const count = await prisma.order.count({
      where: {
        id: 1, // Todo
      },
    });

    return res.status(200).json({
      totalOrders: count,
    });
  } catch (error) {
    console.error('TOTAL ORDERS ERROR:', error);
    return res.status(500).json({
      message: 'Failed to count orders',
    });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await prisma.order.findFirst({
      include: {
        address: true,
        orderItems: {
          include: { product: true },
        },
        user: true,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Failed while getting order');
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await prisma.order.findMany({
      where: {
        orderItems: {
          some: {
            storeId: 1, // Todo
          },
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        orderItems: {
          where: {
            storeId: 1, // Todo
          },
          include: {
            product: true,
          },
        },
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Failed while getting orders');
  }
};

export const getOrdersPageCounts = async (req: Request, res: Response) => {
  try {
    const result = await prisma.$transaction(async tx => {
      const [All, Return, Failed, Completed] = await Promise.all([
        tx.order.count({
          where: {
            orderItems: {
              some: {
                storeId: 1,
              },
            },
          },
        }),

        tx.order.count({
          where: {
            orderItems: {
              some: {
                storeId: 1,
              },
            },
            paymentStatus: 'RETURN',
          },
        }),

        tx.order.count({
          where: {
            orderItems: {
              some: {
                storeId: 1,
              },
            },
            deliveryStatus: 'CANCELLED',
          },
        }),

        tx.order.count({
          where: {
            orderItems: {
              some: {
                storeId: 1,
              },
            },
            deliveryStatus: 'DELIVERED',
          },
        }),
      ]);

      return {
        All,
        Return,
        Failed,
        Completed,
      };
    });

    console.log('hell');

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json('failed while fetching order page counts.');
  }
};

export const getRecentOrders = async (req: Request, res: Response) => {
  try {
    const result = await prisma.order.findMany({
      where: {
        orderItems: {
          some: {
            storeId: 1, // Todo
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      select: {
        id: true,
        amount: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Failed while getting orders');
  }
};

export const getSalesByYear = async (req: Request, res: Response) => {
  try {
    const currentYear = new Date().getFullYear();

    const result = await Promise.all(
      Array.from({ length: 5 }).map(async (_, i) => {
        const year = currentYear - i;

        const start = new Date(year, 0, 1);
        const end = new Date(year + 1, 0, 1);

        const sales = await prisma.order.aggregate({
          where: {
            createdAt: {
              gte: start,
              lt: end,
            },
            paymentStatus: 'PAID',
          },
          _sum: {
            amount: true,
          },
        });

        return {
          year,
          totalAmount: sales._sum.amount ?? 0,
        };
      })
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch yearly sales' });
  }
};

export const getSalesByMonth = async (req: Request, res: Response) => {
  try {
    const now = new Date();

    const result = await Promise.all(
      Array.from({ length: 12 }).map(async (_, i) => {
        const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

        const sales = await prisma.order.aggregate({
          where: {
            createdAt: {
              gte: start,
              lt: end,
            },
            paymentStatus: 'PAID',
          },
          _sum: {
            amount: true,
          },
        });

        return {
          month: start.toLocaleDateString('default', { month: 'short' }),
          totalAmount: sales._sum.amount ?? 0,
        };
      })
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch yearly sales' });
  }
};
