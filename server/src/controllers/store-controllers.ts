import prisma from '@/lib/db';
import { Request, Response } from 'express';

export const createStore = async (req: Request, res: Response) => {
  try {
    const {
      name,
      imageUrl,
      description,
      banner,
      brandshoot,
      brandshootProduct1,
      brandshootProduct2,
    } = req.body;

    const result = await prisma.store.create({
      data: {
        userId: 1,
        profile: {
          create: {
            name,
            avatarUrl: imageUrl,
            description,
            banner,
            brandshoot,
            brandshootProduct1,
            brandshootProduct2,
          },
        },
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
    const { name, description } = req.body;

    // Files are in req.files when using upload.fields()
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    console.log('Body:', req.body);
    console.log('Files:', files);

    // Build the update data object dynamically
    const updateData: {
      name?: string;
      description?: string;
      banner?: string;
      avatarUrl?: string;
      brandshoot?: string;
      brandshootProduct1?: string;
      brandshootProduct2?: string;
    } = {};

    // Add text fields if they exist
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    // Add file URLs if they were uploaded
    if (files?.poster?.[0]) {
      updateData.banner = files.poster[0].path; // or .filename depending on your multer config
    }
    if (files?.avatarUrl?.[0]) {
      updateData.avatarUrl = files.avatarUrl[0].path;
    }
    if (files?.brandshoot?.[0]) {
      updateData.brandshoot = files.brandshoot[0].path;
    }
    if (files?.brandshootProduct1?.[0]) {
      updateData.brandshootProduct1 = files.brandshootProduct1[0].path;
    }
    if (files?.brandshootProduct2?.[0]) {
      updateData.brandshootProduct2 = files.brandshootProduct2[0].path;
    }

    // Only update if there's data to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No data to update' });
    }

    const result = await prisma.store.update({
      where: { id: 1 }, // TODO: Get from authenticated user
      data: {
        profile: {
          update: updateData,
        },
      },
    });

    console.log(result, '---------------');

    return res.status(200).json({
      message: 'Successfully updated store',
      result,
    });
  } catch (error) {
    console.error('Update store error:', error);
    res.status(500).json({
      message: 'Error while updating store',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
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

export const getStore = async (req: Request, res: Response) => {
  try {
    const result = await prisma.store.findFirst({
      where: {
        id: 1, // Todo
      },
      include: {
        profile: true,
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'unsuccessfully while fetching store' });
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
            gte: 3,
          },
        },
      },
    });

    const clients = await prisma.user.findMany({
      where: {
        id: { in: users.map(u => u.userId) },
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            imageUrl: true,
          },
        },
      },
    });

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

export const lastweekSales = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.body;
    const todayDate = new Date();
    const last7Day = new Date();
    last7Day.setDate(todayDate.getDate() - 6);
    const sales = await prisma.orderItem.aggregate({
      where: {
        storeId,
        order: {
          createdAt: { gte: last7Day, lte: todayDate },
        },
      },
      _sum: {
        productAtPrice: true,
      },
    });

    const result =
      sales._sum.productAtPrice !== null ? sales._sum.productAtPrice : 0;
    res.status(200).json({ message: 'total stores fetched zero', result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'stores fetch failed server is not responding' });
  }
};

export const lastyearSales = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.body;
    const todayDate = new Date();
    const last1Year = new Date(todayDate);
    last1Year.setFullYear(todayDate.getFullYear() - 1);
    const sales = await prisma.orderItem.aggregate({
      where: {
        storeId,
        order: {
          createdAt: { gte: last1Year, lte: todayDate },
        },
      },
      _sum: {
        productAtPrice: true,
      },
    });

    const result = sales._sum.productAtPrice ?? 0;
    res.status(200).json({ message: 'total stores fetched zero', result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'stores fetch failed server is not responding' });
  }
};

export const getProfle = async (req: Request, res: Response) => {
  try {
    const result = prisma.store.findUnique({
      where: {
        id: 1, // Todo
      },
      select: {
        profile: true,
        followers: true,
        createdAt: true,
        roles: true,
        status: true,
      },
    });
    res.status(200).json({ message: 'successfully get store profile', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'unable to get store profile: failed server is not responding',
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const {
    avatarUrl,
    brandshoot,
    brandshootProduct1,
    banner,
    description,
    name,
    brandshootProduct2,
  } = req.body;

  try {
    const result = prisma.store.update({
      where: {
        profile: {
          storeId: 1,
        },
        id: 1,
      },
      data: {
        profile: {
          update: {
            avatarUrl,
            brandshoot,
            brandshootProduct1,
            banner,
            description,
            name,
            brandshootProduct2,
          },
        },
      },
    });
    res.status(200).json({ message: 'successfully get store profile', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'unable to get store profile: failed server is not responding',
    });
  }
};

export const getFollowersByYear = async (req: Request, res: Response) => {
  try {
    const thisYear = new Date().getFullYear();
    const result = await Promise.all(
      Array.from({ length: 5 }).map(async (_, i) => {
        const year = thisYear - i;
        const start = new Date(year, 0, 1);
        const end = new Date(year + 1, 0, 1);

        const count = await prisma.follower.count({
          where: {
            storeId: 1, //Todo
            createdAt: { gte: start, lt: end },
          },
        });

        return {
          count,
          year,
        };
      })
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: 'unable to get followers server failed.' });
  }
};
