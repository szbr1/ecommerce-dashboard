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


export const totalStores = async (req: Request, res: Response)=>{
    try {
        const result = await prisma.store.count()        
        res.status(200).json({message: "total stores fetched successfully", result})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "stores fetch failed server is not responding"})
    }
}
