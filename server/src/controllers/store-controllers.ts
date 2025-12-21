import prisma from '@/lib/db';
import { Request, Response } from 'express';

export const createStore = async (req: Request, res: Response) => {
  try {
    const { name, imageUrl, description, userId } = req.body;

    const result = await prisma.store.create({
      data: {
        name,
        imageUrl,
        description,
        userId,
      },
    });

    return res
      .status(200)
      .json({ message: 'successfully created store', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'unsuccessfully while creating' });
  }
};

export const updateStore = async (req: Request, res: Response) => {
  try {
    const { storeId, name, imageUrl, description } = req.body;

    const result = await prisma.store.update({
      where: { id: storeId },
      data: {
        name,
        imageUrl,
        description,
      },
    });

    return res
      .status(200)
      .json({ message: 'successfully updated stor', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'unsuccessfully while updating' });
  }
};

export const deleteStore = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.body;

    const result = await prisma.store.delete({
      where: { id: storeId },
    });

    return res
      .status(200)
      .json({ message: 'successfully deleted the store', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'unsuccessfully while updating' });
  }
};

export const totalStores = async (req: Request, res: Response) => {
  try {
    const result = await prisma.store.count();
    res
      .status(200)
      .json({ message: 'total stores fetched successfully', result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'stores fetch failed server is not responding' });
  }
};
export const storeOrders = async (req: Request, res: Response) => {
  try {
    const storeId = 1;
    const result = await prisma.order.findMany({
      where: {
        orderItems: {
          some: {
            product: {
              store: {
                id: storeId,
              },
            },
          },
        },
      },
      include: {
        orderItems: {
          where: {
            product: {
              store: {
                id: storeId,
              },
            },
          },
        },
        address: {
          omit: {
            id: true,
            userId: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
            contact: {
              select: {
                contact1: true,
                contact2: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json('error occured in server ');
  }
};

export const totalSales = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.body;
    const result = await prisma.orderItem.aggregate({
      where: { storeId },
      _sum: {
        productAtPrice: true,
        quantity: true,
      },
    });
    res
      .status(200)
      .json({ message: 'total stores fetched successfully', result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'stores fetch failed server is not responding' });
  }
};
// get all the customers by respect to store
export const allCustomers = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.body;

   const users = await prisma.order.groupBy({
    by: ['userId'],
    where: {
      orderItems: {
        some: { storeId },
      },
    },
    _count: {
      _all: true,
    },
    having: {
     userId: {
       _count: {
       gte: 3
      },
     }
    },
  });
    
    const clients = await prisma.user.findMany({
      where: {
        id: {in: users.map(u => u.userId)}
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            imageUrl: true
          }
        }
      }
    })

    const result = clients.map(user => {
      const orderInfo = users.find(g => g.userId === user.id);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        imageUrl: user.profile?.imageUrl ?? null,
        totalOrders: orderInfo?._count._all ?? 0,
      };
    });

    res
      .status(200)
      .json({ message: 'total customers fetched successfully', result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'stores fetch failed server is not responding' });
  }
};
