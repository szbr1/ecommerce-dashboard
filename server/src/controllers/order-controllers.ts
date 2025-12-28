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
    const {trackingId, orderId} = req.body;
  try {

    if(!trackingId || !orderId){
      return res.status(400).json("All Fields required.")
    }
    const order = await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            trackingId
        }
    });

    return res.status(200).json(order);
  } catch (error) {
    console.error('TOTAL ORDERS ERROR:', error);
    return res.status(500).json({
      message: 'failed to update order: server issue',
    });
  }
};


export const totalOrders = async (req: Request, res: Response) => {
  try {
    const count = await prisma.order.count();

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



export const getOrder = async (req: Request, res: Response)=>{
  try {
    const result = await prisma.order.findFirst({
      include: {
        address: true,
        orderItems: {
          include: {product: true}
        },
        user: true
      }
    })
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json("Failed while getting order")
  } 
}

export const getOrders = async (req: Request, res: Response) => {
  try {
  

    const result = await prisma.order.findMany({
      where: {
        orderItems: {
          some: {
            storeId: 1 // Todo
          }
        }
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        orderItems: {
          where: {
            storeId:1 // Todo
          },
          include: {
            product: true
          }
        }
      }
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Failed while getting orders");
  } 
};